interface Link {
  title: string;
  url: string;
}

interface CompanyCardProps {
  id: number;
  company: string;
  country: string;
  category?: string;
  segment?: string;
  technologies?: string;
  maturity?: string;
  roi?: string;
  links?: Link[];
}

export default function CompanyCard({
  id,
  company,
  country,
  category,
  segment,
  technologies,
  maturity,
  roi,
  links = [],
}: CompanyCardProps) {
  // 성숙도 색상 매핑
  const maturityColorMap: Record<string, string> = {
    "①개념검증": "bg-blue-100 text-blue-800",
    "②도입초기": "bg-yellow-100 text-yellow-800",
    "③상용운영": "bg-green-100 text-green-800",
    "④전사확산": "bg-purple-100 text-purple-800",
  };

  const maturityColor = maturity ? maturityColorMap[maturity] || "bg-gray-100 text-gray-800" : "";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 border-l-4 border-indigo-500 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-900">{company}</h2>
        {maturity && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${maturityColor}`}>
            {maturity}
          </span>
        )}
      </div>

      <div className="space-y-3 text-sm">
        {/* 국가 */}
        <div className="flex items-center text-gray-700">
          <span className="text-lg mr-2">🌍</span>
          <span className="font-medium">{country}</span>
        </div>

        {/* 분류 */}
        {category && (
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase">분류</p>
            <p className="text-gray-700">{category}</p>
          </div>
        )}

        {/* 부문 */}
        {segment && (
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase">적용 부문</p>
            <p className="text-gray-700">{segment}</p>
          </div>
        )}

        {/* 기술 스택 */}
        {technologies && (
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase">기술</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {technologies.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ROI 효과 */}
        {roi && (
          <div className="bg-green-50 rounded p-2 border-l-2 border-green-400">
            <p className="text-gray-500 text-xs font-semibold uppercase">ROI 효과</p>
            <p className="text-gray-700 text-sm">{roi}</p>
          </div>
        )}
      </div>

      {/* 링크 섹션 */}
      {links && links.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-xs font-semibold uppercase mb-2">링크</p>
          <div className="space-y-2">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm hover:underline transition-colors"
              >
                <span>🔗</span>
                <span className="truncate">{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
