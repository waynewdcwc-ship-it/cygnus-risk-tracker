import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
  Globe2,
  ShieldAlert,
  Zap,
  Truck,
  Landmark,
  Server,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Info,
  FileText,
  Layers,
  CalendarDays,
  Shield,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const riskItems = [
  {
    id: 1,
    category: "Geopolitical",
    title: "Great-power competition pressure",
    region: "Global / Indo-Pacific / Europe",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Strategic competition between major powers may increase policy uncertainty, defence spending, sanctions exposure, and regional escalation risk.",
    implications: [
      "Higher exposure to sanctions and trade restrictions",
      "Increased defence, security, and diplomatic uncertainty",
      "Greater need for regional contingency planning",
    ],
    assumption:
      "Global planning should assume persistent strategic competition and periodic escalation risks across major geopolitical fault lines.",
    icon: Globe2,
    position: { top: "35%", left: "73%" },
  },
  {
    id: 2,
    category: "Economic",
    title: "Global growth and inflation uncertainty",
    region: "Global markets",
    level: "Medium",
    trend: "Stable",
    confidence: "Medium",
    summary:
      "Uneven global growth, interest-rate sensitivity, currency movement, and cost pressure may affect investment, pricing, and demand planning.",
    implications: [
      "More cautious capital allocation",
      "Pressure on margins and procurement costs",
      "Need for stronger financial scenario modelling",
    ],
    assumption:
      "Strategic plans should include downside, base-case, and recovery scenarios for global economic conditions.",
    icon: Landmark,
    position: { top: "43%", left: "50%" },
  },
  {
    id: 3,
    category: "Supply Chain",
    title: "Maritime chokepoint disruption risk",
    region: "Red Sea / Suez / Strait of Hormuz / South China Sea",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Pressure on key maritime corridors may create shipping delays, insurance cost increases, rerouting requirements, and supply chain volatility.",
    implications: [
      "Longer lead times and route uncertainty",
      "Higher freight and insurance costs",
      "Increased need for supplier and corridor diversification",
    ],
    assumption:
      "Scenario models should include disruption to at least one major global trade corridor during the planning period.",
    icon: Truck,
    position: { top: "52%", left: "60%" },
  },
  {
    id: 4,
    category: "Cyber",
    title: "Systemic cyber disruption exposure",
    region: "Global digital infrastructure",
    level: "High",
    trend: "Increasing",
    confidence: "High",
    summary:
      "Rising digital dependency increases exposure to ransomware, state-linked cyber activity, cloud outages, supply-chain compromise, and data disruption.",
    implications: [
      "Greater operational continuity risk",
      "Higher third-party technology exposure",
      "Need to validate recovery, backup, and incident response plans",
    ],
    assumption:
      "Cyber disruption should be treated as a credible cross-border business continuity scenario.",
    icon: Server,
    position: { top: "28%", left: "42%" },
  },
  {
    id: 5,
    category: "Energy",
    title: "Energy security and transition volatility",
    region: "Global energy markets",
    level: "Medium",
    trend: "Stable",
    confidence: "Medium",
    summary:
      "Energy markets remain exposed to conflict risk, production decisions, infrastructure constraints, transition policy, and price volatility.",
    implications: [
      "Potential input-cost fluctuations",
      "Exposure to fuel, electricity, and logistics cost pressure",
      "Need to assess energy resilience and transition assumptions",
    ],
    assumption:
      "Planning should include energy price volatility and possible regional supply disruption as recurring strategic variables.",
    icon: Zap,
    position: { top: "55%", left: "54%" },
  },
  {
    id: 6,
    category: "Regulatory",
    title: "Fragmented regulation and compliance pressure",
    region: "Global / cross-border operations",
    level: "Medium",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Diverging regulations on data, trade, AI, sanctions, climate, and supply chains may increase compliance complexity for global organisations.",
    implications: [
      "Higher compliance and reporting burden",
      "Potential restrictions on market access or suppliers",
      "Need for early legal, policy, and governance review",
    ],
    assumption:
      "Strategic plans should assume regulatory fragmentation rather than global policy alignment.",
    icon: ShieldAlert,
    position: { top: "35%", left: "34%" },
  },
  {
    id: 7,
    category: "Climate",
    title: "Extreme weather and resilience pressure",
    region: "Global climate-exposed regions",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Extreme weather, water stress, heat, floods, and wildfire risk may affect infrastructure, agriculture, logistics, insurance, and operating continuity.",
    implications: [
      "Higher disruption risk to facilities and transport networks",
      "Increased insurance and resilience costs",
      "Need to test location-specific continuity assumptions",
    ],
    assumption:
      "Global planning should include climate-linked disruption as a recurring operational and strategic risk factor.",
    icon: AlertTriangle,
    position: { top: "66%", left: "29%" },
  },
  {
    id: 8,
    category: "Social Stability",
    title: "Public trust and social unrest risk",
    region: "Multiple regions",
    level: "Medium",
    trend: "Increasing",
    confidence: "Low",
    summary:
      "Cost-of-living pressure, political polarisation, misinformation, migration strain, and declining trust may increase protest and instability risk.",
    implications: [
      "Possible disruption to operations and public services",
      "Increased reputational and stakeholder-management risk",
      "Need for localised monitoring and crisis communication planning",
    ],
    assumption:
      "Scenario planning should include sudden localised unrest even where national-level risk appears manageable.",
    icon: Activity,
    position: { top: "45%", left: "25%" },
  },
];

const watchpoints = [
  "Escalation around major geopolitical fault lines affecting trade, sanctions, or security posture",
  "Disruption to a major maritime chokepoint or global logistics corridor",
  "Systemic cyber incident affecting cloud platforms, critical infrastructure, or third-party providers",
  "Energy price volatility triggered by conflict, policy decisions, or supply constraints",
  "Climate-linked disruption to infrastructure, agriculture, ports, or transport networks",
  "Regulatory fragmentation affecting data, AI, trade, sanctions, climate, or supply chains",
  "Public unrest or political instability caused by economic pressure, mistrust, or polarisation",
];

const levelStyles = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

function TrendIcon({ trend }) {
  if (trend === "Increasing") return <TrendingUp className="h-4 w-4" />;
  if (trend === "Decreasing") return <TrendingDown className="h-4 w-4" />;
  return <Minus className="h-4 w-4" />;
}

function LevelPill({ level }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${levelStyles[level]}`}
    >
      {level} Risk
    </span>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 text-[#0a3d91]">
        <Icon className="h-5 w-5" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(riskItems[0]);
  const [query, setQuery] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(riskItems.map((item) => item.category))),
  ];

  const filteredItems = useMemo(() => {
    return riskItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesQuery =
        !query ||
        `${item.title} ${item.category} ${item.region} ${item.summary}`
          .toLowerCase()
          .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-[#f4f6f9] text-slate-900">
      {/* TOP BRAND STRIP */}
      <div className="border-b border-[#d8dee8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#0a3d91]">
              CYGNUS DEVELOPMENT
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#b8862b]">
              Risk Intelligence Technology
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#d7e0ee] bg-[#f8fafc] px-3 py-1.5 text-xs text-slate-600 md:flex">
            <CalendarDays className="h-4 w-4 text-[#0a3d91]" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#d8dee8] bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/branding/cygnus-hero-wide.png')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.88)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8dee8] bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <Shield className="h-4 w-4 text-[#0a3d91]" />
                Tracker v0.2 · Global Strategic Risk Intelligence
              </div>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#0a2f73] md:text-6xl">
                Cygnus Global Strategic Risk Intelligence Tracker
              </h1>

              <p className="mt-4 text-xl italic text-[#b8862b] md:text-2xl">
                Turning uncertainty into structured insight
              </p>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
                A Cygnus Development dashboard for monitoring global strategic
                risk indicators, scenario watchpoints, planning assumptions, and
                strategic implications to support clearer, more structured
                decision-making.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#d8dee8] bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Intelligent Risk Analysis
                </span>
                <span className="rounded-full border border-[#d8dee8] bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Global Perspective
                </span>
                <span className="rounded-full border border-[#d8dee8] bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Strategic Decision Support
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d8dee8] bg-white/95 p-6 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#eef4ff] p-3 text-[#0a3d91]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Executive Snapshot
                  </p>
                  <h2 className="text-2xl font-semibold text-[#0a2f73]">
                    Elevated global uncertainty
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                Current sample indicators suggest a continuing requirement for
                active monitoring, structured scenario planning, and robust
                contingency assumptions across geopolitical, economic, cyber,
                supply chain, climate, and regulatory domains.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Risk posture
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#0a2f73]">
                    Elevated
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Trend
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#0a2f73]">
                    Mixed / volatile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT */}
          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
            <SectionTitle
              icon={Layers}
              title="Global Risk Indicator Cards"
              subtitle="Filter sample indicators by category or keyword."
            />

            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search risks..."
                  className="w-full rounded-xl border border-[#d8dee8] bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#0a3d91] sm:w-56"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#d8dee8] bg-white py-2 pl-9 pr-9 text-sm outline-none focus:border-[#0a3d91] sm:w-52"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const active = selectedItem.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      active
                        ? "border-[#b8862b] bg-[#fffaf1]"
                        : "border-[#e3e8ef] bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-2xl bg-[#eef4ff] p-3 text-[#0a3d91]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <LevelPill level={item.level} />
                    </div>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[#0a2f73]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.summary}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>{item.region}</span>
                      <span className="inline-flex items-center gap-1">
                        <TrendIcon trend={item.trend} /> {item.trend}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
              <SectionTitle
                icon={Globe2}
                title="Global Map View"
                subtitle="Marker positions are currently illustrative."
              />

              <div className="relative h-80 overflow-hidden rounded-2xl border border-[#d8dee8] bg-[radial-gradient(circle_at_center,_rgba(226,236,250,1)_0%,_rgba(244,246,249,1)_75%)]">
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(10,61,145,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,61,145,.08) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="absolute right-4 top-4 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Global overview
                </div>

                {riskItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-md transition hover:scale-110 ${
                      selectedItem.id === item.id
                        ? "bg-[#b8862b] text-white"
                        : "bg-[#0a3d91] text-white"
                    }`}
                    style={item.position}
                    title={item.title}
                  >
                    <MapPin className="h-4 w-4" />
                  </button>
                ))}

                <div className="absolute bottom-4 left-4 rounded-xl border border-[#d8dee8] bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-sm">
                  Placeholder map panel · Real interactive map can be added in
                  v0.3
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
              <SectionTitle
                icon={Info}
                title="Selected Indicator"
                subtitle="Detailed view of the currently selected indicator."
              />

              <div className="flex flex-wrap items-center gap-2">
                <LevelPill level={selectedItem.level} />
                <span className="rounded-full border border-[#d8dee8] bg-[#f8fafc] px-3 py-1 text-xs text-slate-600">
                  Confidence: {selectedItem.confidence}
                </span>
                <span className="rounded-full border border-[#d8dee8] bg-[#f8fafc] px-3 py-1 text-xs text-slate-600">
                  Trend: {selectedItem.trend}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#0a2f73]">
                {selectedItem.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {selectedItem.summary}
              </p>
            </div>
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
            <SectionTitle
              icon={AlertTriangle}
              title="Scenario Watchpoints"
              subtitle="Issues that decision-makers may wish to monitor closely."
            />

            <ul className="space-y-3">
              {watchpoints.map((watchpoint, index) => (
                <li
                  key={watchpoint}
                  className="flex gap-3 rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#0a3d91]">
                    {index + 1}
                  </span>
                  {watchpoint}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
            <SectionTitle
              icon={TrendingUp}
              title="Strategic Implications"
              subtitle="Potential second-order effects and decision implications."
            />

            <h3 className="text-base font-semibold text-[#0a2f73]">
              {selectedItem.title}
            </h3>

            <ul className="mt-4 space-y-3">
              {selectedItem.implications.map((implication) => (
                <li
                  key={implication}
                  className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-3 text-sm leading-6 text-slate-700"
                >
                  {implication}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
            <SectionTitle
              icon={FileText}
              title="Planning Assumption"
              subtitle="Suggested planning premise for structured scenario work."
            />

            <p className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4 text-sm leading-6 text-slate-700">
              {selectedItem.assumption}
            </p>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a3d91] px-4 py-3 font-semibold text-white transition hover:bg-[#082f70]">
              Export Snapshot Later
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ABOUT / DISCLAIMER */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-3xl border border-[#d8dee8] bg-white shadow-sm">
            <div
              className="min-h-[320px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/branding/cygnus-banner.png')",
              }}
            />
          </div>

          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
            <SectionTitle
              icon={Building2}
              title="About Cygnus Development"
              subtitle="Risk Intelligence Technology"
            />

            <p className="text-sm leading-7 text-slate-700">
              Cygnus Development is a risk intelligence technology company
              focused on helping leaders navigate uncertainty with greater
              clarity, structure, and confidence. We build practical,
              intelligence-led tools that combine structured methodology with
              AI-enhanced insight to support stronger decisions, better
              preparedness, and more resilient outcomes.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                <p className="font-semibold text-[#0a2f73]">
                  Scenario Planning
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Structured tools to explore uncertainty and alternative
                  futures.
                </p>
              </div>
              <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                <p className="font-semibold text-[#0a2f73]">
                  Strategic Risk Analysis
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Intelligence-led identification and assessment of strategic
                  risks.
                </p>
              </div>
              <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                <p className="font-semibold text-[#0a2f73]">
                  Decision Support
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Practical insights to support confident, structured decisions.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
                Sources & Disclaimer
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                This tracker currently uses sample data and illustrative marker
                positions. Future versions may incorporate curated open-source
                information, structured data inputs, and AI-assisted analysis.
                The tracker is intended to support strategic awareness, scenario
                thinking, and decision support. It should not be treated as
                official intelligence, legal advice, financial advice, or a
                substitute for professional judgement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}