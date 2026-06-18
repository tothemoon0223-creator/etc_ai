# youtube-transcript 스킬

YouTube 영상의 자막(대본)을 추출합니다. 수동자막 우선, 없으면 자동생성 시도.

## 사용법

```bash
youtube-transcript <YouTube_URL>
```

## 작동 원리

### 자막 추출 순서
1. 비디오 ID 파싱
2. 자막 목록 조회 (수동 → 자동)
3. 선택된 자막 다운로드
4. 텍스트 정제
5. 메타정보 헤더 추가
6. `/output/transcripts/<video_id>.md` 저장

## 자막 우선순위
- 1순위: 수동자막 한국어
- 2순위: 자동생성 한국어
- 3순위: 다른 언어
- 없음: 종료 + "자막이 없습니다" 메시지

## 구현

라이브러리: `youtube-transcript-api`

```python
from youtube_transcript_api import YouTubeTranscriptApi

# 사용 가능한 자막 조회 및 다운로드
captions = YouTubeTranscriptApi.list_transcripts(video_id)
transcript = captions.get_transcripts(['ko'])[0].fetch()
```

## 에러 처리

### 자막 없음
```
❌ 자막이 없는 영상입니다.
다른 영상을 선택해주세요.
```

### 비디오 ID 파싱 실패
```
❌ YouTube 링크 형식이 잘못되었습니다.
다음 형식을 사용해주세요:
- https://www.youtube.com/watch?v=<video_id>
- https://youtu.be/<video_id>
```

## 출력 예시

### 성공
```
✅ 대본이 추출되었습니다.

📊 정보
- 자막 유형: 수동자막 (한국어)
- 길이: 2,547자
- 저장: /output/transcripts/<video_id>.md

다음 단계: 요약 및 인사이트 도출 진행 중...
```
