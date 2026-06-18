# 블로그 자동 작성 시스템 — 오케스트레이터 가이드

이 파일은 **메인 오케스트레이터**로서 두 개의 파이프라인(WF1, WF2)과 부트스트랩(WF0)을 조율합니다.

---

## 시스템 개요

### 입출력

| 구분 | 항목 | 형식 |
|------|------|------|
| 입력 | YouTube 영상 링크 | 사용자가 제공 |
| 중간 | 대본 | `/output/transcripts/<video_id>.md` |
| 중간 | 글감 후보 | `/output/ideas/<video_id>.md` |
| 중간 | 초고/수정고 | `/output/drafts/<slug>_v{N}.md` |
| 출력 | 완성 글 | `/output/posts/<slug>.md` |
| 관리 | 문체 가이드 | `/.claude/skills/style-guide/style_guide.md` |

### 파이프라인 구조

```
WF0 (최초 1회)
├─ 스타일 샘플 로드 (docs/style_samples/)
└─ 문체 가이드 생성 (style-guide.md)
   
WF1 (링크 제공 시)
├─ [1] 대본 추출
├─ [2] 요약·인사이트
├─ [3] 글감 제안
└─ [4] 글감 저장 → 사용자 선택

WF2 (글감 선택 후)
├─ [1] Writer: 초고 작성
├─ [2] Reviewer: 비판·팩트체크 (루프 최대 2회)
├─ [3] Writer: 피드백 반영
├─ [4] Style-Editor ∥ SEO-Specialist (병렬)
├─ [5] Writer: 통합 완성
└─ [6] 사용자 최종 검토
```

---

## WF0 — 스타일 가이드 부트스트랩

### 실행 시점
- **최초 1회** 또는 스타일 가이드 갱신이 필요할 때
- `style-guide.md`가 없으면 WF2 시작 전에 경고 표시

자세한 내용은 `.claude/skills/style-guide/SKILL.md`를 참조하세요.

---

## WF1 — YouTube 큐레이션

### 실행 조건
- 사용자가 YouTube 링크 제공
- 자막(수동/자동)이 있어야 진행

### 담당 에이전트: Curator

더 자세한 내용은 `.claude/agents/curator/AGENT.md`를 참조하세요.

---

## WF2 — 블로그 글 작성

### 실행 조건
- 사용자가 WF1 결과에서 글감 선택 → 명시적 "WF2 시작" 신호
- `style_guide.md` 존재 확인 (없으면 경고, 필수는 아님)

### 담당 에이전트
- Writer: 초고·수정·완성 작성
- Reviewer: 비판적 검토 + 팩트체크
- Style-Editor: 문체 검수
- SEO-Specialist: SEO 피드백

각 에이전트의 상세 지침은 `.claude/agents/*/AGENT.md`를 참조하세요.

---

## 데이터 전달 규약

### 원칙
- **파일 기반**: 대본·초고·피드백·완성글은 모두 `/output` 파일로 저장
- **경로만 전달**: 에이전트 간에는 경로(`/output/...`) 또는 간단한 신호(링크·글감 ID)만 전달

### 파일명 규칙
```
대본:     transcripts/<video_id>.md
글감:     ideas/<video_id>.md
초고:     drafts/<slug>_v1.md
수정고:   drafts/<slug>_v2.md
피드백:   feedback/<slug>_{role}.md
완성글:   posts/<slug>.md
```

---

## 호출 방식

```
사용자: /curator <YouTube_URL>
 ↓
Curator: 대본 추출 → 요약 → 인사이트 → 글감 제안
 ↓
사용자: [글감 선택]
 ↓
Curator: 글감 저장 → /output/ideas/<video_id>.md
 ↓
사용자: /writer [선택 글감]
 ↓
Writer/Reviewer/Style-Editor/SEO-Specialist: 작성 → 검토 → 완성
```

---

## 참고

- 상세 에이전트 지침: `.claude/agents/*/AGENT.md`
- 스킬 문서: `.claude/skills/*/SKILL.md`
- 설계서: `README.md`
