"use client";

import { useState, useMemo } from "react";
import companies from "../data/companies.json";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [maturityFilter, setMaturityFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  // 고유한 성숙도와 국가 목록 추출
  const maturityLevels = useMemo(() => {
    const levels = new Set(companies.map((c: any) => c.maturity).filter(Boolean));
    return Array.from(levels).sort();
  }, []);

  const countries = useMemo(() => {
    const countrySet = new Set(companies.map((c: any) => c.country));
    return Array.from(countrySet).sort();
  }, []);

  // 필터링된 결과
  const filtered = useMemo(() => {
    return companies.filter((item: any) => {
      const matchSearch = item.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        (item.technologies &&
          item.technologies
            .toLowerCase()
            .includes(search.toLowerCase()));

      const matchMaturity = !maturityFilter || item.maturity === maturityFilter;
      const matchCountry = !countryFilter || item.country === countryFilter;

      return matchSearch && matchMaturity && matchCountry;
    });
  }, [search, maturityFilter, countryFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          EPC DT AI Map <span className="text-sm bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full ml-3 font-semibold">베타</span>
        </h1>
        <p className="text-gray-600 mb-4">
          해외 EPC 기업의 AI·BIM·디지털트윈 기술 도입 현황과 성숙도를 분석한 벤치마킹 매트릭스
        </p>
        <p className="text-sm text-gray-500 mb-8">
          💡 매일 아침 7시 KST에 새로운 논문, 기사, 업데이트 자료가 자동으로 추가됩니다.
          <a
            href="/admin"
            className="text-indigo-600 hover:text-indigo-800 ml-2 font-semibold"
          >
            관리자
          </a>
        </p>

        {/* 검색 필터 */}
        <div className="space-y-4 mb-8">
          {/* 회사명/기술 검색 */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="회사명 또는 기술명으로 검색..."
            className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-lg"
          />

          {/* 성숙도 필터 */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">성숙도</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMaturityFilter("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  !maturityFilter
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                전체
              </button>
              {maturityLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setMaturityFilter(level as string)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    maturityFilter === level
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* 국가 필터 */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">국가</p>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-sm"
            >
              <option value="">모든 국가</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 결과 요약 */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 font-medium">
            검색 결과: <span className="text-indigo-600 font-bold">{filtered.length}</span>개 / 전체{" "}
            <span className="text-indigo-600 font-bold">{companies.length}</span>개
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((company: any) => (
              <CompanyCard key={company.id} {...company} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setMaturityFilter("");
                  setCountryFilter("");
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
