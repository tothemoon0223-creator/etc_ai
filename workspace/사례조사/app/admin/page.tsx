"use client";

import { useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleManualUpdate = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/batch/update-research", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "업데이트 실패");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "요청 처리 중 오류 발생"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          관리자 대시보드
        </h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              배치 처리 관리
            </h2>
            <p className="text-gray-600 mb-6">
              매일 아침 7시 KST에 자동으로 새로운 논문, 기사, 업데이트된 자료를
              검색하여 추가합니다.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>📅 스케줄:</strong> 매일 07:00 KST
                <br />
                <strong>🔄 기능:</strong> EPC 기업 관련 최신 논문/기사 자동 수집
                <br />
                <strong>📊 처리:</strong> Claude AI로 자동 구조화 및 중복 제거
              </p>
            </div>

            <button
              onClick={handleManualUpdate}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? "처리 중..." : "지금 수동으로 실행"}
            </button>
          </div>

          {/* 결과 메시지 */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold mb-2">✅ 성공</p>
              <pre className="text-sm text-green-700 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* 오류 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold mb-2">❌ 오류</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* 정보 섹션 */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              배치 처리 정보
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">1.</span>
                <span>
                  <strong>자동 실행:</strong> 매일 아침 7시에 배치가 자동으로
                  실행됩니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">2.</span>
                <span>
                  <strong>데이터 수집:</strong> Claude AI를 사용하여 최근 논문과
                  기사를 검색합니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">3.</span>
                <span>
                  <strong>구조화:</strong> 수집한 데이터를 회사별로 정리하고
                  중복을 제거합니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">4.</span>
                <span>
                  <strong>저장:</strong> 업데이트된 데이터가 자동으로 저장되고
                  웹사이트에 반영됩니다.
                </span>
              </li>
            </ul>
          </div>

          {/* 환경 설정 */}
          <div className="border-t pt-6 bg-gray-50 rounded p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              필요한 설정
            </h3>
            <code className="text-sm bg-white p-3 rounded block text-gray-800 overflow-auto">
              ANTHROPIC_API_KEY=your_api_key
              <br />
              NEXT_PUBLIC_API_URL=http://localhost:3000
            </code>
            <p className="text-xs text-gray-600 mt-2">
              .env.local 파일에 위 환경 변수를 설정해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
