# style-guide 스킬

사용자의 글쓰기 문체를 정의하고, 블로그 글 작성 시 일관성 있는 문체를 유지합니다.

## 용도

### WF0 — 부트스트랩 (초기 생성)
기존 글 1~2편을 분석하여 문체 가이드를 **자동 추출**합니다.

```bash
/style-guide bootstrap
```

**입력**: `/docs/style_samples/` 폴더의 기존 글 + 사용자 인터뷰
**출력**: `/.claude/skills/style-guide/style_guide.md`

### WF2 — 참조 (글 작성 시)
Writer와 Style-Editor가 이 가이드를 참조하여 작성합니다.

## 부트스트랩 프로세스

### 단계 1: 샘플 글 로드
`/docs/style_samples/` 폴더 스캔

### 단계 2: LLM 자동 분석
다음 5가지 항목 추출:
1. **어조** (Tone): 격식적/친근한/전문적
2. **인칭·경어** (Person & Politeness): 1인칭/경어 수준
3. **문장 길이·구조** (Sentence Structure): 평균 글자 수/패턴
4. **자주 쓰는·금지 표현** (Vocabulary): 선호 표현/이모지
5. **문단·섹션 구조** (Structure): 문단 길이/소제목 방식

### 단계 3: 사용자 인터뷰 (선택적)
부족한 부분을 짧은 인터뷰로 보완

### 단계 4: 가이드 생성
`style_guide.md` 작성

## style_guide.md 구조

```markdown
---
created_at: [ISO8601]
updated_at: [ISO8601]
samples_used: [파일명들]
bootstrap_method: [auto/interview/hybrid]
---

# 블로그 문체 가이드

## 1. 어조
## 2. 인칭 및 경어
## 3. 문장 길이 & 구조
## 4. 자주 쓰는 표현 & 금지 표현
## 5. 문단 & 섹션 구조
## 추가 특징
```

## 참조 방식

**Writer**: 초고 작성 시 이 가이드를 참조하여 작성
**Style-Editor**: 문체 검수 시 이 기준에 따라 피드백

## 주의사항

- 샘플 0~1개: 부트스트랩 경고
- 실제 글 추가 시 재부트스트랩 권장
- 100% 일치하지 않아도 됨 (자연스러움이 중요)
