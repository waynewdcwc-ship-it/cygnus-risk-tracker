import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Compass,
  FileText,
  Layers,
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
    position: { top: "38%", left: "72%" },
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
    position: { top: "42%", left: "48%" },
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
    position: { top: "50%", left: "60%" },
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
    position: { top: "30%", left: "43%" },
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
    position: { top: "52%", left: "53%" },
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
    position: { top: "34%", left: "35%" },
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
    position: { top: "63%", left: "30%" },
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
    position: { top: "44%", left: "25%" },
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
  Low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Medium: "bg-amber-100 text-amber-900 border-amber-200",
  High: "bg-red-100 text-red-800 border-red-200",
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

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border shadow-xl ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,190,88,0.18),_transparent_35%),linear-gradient(135deg,_#071529_0%,_#0f2f58_48%,_#08111f_100%)]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-12 h-48 w-48 rounded-full bg-amber-300 blur-3xl" />
          <div className="absolute bottom-0 right-16 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100">
                <Activity className="h-4 w-4" />
                Prototype v0.1 · Global Strategic Risk Intelligence
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Cygnus Global Strategic Risk Intelligence Tracker
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                A prototype dashboard for monitoring global strategic risk
                indicators, scenario watchpoints, planning assumptions, and
                strategic implications for decision-makers.
              </p>
            </motion.div>

            <Card className="w-full max-w-sm border-white/10 bg-white/10 text-white backdrop-blur md:min-w-80">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-amber-300/20 p-3 text-amber-200">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      Executive Risk Snapshot
                    </p>
                    <h2 className="text-xl font-semibold">
                      Elevated global uncertainty
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-200">
                  Current sample indicators suggest a need for active
                  monitoring, stronger contingency planning, and clearly defined
                  scenario assumptions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-white/10 bg-white/[0.04] text-slate-100">
            <CardContent className="p-5 md:p-6">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-200">
                    <Layers className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">
                      Global Risk Indicator Cards
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    Filter sample indicators by category or keyword.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search risks..."
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-500 focus:border-amber-300/60 sm:w-52"
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 py-2 pl-9 pr-9 text-sm outline-none focus:border-amber-300/60 sm:w-48"
                    >
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </div>
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
                      className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:bg-white/[0.07] ${
                        active
                          ? "border-amber-300/70 bg-amber-300/10"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-2xl bg-slate-900 p-3 text-amber-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <LevelPill level={item.level} />
                      </div>

                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.summary}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                        <span>{item.region}</span>
                        <span className="inline-flex items-center gap-1">
                          <TrendIcon trend={item.trend} /> {item.trend}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.04] text-slate-100">
              <CardContent className="p-5 md:p-6">
                <div className="mb-4 flex items-center gap-2 text-amber-200">
                  <Globe2 className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Global Map View</h2>
                </div>

                <div className="relative h-80 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.45),_rgba(15,23,42,0.95)_65%)]">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {riskItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition hover:scale-110 ${
                        selectedItem.id === item.id
                          ? "bg-amber-300 text-slate-950"
                          : "bg-slate-950 text-amber-200 ring-1 ring-amber-200/40"
                      }`}
                      style={item.position}
                      title={item.title}
                    >
                      <MapPin className="h-4 w-4" />
                    </button>
                  ))}

                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">
                    Placeholder global map · Real interactive map can be added
                    later
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-300/20 bg-amber-300/10 text-slate-100">
              <CardContent className="p-5 md:p-6">
                <div className="mb-3 flex items-center gap-2 text-amber-100">
                  <Info className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Selected Indicator</h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <LevelPill level={selectedItem.level} />
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                    Confidence: {selectedItem.confidence}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                    Trend: {selectedItem.trend}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {selectedItem.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {selectedItem.summary}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.04] text-slate-100">
            <CardContent className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2 text-amber-200">
                <AlertTriangle className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Scenario Watchpoints</h2>
              </div>

              <ul className="space-y-3">
                {watchpoints.map((watchpoint, index) => (
                  <li
                    key={watchpoint}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-200"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-300/20 text-xs font-bold text-amber-100">
                      {index + 1}
                    </span>
                    {watchpoint}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-slate-100">
            <CardContent className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2 text-amber-200">
                <TrendingUp className="h-5 w-5" />
                <h2 className="text-xl font-semibold">
                  Strategic Implications
                </h2>
              </div>

              <h3 className="text-base font-semibold text-white">
                {selectedItem.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {selectedItem.implications.map((implication) => (
                  <li
                    key={implication}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-200"
                  >
                    {implication}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-slate-100">
            <CardContent className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2 text-amber-200">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Planning Assumption</h2>
              </div>

              <p className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm leading-6 text-slate-200">
                {selectedItem.assumption}
              </p>

              <button className="mt-5 w-full rounded-2xl bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
                Export Snapshot Later
              </button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-white/10 bg-slate-900/70 text-slate-100">
          <CardContent className="p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white">
              Sources & Disclaimer
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              This prototype uses sample data only. Future versions may use
              curated open-source information, user-provided inputs, and/or
              AI-assisted analysis. The tracker is intended to support
              structured planning and scenario thinking. It should not be
              treated as official intelligence, legal advice, financial advice,
              or a substitute for professional judgement.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}