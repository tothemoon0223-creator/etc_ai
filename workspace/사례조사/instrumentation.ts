export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const cron = await import('node-cron');
      cron.default.schedule('0 22 * * *', async () => {
        console.log('[배치] 매일 7시 연구 자료 업데이트 시작...');
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/batch/update-research`,
            { method: 'POST' }
          );
          const data = await response.json();
          console.log('[배치] 업데이트 완료:', data);
        } catch (error) {
          console.error('[배치] 오류 발생:', error);
        }
      });
      console.log('배치 스케줄러 시작됨 (매일 07:00 KST)');
    } catch (error) {
      console.error('[배치] 스케줄러 초기화 실패:', error);
    }
  }
}
