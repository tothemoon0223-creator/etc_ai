# YouTube 큐레이션 → 네이버 블로그 자동 작성 시스템

YouTube 영상의 인사이트를 자동으로 추출하여 네이버 블로그 글로 작성해주는 에이전트 시스템입니다.

## 목표

1. **YouTube 대본 추출** → 자막 수동/자동 처리
2. **요약·인사이트 도출** → 영상 내용 분석
3. **글감 제안** → 블로그로 쓸 만한 주제 추천
4. **블로그 글 자동 작성** → 초고·검토·완성
5. **Naver SEO 최적화** → 체류시간 구조·키워드 배치

## 시스템 구조

### 워크플로우

- **WF0**: 스타일 가이드 부트스트랩 (기존 글 1~2편 필요)
- **WF1**: YouTube 큐레이션 파이프라인
  - 대본 추출 → 요약 → 인사이트 → 글감 제안
- **WF2**: 블로그 글 작성 파이프라인
  - 초고 → 비판적 검토 → 수정 → 문체·SEO 반영 → 완성

### 에이전트 (멀티에이전트 구조)

| 에이전트 | 역할 | 단계 |
|---------|------|------|
| Orchestrator | 전체 조율, 워크플로우 관리 | 모든 단계 |
| Curator | YouTube 대본→글감 추출 | WF1 |
| Writer | 초고·수정·최종 작성 | WF2-1,3,5 |
| Reviewer | 비판·웹 팩트체크 | WF2-2 |
| Style-Editor | 문체 가이드 및 피드백 | WF0, WF2-4 |
| SEO-Specialist | Naver SEO 피드백 | WF2-4 |

## 폴더 구조

```
/project-root
├── README.md                          # 이 파일
├── CLAUDE.md                          # 메인 오케스트레이터
├── .claude/
│   ├── /agents/
│   │   ├── /curator/AGENT.md
│   │   ├── /writer/AGENT.md
│   │   ├── /reviewer/AGENT.md
│   │   ├── /style-editor/AGENT.md
│   │   └── /seo-specialist/AGENT.md
│   └── /skills/
│       ├── /youtube-transcript/SKILL.md
│       ├── /style-guide/SKILL.md
│       └── /naver-seo/SKILL.md
├── /output/
│   ├── /transcripts/     # 추출된 대본
│   ├── /ideas/           # 글감·인사이트
│   ├── /drafts/          # 초고·수정고
│   ├── /feedback/        # 역할별 피드백
│   └── /posts/           # 완성 글
└── /docs/
    └── /style_samples/   # 부트스트랩용 샘플 글
```

## 사용 방법

### 1단계: 스타일 가이드 생성 (최초 1회)

기존 글 1~2편을 `/docs/style_samples/`에 저장한 후:

```
/style-guide bootstrap
```

### 2단계: YouTube 큐레이션

YouTube 링크를 제공:

```
/curator https://youtube.com/watch?v=...
```

→ 글감 후보 제시 → 선택

### 3단계: 블로그 글 작성

선택한 글감으로 완성 글까지 자동 작성:

```
/writer [선택한-글감]
```

## 현재 상태

- ✅ 프로젝트 초기화 (폴더·구조)
- 🔄 WF1(큐레이션) 구현 중
- ⏳ WF0, WF2는 추후

## 참고

자세한 설계서는 `CLAUDE.md`를 참조하세요.
