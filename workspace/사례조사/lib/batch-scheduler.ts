let scheduler: any = null;

export async function startBatchScheduler() {
  // Node.js 환경에서만 실행
  if (typeof window !== 'undefined') {
    return;
  }

  try {
    // 동적 import로 Node.js 환경에서만 로드
    const cron = (await import('node-cron')).default;

    // 이미 실행 중이면 중지
    if (scheduler) {
      scheduler.stop();
    }

    // 매일 아침 7시(KST)에 실행
    // cron 표현식: 분 시 일 월 요일
    // 0 22 * * * = 매일 22:00 UTC = 07:00 KST
    scheduler = cron.schedule('0 22 * * *', async () => {
      console.log('[배치] 매일 7시 연구 자료 업데이트 시작...');

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/batch/update-research`,
          {
            method: 'POST',
          }
        );

        const data = await response.json();
        console.log('[배치] 업데이트 완료:', data);
      } catch (error) {
        console.error('[배치] 오류 발생:', error);
      }
    });

    console.log('배치 스케줄러가 시작되었습니다. (매일 07:00 KST)');
  } catch (error) {
    console.error('[배치] 스케줄러 초기화 오류:', error);
  }
}

export function stopBatchScheduler() {
  if (scheduler) {
    scheduler.stop();
    scheduler = null;
    console.log('배치 스케줄러가 중지되었습니다.');
  }
}
