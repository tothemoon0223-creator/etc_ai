import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Anthropic } from '@anthropic-ai/sdk';

interface CompanyData {
  id: number;
  company: string;
  country: string;
  category?: string;
  segment?: string;
  technologies?: string;
  maturity?: string;
  roi?: string;
  links?: Array<{ title: string; url: string }>;
  updated_at?: string;
}

export async function POST(request: NextRequest) {
  try {
    const client = new Anthropic();

    // 현재 회사 데이터 읽기
    const companiesPath = path.join(process.cwd(), 'data', 'companies.json');
    const companiesData: CompanyData[] = JSON.parse(
      fs.readFileSync(companiesPath, 'utf-8')
    );

    // 회사 이름 목록 추출
    const companyNames = companiesData.map(c => c.company);

    // Claude를 사용하여 최근 논문/기사 검색 프롬프트 생성
    const searchPrompt = `최근 (2024-2026년) 해외 EPC 회사들의 AI·BIM·디지털트윈 도입 사례에 대한 새로운 논문, 기술 블로그, 뉴스 기사를 검색해야 합니다.

다음 회사들 중 하나 이상에 대한 최신 정보를 찾아주세요:
${companyNames.join(', ')}

각 항목마다 다음 형식으로 반환해주세요:
{
  "company": "회사명",
  "title": "논문/기사 제목",
  "url": "URL",
  "type": "논문|뉴스|블로그"
}

JSON 배열 형식으로만 반환하고, 실제 접근 가능한 URL을 포함해주세요. 최소 5개 이상의 새로운 항목을 찾아주세요.`;

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: searchPrompt,
        },
      ],
    });

    // Claude의 응답에서 JSON 추출
    const responseText =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // JSON 배열 추출 시도
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: '응답에서 JSON을 찾을 수 없습니다.' },
        { status: 400 }
      );
    }

    const newItems = JSON.parse(jsonMatch[0]);

    // 기존 데이터에 새 링크 추가
    const updatedCompanies = companiesData.map(company => {
      const newLinks = newItems
        .filter(
          (item: any) =>
            item.company === company.company ||
            item.company.includes(company.company)
        )
        .map((item: any) => ({
          title: item.title,
          url: item.url,
        }));

      if (newLinks.length > 0) {
        const existingLinks = company.links || [];
        const mergedLinks = [...existingLinks];

        for (const newLink of newLinks) {
          // 중복 제거
          if (!mergedLinks.some(l => l.url === newLink.url)) {
            mergedLinks.push(newLink);
          }
        }

        return {
          ...company,
          links: mergedLinks,
          updated_at: new Date().toISOString(),
        };
      }

      return company;
    });

    // 업데이트된 데이터 저장
    fs.writeFileSync(
      companiesPath,
      JSON.stringify(updatedCompanies, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: '연구 자료가 업데이트되었습니다.',
      updatedCount: newItems.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('배치 처리 오류:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '배치 처리 중 오류 발생',
      },
      { status: 500 }
    );
  }
}
