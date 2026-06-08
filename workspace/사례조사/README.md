# EPC DT AI Map (베타)

해외 EPC 기업의 AI·BIM·디지털트윈 기술 도입 현황과 성숙도를 분석한 벤치마킹 매트릭스입니다.

## 🌟 주요 기능

### 1. 기업 정보 매핑
- 20개 글로벌 EPC 기업 정보
- 기술 스택, 성숙도 레벨, ROI 효과 시각화
- 실시간 검색 기능

### 2. 자동 배치 처리
- **매일 아침 7시 KST에 자동 실행**
- 최신 논문, 기사, 업데이트 자료 자동 수집
- Claude AI를 사용한 자동 구조화
- 중복 제거 및 데이터 병합

### 3. 관리자 대시보드
- 수동 배치 실행 가능
- 실시간 처리 결과 확인

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:
```
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
BATCH_SCHEDULE="0 22 * * *"
```

> ⚠️ **주의:** `ANTHROPIC_API_KEY`는 [Claude API](https://console.anthropic.com)에서 발급받아야 합니다.

### 3. 개발 서버 시작
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 4. 관리자 페이지 접속
```
http://localhost:3000/admin
```

## 📋 배치 처리 시스템

### 자동 실행
- **스케줄:** 매일 07:00 KST (UTC+9)
- **처리 내용:**
  1. Claude AI로 최신 논문/기사 검색
  2. 각 회사별로 자동 분류
  3. 중복 제거
  4. `companies.json` 자동 업데이트

### 수동 실행
1. `/admin` 접속
2. "지금 수동으로 실행" 버튼 클릭
3. 처리 결과 확인

## 📊 데이터 구조

### companies.json
```json
{
  "id": 1,
  "company": "Exyte",
  "country": "독일",
  "category": "Fab 전문 EPC/EPCM",
  "segment": "반도체·디스플레이 Fab",
  "technologies": "5D BIM, Digital Facilities Twin",
  "maturity": "③상용운영",
  "roi": "설계~커미셔닝 전주기 가시성",
  "links": [
    {
      "title": "Exyte Smart Manufacturing",
      "url": "https://www.exyte.net/..."
    }
  ],
  "updated_at": "2026-06-08T15:30:00Z"
}
```

## 🔧 프로젝트 구조

```
/
├── app/
│   ├── page.tsx              # 메인 페이지
│   ├── admin/
│   │   └── page.tsx          # 관리자 대시보드
│   ├── api/
│   │   └── batch/
│   │       └── update-research/
│   │           └── route.ts   # 배치 처리 API
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── CompanyCard.tsx       # 회사 카드 컴포넌트
├── data/
│   └── companies.json        # 회사 데이터 (자동 업데이트)
├── lib/
│   └── batch-scheduler.ts    # 배치 스케줄러
├── .env.local               # 환경 변수
└── package.json
```

## 🔐 보안 주의사항

- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다.
- API 키는 절대 저장소에 커밋하지 마세요.
- 프로덕션 배포 전에 환경 변수를 안전하게 설정하세요.

## 📦 빌드

```bash
# 정적 사이트로 빌드 (next.config.js의 output: "export" 설정)
npm run build

# 빌드된 사이트는 `out/` 디렉토리에 생성됩니다.
```

## 🛠️ 트러블슈팅

### 배치가 실행되지 않을 때
1. ANTHROPIC_API_KEY 확인
2. 콘솔 로그 확인 (`npm run dev` 터미널)
3. `/admin` 페이지에서 수동 실행 테스트

### 링크가 추가되지 않을 때
1. Claude API가 정상 작동하는지 확인
2. `companies.json` 파일 권한 확인
3. `/admin` 페이지의 결과 메시지 확인

## 📚 참고자료

- [Claude API 문서](https://docs.anthropic.com/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [node-cron 문서](https://github.com/node-cron/node-cron)

## 📝 라이센스

MIT License

---

**최종 업데이트:** 2026-06-08
