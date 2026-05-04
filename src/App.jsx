import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Zap,
  Truck,
  Landmark,
  Server,
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
  Globe2,
  BookOpen,
  Database,
  CheckCircle2,
  BarChart3,
  Link2,
  ExternalLink,
  Eye,
  FileSearch,
  Printer,
  Download,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  riskItems,
  watchpoints,
  lastUpdated,
  methodology,
  sourceMethodology,
} from "./riskData";

const levelStyles = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

const mapMarkerStyles = {
  Low: "#047857",
  Medium: "#b8862b",
  High: "#b91c1c",
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

function MetadataPill({ children }) {
  return (
    <span className="rounded-full border border-[#d8dee8] bg-[#f8fafc] px-3 py-1 text-xs text-slate-600">
      {children}
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
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

function createRiskMarker(level, isSelected) {
  const color = mapMarkerStyles[level] || "#0a3d91";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:${isSelected ? "34px" : "28px"};
        height:${isSelected ? "34px" : "28px"};
        border-radius:999px;
        background:${color};
        border:3px solid white;
        box-shadow:0 8px 20px rgba(15,23,42,0.35);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <div style="
          width:8px;
          height:8px;
          border-radius:999px;
          background:white;
        "></div>
      </div>
    `,
    iconSize: [isSelected ? 34 : 28, isSelected ? 34 : 28],
    iconAnchor: [isSelected ? 17 : 14, isSelected ? 17 : 14],
    popupAnchor: [0, -16],
  });
}

function GlobalRiskMap({ items, selectedItem, setSelectedItem }) {
  return (
    <div className="relative h-80 overflow-hidden rounded-2xl border border-[#d8dee8]">
      <MapContainer
        center={[20, 10]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={false}
        className="h-full w-full"
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map((item) => (
          <Marker
            key={item.id}
            position={item.coordinates}
            icon={createRiskMarker(item.level, selectedItem.id === item.id)}
            eventHandlers={{
              click: () => setSelectedItem(item),
            }}
          >
            <Popup>
              <div style={{ maxWidth: "260px" }}>
                <strong>{item.title}</strong>
                <br />
                <span>{item.region}</span>
                <br />
                <br />
                <span>
                  {item.level} risk · {item.trend}
                </span>
                <br />
                <span>Confidence: {item.confidence}</span>
                <br />
                <span>Source: {item.sourceReliability}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[500] rounded-xl border border-[#d8dee8] bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
        Interactive global map · v0.6
      </div>
    </div>
  );
}

function MethodologyPanel() {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={BookOpen}
        title="Risk Methodology"
        subtitle="How the prototype frames risk level, trend, and confidence."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#0a3d91]">
            <BarChart3 className="h-4 w-4" />
            <h3 className="font-semibold">Risk Levels</h3>
          </div>

          <div className="space-y-3">
            {methodology.riskLevels.map((item) => (
              <div key={item.level}>
                <LevelPill level={item.level} />
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#0a3d91]">
            <TrendingUp className="h-4 w-4" />
            <h3 className="font-semibold">Trend Direction</h3>
          </div>

          <div className="space-y-3">
            {methodology.trends.map((item) => (
              <div key={item.trend}>
                <p className="inline-flex items-center gap-1 rounded-full border border-[#d8dee8] bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <TrendIcon trend={item.trend} /> {item.trend}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#0a3d91]">
            <Shield className="h-4 w-4" />
            <h3 className="font-semibold">Assessment Confidence</h3>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {methodology.confidence}
          </p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-slate-700">
            Current confidence ratings are for presentation testing only and do
            not yet represent validated intelligence assessments.
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceIntelligencePanel({ selectedItem }) {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={FileSearch}
        title="Source Intelligence Layer"
        subtitle="v0.5 introduced structured source reliability and information confidence fields."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Shield className="h-4 w-4" />
            <h3 className="font-semibold">Source Reliability</h3>
          </div>

          <p className="mt-3 text-2xl font-bold text-[#0a2f73]">
            {selectedItem.sourceReliability}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This indicates the assessed reliability of the source base
            supporting the selected indicator.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Eye className="h-4 w-4" />
            <h3 className="font-semibold">Information Confidence</h3>
          </div>

          <p className="mt-3 text-2xl font-bold text-[#0a2f73]">
            {selectedItem.informationConfidence}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This reflects how strongly the available information supports the
            current assessment.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Database className="h-4 w-4" />
            <h3 className="font-semibold">Source Type</h3>
          </div>

          <p className="mt-3 text-lg font-bold text-[#0a2f73]">
            {selectedItem.sourceType}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The current tracker still uses sample data, but this structure
            prepares it for future source-backed entries.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-white p-4">
        <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
          <Info className="h-4 w-4" />
          Source Summary
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {selectedItem.sourceSummary}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-white p-4">
        <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
          <Link2 className="h-4 w-4" />
          Source References
        </h3>

        <div className="mt-3 grid gap-3">
          {selectedItem.sourceReferences.map((source, index) => (
            <div
              key={`${source.label}-${index}`}
              className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold text-[#0a2f73]">
                    {source.label}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    {source.type}
                  </p>
                </div>

                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#d8dee8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0a3d91] hover:border-[#0a3d91]"
                  >
                    Open source
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-[#b8862b]">
                    No external link yet
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {source.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SourceMethodologyPanel() {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={Shield}
        title="Source Reliability Methodology"
        subtitle="How future source-backed entries can be graded and explained."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#0a2f73]">
            <FileSearch className="h-4 w-4" />
            Source Reliability
          </h3>

          <div className="space-y-3">
            {sourceMethodology.sourceReliability.map((item) => (
              <div
                key={item.rating}
                className="rounded-xl border border-[#e3e8ef] bg-white p-3"
              >
                <p className="font-semibold text-[#0a2f73]">{item.rating}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#0a2f73]">
            <Eye className="h-4 w-4" />
            Information Confidence
          </h3>

          <div className="space-y-3">
            {sourceMethodology.informationConfidence.map((item) => (
              <div
                key={item.rating}
                className="rounded-xl border border-[#e3e8ef] bg-white p-3"
              >
                <p className="font-semibold text-[#0a2f73]">{item.rating}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
          Prototype status
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          In v0.6, all current source fields are structural placeholders. They
          demonstrate how the tracker can later present curated, source-backed
          risk indicators without yet claiming live intelligence validation.
        </p>
      </div>
    </div>
  );
}

function SelectedBriefing({ selectedItem, onPrintBriefing }) {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <SectionTitle
          icon={FileText}
          title="Selected Indicator Briefing"
          subtitle="Structured briefing view for the currently selected indicator."
        />

        <button
          onClick={onPrintBriefing}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d91] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#082f70]"
        >
          Print / Save Selected Briefing
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <LevelPill level={selectedItem.level} />
        <MetadataPill>Confidence: {selectedItem.confidence}</MetadataPill>
        <MetadataPill>Trend: {selectedItem.trend}</MetadataPill>
        <MetadataPill>Updated: {selectedItem.lastUpdated}</MetadataPill>
        <MetadataPill>Source: {selectedItem.sourceReliability}</MetadataPill>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-[#0a2f73]">
        {selectedItem.title}
      </h3>

      <p className="mt-2 text-sm font-medium text-slate-500">
        {selectedItem.region}
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h4 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <Info className="h-4 w-4" />
            Assessment Summary
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {selectedItem.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h4 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <CheckCircle2 className="h-4 w-4" />
            Planning Assumption
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {selectedItem.assumption}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-white p-4">
        <h4 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
          <TrendingUp className="h-4 w-4" />
          Strategic Implications
        </h4>

        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {selectedItem.implications.map((implication) => (
            <li
              key={implication}
              className="rounded-xl border border-[#e3e8ef] bg-[#f8fafc] p-3 text-sm leading-6 text-slate-700"
            >
              {implication}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Source type
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
            {selectedItem.sourceType}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Source reliability
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
            {selectedItem.sourceReliability}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Information confidence
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
            {selectedItem.informationConfidence}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Assessment status
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
            {selectedItem.assessmentStatus}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
          Confidence note
        </h4>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {selectedItem.confidenceNote}
        </p>
      </div>
    </div>
  );
}

function PrintableBriefing({ selectedItem, lastUpdated }) {
  const referenceNumber = `CYG-GSRI-${String(selectedItem.id).padStart(
    3,
    "0"
  )}`;

  return (
    <div className="print-briefing">
      <div className="print-page">
        <div className="print-header">
          <div className="print-brand">Cygnus Development</div>
          <div className="print-subbrand">Risk Intelligence Technology</div>

          <div className="print-title">
            Global Strategic Risk Intelligence Briefing
          </div>

          <p style={{ marginTop: "10px", fontSize: "12px", color: "#475569" }}>
            Turning uncertainty into structured insight
          </p>
        </div>

        <div className="print-grid">
          <div className="print-meta">
            <div className="print-meta-label">Briefing Reference</div>
            <div className="print-meta-value">{referenceNumber}</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Prepared By</div>
            <div className="print-meta-value">Cygnus Development</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Tracker Version</div>
            <div className="print-meta-value">v0.6 Prototype</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Last Updated</div>
            <div className="print-meta-value">{lastUpdated}</div>
          </div>
        </div>

        <div className="print-section">
          <h2>Selected Indicator</h2>
          <p>
            <strong>{selectedItem.title}</strong>
          </p>
          <p>{selectedItem.region}</p>
        </div>

        <div className="print-grid" style={{ marginTop: "12px" }}>
          <div className="print-meta">
            <div className="print-meta-label">Category</div>
            <div className="print-meta-value">{selectedItem.category}</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Risk Level</div>
            <div className="print-meta-value">{selectedItem.level}</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Trend</div>
            <div className="print-meta-value">{selectedItem.trend}</div>
          </div>

          <div className="print-meta">
            <div className="print-meta-label">Assessment Confidence</div>
            <div className="print-meta-value">{selectedItem.confidence}</div>
          </div>
        </div>

        <div className="print-section">
          <h2>Assessment Summary</h2>
          <p>{selectedItem.summary}</p>
        </div>

        <div className="print-section">
          <h2>Strategic Implications</h2>
          <ul>
            {selectedItem.implications.map((implication) => (
              <li key={implication}>{implication}</li>
            ))}
          </ul>
        </div>

        <div className="print-section">
          <h2>Planning Assumption</h2>
          <p>{selectedItem.assumption}</p>
        </div>

        <div className="print-section">
          <h2>Source Intelligence Layer</h2>

          <div className="print-grid">
            <div className="print-meta">
              <div className="print-meta-label">Source Type</div>
              <div className="print-meta-value">{selectedItem.sourceType}</div>
            </div>

            <div className="print-meta">
              <div className="print-meta-label">Source Reliability</div>
              <div className="print-meta-value">
                {selectedItem.sourceReliability}
              </div>
            </div>

            <div className="print-meta">
              <div className="print-meta-label">Information Confidence</div>
              <div className="print-meta-value">
                {selectedItem.informationConfidence}
              </div>
            </div>

            <div className="print-meta">
              <div className="print-meta-label">Assessment Status</div>
              <div className="print-meta-value">
                {selectedItem.assessmentStatus}
              </div>
            </div>
          </div>

          <p style={{ marginTop: "12px" }}>{selectedItem.sourceSummary}</p>
        </div>

        <div className="print-section">
          <h2>Confidence Note</h2>
          <p>{selectedItem.confidenceNote}</p>
        </div>

        <div className="print-disclaimer">
          <strong>Disclaimer:</strong> This briefing is generated from the
          Cygnus Global Strategic Risk Intelligence Tracker prototype. Current
          content uses illustrative/sample risk indicators and source
          placeholders. It is intended to support strategic awareness, scenario
          thinking, and decision support. It should not be treated as official
          intelligence, legal advice, financial advice, or a substitute for
          professional judgement.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(riskItems[0]);
  const [query, setQuery] = useState("");

  const handlePrintBriefing = () => {
    window.print();
  };

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
    <main className="min-h-screen bg-[#f4f6f9] text-slate-900">
      <div className="screen-content">
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
                  Tracker v0.6 · Print Briefing Layer
                </div>

                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#0a2f73] md:text-6xl">
                  Cygnus Global Strategic Risk Intelligence Tracker
                </h1>

                <p className="mt-4 text-xl italic text-[#b8862b] md:text-2xl">
                  Turning uncertainty into structured insight
                </p>

                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
                  A Cygnus Development dashboard for monitoring global strategic
                  risk indicators, scenario watchpoints, planning assumptions,
                  and strategic implications to support clearer, more structured
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

                  <button
                    onClick={handlePrintBriefing}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0a3d91] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f70]"
                  >
                    <Printer className="h-4 w-4" />
                    Print / Save Briefing
                  </button>
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
                  Current prototype indicators suggest a continuing requirement
                  for active monitoring, structured scenario planning, and
                  robust contingency assumptions across geopolitical, economic,
                  cyber, supply chain, climate, and regulatory domains.
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
                      Status
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#0a2f73]">
                      Prototype data
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#b8862b]">
                    v0.6 enhancement
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    This version adds a clean print / save briefing layer for
                    the currently selected indicator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
              <SectionTitle
                icon={Layers}
                title="Global Risk Indicator Cards"
                subtitle="Filter indicators by category or keyword."
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

                      <div className="mt-3 rounded-xl border border-[#e3e8ef] bg-[#f8fafc] px-3 py-2 text-xs text-slate-600">
                        Source: {item.sourceReliability}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
                <SectionTitle
                  icon={Globe2}
                  title="Interactive Global Map"
                  subtitle="Click a marker to select a risk indicator."
                />

                <GlobalRiskMap
                  items={riskItems}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-red-700">
                    High risk
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700">
                    Medium risk
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                    Low risk
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
                <SectionTitle
                  icon={Info}
                  title="Selected Indicator"
                  subtitle="Current indicator metadata and source status."
                />

                <div className="flex flex-wrap items-center gap-2">
                  <LevelPill level={selectedItem.level} />
                  <MetadataPill>
                    Confidence: {selectedItem.confidence}
                  </MetadataPill>
                  <MetadataPill>Trend: {selectedItem.trend}</MetadataPill>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[#0a2f73]">
                  {selectedItem.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {selectedItem.summary}
                </p>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Source reliability
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
                      {selectedItem.sourceReliability}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Information confidence
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
                      {selectedItem.informationConfidence}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Assessment status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
                      {selectedItem.assessmentStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <SelectedBriefing
              selectedItem={selectedItem}
              onPrintBriefing={handlePrintBriefing}
            />
          </div>

          <div className="mt-6">
            <SourceIntelligencePanel selectedItem={selectedItem} />
          </div>

          <div className="mt-6">
            <MethodologyPanel />
          </div>

          <div className="mt-6">
            <SourceMethodologyPanel />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
              <SectionTitle
                icon={AlertTriangle}
                title="Scenario Watchpoints"
                subtitle="Issues decision-makers may wish to monitor closely."
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
                icon={Database}
                title="Data Structure"
                subtitle="v0.6 prepares the tracker for briefing and export workflows."
              />

              <div className="space-y-3">
                <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                  <p className="font-semibold text-[#0a2f73]">
                    Print-ready briefing
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The selected indicator can now be printed or saved as a PDF
                    using the browser print dialog.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                  <p className="font-semibold text-[#0a2f73]">
                    Briefing reference number
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Each printed briefing includes a simple Cygnus reference
                    number linked to the selected indicator.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                  <p className="font-semibold text-[#0a2f73]">
                    Future PDF export path
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This print layer prepares the tracker for a more advanced
                    PDF export engine in a future version.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
              <SectionTitle
                icon={Building2}
                title="Cygnus Development"
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

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
                  Sources & Disclaimer
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  This tracker currently uses sample data and illustrative risk
                  indicators. Source references and reliability fields are
                  structural placeholders for future source-backed entries. The
                  tracker is intended to support strategic awareness, scenario
                  thinking, and decision support. It should not be treated as
                  official intelligence, legal advice, financial advice, or a
                  substitute for professional judgement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#d8dee8] bg-white shadow-sm">
            <div
              className="min-h-[320px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/branding/cygnus-banner.png')",
              }}
            />
          </div>
        </section>
      </div>

      <PrintableBriefing
        selectedItem={selectedItem}
        lastUpdated={lastUpdated}
      />
    </main>
  );
}