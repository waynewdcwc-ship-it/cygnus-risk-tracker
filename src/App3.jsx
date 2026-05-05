import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
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
  HelpCircle,
  ListChecks,
  ClipboardList,
  Signal,
  SearchCheck,
  NotebookText,
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
  dataCurationMethodology,
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

const WORLD_BANK_INDICATORS = [
  {
    id: "NY.GDP.MKTP.KD.ZG",
    title: "Global GDP growth",
    unit: "% annual growth",
    note: "World Bank national accounts data and OECD National Accounts data files.",
  },
  {
    id: "FP.CPI.TOTL.ZG",
    title: "Global inflation, consumer prices",
    unit: "% annual change",
    note: "International Monetary Fund, International Financial Statistics and data files.",
  },
  {
    id: "SL.UEM.TOTL.ZS",
    title: "Global unemployment",
    unit: "% of total labour force",
    note: "ILO-modelled estimates reported through the World Bank indicator set.",
  },
];


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

function ViewModeButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#0a3d91] text-white shadow-sm"
          : "text-slate-600 hover:bg-[#f8fafc]"
      }`}
    >
      {children}
    </button>
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
                <span>Review priority: {item.reviewPriority}</span>
                <br />
                <span>Source: {item.sourceReliability}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[500] rounded-xl border border-[#d8dee8] bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
        Interactive global map · v1.5 Public Preview
      </div>
    </div>
  );
}

function SourceIntelligencePanel({ selectedItem }) {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={FileSearch}
        title="Source References"
        subtitle="Selected source-backed sample references for the current indicator."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Shield className="h-4 w-4" />
            <h3 className="font-semibold">Source Reliability</h3>
          </div>

          <p className="mt-3 text-2xl font-bold text-[#0a2f73]">
            {selectedItem.sourceReliability}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Assessed reliability of the source base supporting the selected
            indicator.
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
            How strongly the available information supports the current
            assessment.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <SearchCheck className="h-4 w-4" />
            <h3 className="font-semibold">Review Priority</h3>
          </div>

          <p className="mt-3 text-2xl font-bold text-[#0a2f73]">
            {selectedItem.reviewPriority}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Indicates how important it is to refresh or validate before formal
            use.
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
            Source-backed sample indicator for public preview use.
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
          Source Links
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

function DataCurationPanel({ selectedItem }) {
  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={ClipboardList}
        title="Data Curation Layer"
        subtitle="Curated data points, monitoring signals, intelligence gaps, and analyst interpretation for the selected indicator."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <Database className="h-4 w-4" />
            Curated Data Points
          </h3>

          <ul className="mt-3 space-y-2">
            {selectedItem.curatedDataPoints.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-[#e3e8ef] bg-white p-3 text-sm leading-6 text-slate-700"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <Signal className="h-4 w-4" />
            Monitoring Signals
          </h3>

          <ul className="mt-3 space-y-2">
            {selectedItem.monitoringSignals.map((signal) => (
              <li
                key={signal}
                className="rounded-xl border border-[#e3e8ef] bg-white p-3 text-sm leading-6 text-slate-700"
              >
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <SearchCheck className="h-4 w-4" />
            Intelligence Gaps
          </h3>

          <ul className="mt-3 space-y-2">
            {selectedItem.intelligenceGaps.map((gap) => (
              <li
                key={gap}
                className="rounded-xl border border-[#e3e8ef] bg-white p-3 text-sm leading-6 text-slate-700"
              >
                {gap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <NotebookText className="h-4 w-4" />
            Analyst Note
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {selectedItem.analystNote}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <Shield className="h-4 w-4" />
            Source Quality Note
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {selectedItem.sourceQualityNote}
          </p>
        </div>
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
          className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d91] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#082f70]"
        >
          Print / Save Selected Briefing
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <LevelPill level={selectedItem.level} />
        <MetadataPill>Confidence: {selectedItem.confidence}</MetadataPill>
        <MetadataPill>Trend: {selectedItem.trend}</MetadataPill>
        <MetadataPill>Review: {selectedItem.reviewPriority}</MetadataPill>
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

      <div className="mt-4 grid gap-4 md:grid-cols-5">
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
            Review priority
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
            {selectedItem.reviewPriority}
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

function ExecutiveBriefingMode({
  riskItems,
  selectedItem,
  setSelectedItem,
  onPrintBriefing,
}) {
  const highRiskItems = riskItems.filter((item) => item.level === "High");
  const increasingItems = riskItems.filter(
    (item) => item.trend === "Increasing"
  );
  const highReviewItems = riskItems.filter(
    (item) => item.reviewPriority === "High"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#b8862b]">
              Executive Briefing Mode
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#0a2f73] md:text-4xl">
              Global Strategic Risk Executive Briefing
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              This briefing view summarises priority risks, review priorities,
              strategic themes, planning assumptions, and selected indicator
              detail.
            </p>
          </div>

          <button
            onClick={onPrintBriefing}
            className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d91] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#082f70]"
          >
            <Printer className="h-4 w-4" />
            Print Selected Briefing
          </button>
        </div>

        <div className="mobile-card-stack mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total indicators
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0a2f73]">
              {riskItems.length}
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-xs uppercase tracking-wide text-red-600">
              High risk
            </p>
            <p className="mt-2 text-3xl font-bold text-red-700">
              {highRiskItems.length}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs uppercase tracking-wide text-[#b8862b]">
              High review priority
            </p>
            <p className="mt-2 text-3xl font-bold text-[#b8862b]">
              {highReviewItems.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dee8] bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Increasing trend
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0a2f73]">
              {increasingItems.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={AlertTriangle}
            title="Priority Risk Indicators"
            subtitle="High-risk indicators currently highlighted in the public preview."
          />

          <div className="space-y-3">
            {highRiskItems.map((item) => {
              const Icon = item.icon;
              const active = selectedItem.id === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                    active
                      ? "border-[#b8862b] bg-[#fffaf1]"
                      : "border-[#e3e8ef] bg-[#f8fafc]"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <div className="w-fit rounded-2xl bg-white p-3 text-[#0a3d91]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <LevelPill level={item.level} />
                        <MetadataPill>{item.trend}</MetadataPill>
                        <MetadataPill>Review: {item.reviewPriority}</MetadataPill>
                      </div>

                      <h3 className="mt-3 font-semibold text-[#0a2f73]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={TrendingUp}
            title="Strategic Themes"
            subtitle="Cross-cutting themes emerging from the current curated samples."
          />

          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <h3 className="font-semibold text-[#0a2f73]">
                Monitoring value has increased
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                v1.3 adds monitoring signals for each indicator, making the
                tracker more useful as a planning and review tool.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <h3 className="font-semibold text-[#0a2f73]">
                Intelligence gaps remain visible
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Intelligence gaps show what still needs to be validated before a
                sample indicator could become formal intelligence output.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <h3 className="font-semibold text-[#0a2f73]">
                Source confidence remains preview-level
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Current entries are source-backed and curated, but still require
                validation before formal client-facing use.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={CheckCircle2}
            title="Recommended Planning Posture"
            subtitle="Suggested posture for strategic planning and scenario work."
          />

          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <p className="font-semibold text-[#0a2f73]">
                Prioritise high-review indicators
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                High review priority indicators should be refreshed first before
                operational or client-facing use.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <p className="font-semibold text-[#0a2f73]">
                Track monitoring signals
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use monitoring signals to decide what developments should trigger
                a scenario refresh or leadership review.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
              <p className="font-semibold text-[#0a2f73]">
                Close intelligence gaps
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Treat intelligence gaps as the next research requirements before
                moving from public preview to formal analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={FileText}
            title="Current Selected Indicator"
            subtitle="Executive summary of the selected risk indicator."
          />

          <div className="flex flex-wrap items-center gap-2">
            <LevelPill level={selectedItem.level} />
            <MetadataPill>{selectedItem.category}</MetadataPill>
            <MetadataPill>Trend: {selectedItem.trend}</MetadataPill>
            <MetadataPill>Confidence: {selectedItem.confidence}</MetadataPill>
            <MetadataPill>Review: {selectedItem.reviewPriority}</MetadataPill>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-[#0a2f73]">
            {selectedItem.title}
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-500">
            {selectedItem.region}
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-700">
            {selectedItem.summary}
          </p>

          <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
            <h4 className="font-semibold text-[#0a2f73]">
              Planning assumption
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {selectedItem.assumption}
            </p>
          </div>

          <button
            onClick={onPrintBriefing}
            className="mobile-full-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a3d91] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#082f70]"
          >
            <Printer className="h-4 w-4" />
            Print / Save This Briefing
          </button>
        </div>
      </div>
    </section>
  );
}

function HelpMethodologyMode() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#b8862b]">
          Help & Methodology
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[#0a2f73] md:text-4xl">
          Help, Terminology & Methodology
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700">
          This section explains how to read the tracker, what the key terms
          mean, how the risk and source-confidence layers are structured, and
          how the v1.5 data status, curation and live data fields should be interpreted.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={HelpCircle}
            title="How to Use This Tracker"
            subtitle="A quick guide for visitors and decision-makers."
          />

          <div className="space-y-3">
            {[
              "Use Dashboard mode to explore risk indicators, the map, selected indicator briefings, source links, and data curation fields.",
              "Use Executive Briefing mode for a concise strategic overview of priority risks and planning posture.",
              "Select any risk card or map marker to update the selected indicator briefing.",
              "Use Print / Save Briefing to create a printable briefing or save the selected indicator as a PDF.",
              "Use the data curation layer to review monitoring signals, intelligence gaps, analyst notes and source quality notes.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4 text-sm leading-6 text-slate-700"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#0a3d91]">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
          <SectionTitle
            icon={ListChecks}
            title="Key Terminology"
            subtitle="Plain-language explanation of the main tracker terms."
          />

          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                term: "Risk indicator",
                meaning:
                  "A structured signal or theme that may affect strategic planning, operations, resilience, or decision-making.",
              },
              {
                term: "Review priority",
                meaning:
                  "How important it is to refresh, validate, or deepen the indicator before formal use.",
              },
              {
                term: "Curated data points",
                meaning:
                  "Selected source-backed observations that support the indicator theme.",
              },
              {
                term: "Monitoring signals",
                meaning:
                  "Developments that should be watched because they may change the assessment.",
              },
              {
                term: "Intelligence gaps",
                meaning:
                  "Information still needed before the indicator can be treated as a formal intelligence product.",
              },
              {
                term: "Analyst note",
                meaning:
                  "Plain-language interpretation of how the indicator should be used in the public preview.",
              },
              {
                term: "Source quality note",
                meaning:
                  "A caution or explanation about the strengths and limits of the source base.",
              },
              {
                term: "Public preview",
                meaning:
                  "A demonstration version intended to show structure and workflow, not a live intelligence service.",
              },
            ].map((item) => (
              <div
                key={item.term}
                className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4"
              >
                <p className="font-semibold text-[#0a2f73]">{item.term}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
        <SectionTitle
          icon={ClipboardList}
          title="Data Curation Methodology"
          subtitle="How the enhanced source, data curation, and live data fields should be interpreted."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Curated Data Points", dataCurationMethodology.curatedDataPoints],
            ["Monitoring Signals", dataCurationMethodology.monitoringSignals],
            ["Intelligence Gaps", dataCurationMethodology.intelligenceGaps],
            ["Analyst Note", dataCurationMethodology.analystNote],
            ["Review Priority", dataCurationMethodology.reviewPriority],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4"
            >
              <p className="font-semibold text-[#0a2f73]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
        <SectionTitle
          icon={BookOpen}
          title="Risk Methodology"
          subtitle="How the tracker frames risk level, trend, and confidence."
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
              Current confidence ratings support demonstration and public
              preview use only. They should not yet be treated as formal
              intelligence judgements.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
        <SectionTitle
          icon={Shield}
          title="Source Reliability Methodology"
          subtitle="How source-backed entries are graded and explained."
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
            Public preview status
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            In v1.5, indicators include curated public source references,
            enhanced data curation fields, and a limited live data preview, but the tracker remains a public
            preview. It should not be treated as live intelligence reporting or
            formal advisory output.
          </p>
        </div>
      </div>
    </section>
  );
}

function DataStatusReviewPanel({ selectedItem }) {
  const statusRows = [
    {
      layer: "Curated assessment layer",
      status: "Manual Cygnus review",
      refresh: "Refresh when sources change or monitoring signals escalate",
      use: "Supports structured risk interpretation and scenario planning",
    },
    {
      layer: "Source-backed indicator layer",
      status: "Curated public sources",
      refresh: "Review source links and notes during each update cycle",
      use: "Shows the evidence base behind sample indicators",
    },
    {
      layer: "Live/open data context",
      status: "Fetched from open data where available",
      refresh: "Refresh in-browser; does not change risk ratings automatically",
      use: "Provides factual context only, not intelligence judgement",
    },
    {
      layer: "Intelligence gaps",
      status: "Open validation requirements",
      refresh: "Close gaps before formal advisory or client-facing use",
      use: "Shows what still needs research or verification",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <SectionTitle
        icon={SearchCheck}
        title="Data Status & Review Workflow"
        subtitle="Shows what is curated, what is live/open data, and what still needs validation before formal use."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Shield className="h-4 w-4" />
            <h3 className="font-semibold">Curated Assessment</h3>
          </div>
          <p className="mt-3 text-lg font-bold text-[#0a2f73]">Manual review</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Risk ratings remain curated and are not automatically changed by live data.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <CalendarDays className="h-4 w-4" />
            <h3 className="font-semibold">Last Review</h3>
          </div>
          <p className="mt-3 text-lg font-bold text-[#0a2f73]">{lastUpdated}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This reflects the current public preview review date for the curated data layer.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Signal className="h-4 w-4" />
            <h3 className="font-semibold">Refresh Triggers</h3>
          </div>
          <p className="mt-3 text-lg font-bold text-[#0a2f73]">Monitoring signals</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Major changes in monitoring signals should trigger a review of the selected indicator.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
          <div className="flex items-center gap-2 text-[#0a3d91]">
            <Database className="h-4 w-4" />
            <h3 className="font-semibold">Live Data Status</h3>
          </div>
          <p className="mt-3 text-lg font-bold text-[#0a2f73]">Context only</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Open data supports awareness but is not treated as an assessed intelligence product.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-white p-4">
        <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
          <ClipboardList className="h-4 w-4" />
          Review Workflow
        </h3>

        <div className="mt-3 grid gap-3">
          {statusRows.map((row) => (
            <div
              key={row.layer}
              className="grid gap-3 rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4 lg:grid-cols-[0.9fr_0.8fr_1.1fr_1.1fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Layer</p>
                <p className="mt-1 font-semibold text-[#0a2f73]">{row.layer}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{row.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Refresh rule</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{row.refresh}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Use</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{row.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e3e8ef] bg-white p-4">
          <h3 className="flex items-center gap-2 font-semibold text-[#0a2f73]">
            <FileText className="h-4 w-4" />
            Selected Indicator Review Status
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <MetadataPill>Review priority: {selectedItem.reviewPriority}</MetadataPill>
            <MetadataPill>Confidence: {selectedItem.confidence}</MetadataPill>
            <MetadataPill>Source: {selectedItem.sourceReliability}</MetadataPill>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Review this indicator first if its monitoring signals escalate, its source base changes, or its intelligence gaps need to be closed for formal use.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
            Credibility rule
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Cygnus separates raw/open data from curated assessment. Live data can support context and review triggers, but a human review should remain responsible for any risk-rating or planning-assumption change.
          </p>
        </div>
      </div>
    </div>
  );
}

function LiveDataPreviewPanel() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedAt, setFetchedAt] = useState(null);

  const fetchWorldBankIndicators = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const results = await Promise.all(
        WORLD_BANK_INDICATORS.map(async (indicator) => {
          const response = await fetch(
            `https://api.worldbank.org/v2/country/WLD/indicator/${indicator.id}?format=json&per_page=8`
          );

          if (!response.ok) {
            throw new Error(`World Bank request failed for ${indicator.id}`);
          }

          const payload = await response.json();
          const rows = Array.isArray(payload?.[1]) ? payload[1] : [];
          const latest = rows.find(
            (row) => row?.value !== null && row?.value !== undefined
          );

          return {
            ...indicator,
            year: latest?.date || "Not available",
            value:
              latest?.value !== null && latest?.value !== undefined
                ? Number(latest.value)
                : null,
            source: latest?.indicator?.sourceNote || indicator.note,
          };
        })
      );

      setItems(results);
      setFetchedAt(new Date());
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        "Live data could not be loaded right now. The curated tracker remains available."
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchWorldBankIndicators();
  }, []);

  const formatValue = (item) => {
    if (item.value === null) return "Not available";
    return `${item.value.toFixed(2)} ${item.unit}`;
  };

  return (
    <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <SectionTitle
          icon={Globe2}
          title="Live Data Preview"
          subtitle="Selected open data indicators for contextual awareness only. This does not automatically change the curated risk assessments."
        />

        <button
          onClick={fetchWorldBankIndicators}
          className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d8dee8] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#0a3d91] transition hover:border-[#0a3d91]"
        >
          Refresh live data
        </button>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
          Live/open data note
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          These values are fetched from the World Bank Indicators API and are
          provided as factual context only. They are not live intelligence
          judgements, do not replace the curated source layer, and should not be
          interpreted as automatic risk scores.
        </p>
      </div>

      {status === "loading" && (
        <div className="mt-4 rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4 text-sm text-slate-600">
          Loading World Bank open data indicators...
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {status === "success" && (
        <>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {item.id}
                </p>
                <h3 className="mt-2 font-semibold text-[#0a2f73]">
                  {item.title}
                </h3>
                <p className="mt-3 text-2xl font-bold text-[#0a2f73]">
                  {formatValue(item)}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Latest available year: {item.year}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Last fetched: {fetchedAt?.toLocaleString()}
          </p>
        </>
      )}
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
            <div className="print-meta-value">v1.5 Public Preview</div>
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
            <div className="print-meta-label">Review Priority</div>
            <div className="print-meta-value">
              {selectedItem.reviewPriority}
            </div>
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
          <h2>Curated Data Points</h2>
          <ul>
            {selectedItem.curatedDataPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="print-section">
          <h2>Monitoring Signals</h2>
          <ul>
            {selectedItem.monitoringSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <div className="print-section">
          <h2>Intelligence Gaps</h2>
          <ul>
            {selectedItem.intelligenceGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>

        <div className="print-section">
          <h2>Analyst Note</h2>
          <p>{selectedItem.analystNote}</p>
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
          Cygnus Global Strategic Risk Intelligence Tracker public preview.
          Current content uses source-backed sample risk indicators and should
          not be treated as live intelligence reporting. It is intended to
          support strategic awareness, scenario thinking, and decision support.
          It should not be treated as official intelligence, legal advice,
          financial advice, or a substitute for professional judgement.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(riskItems[0]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("dashboard");

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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
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
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('/branding/cygnus-hero-wide.png')",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.91)_100%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8dee8] bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <Shield className="h-4 w-4 text-[#0a3d91]" />
                  Tracker v1.5 · Data Status & Review Workflow
                </div>

                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#0a2f73] md:text-6xl">
                  Cygnus Global Strategic Risk Intelligence Tracker
                </h1>

                <p className="mt-4 text-xl italic text-[#b8862b] md:text-2xl">
                  Turning uncertainty into structured insight
                </p>

                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
                  A public preview of the Cygnus strategic risk intelligence
                  framework — now with enhanced curated data points, monitoring
                  signals, intelligence gaps, analyst notes, source quality
                  notes, a limited live/open data preview, and a clearer data status and review workflow.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#d8dee8] bg-white/95 p-4 shadow-sm">
                    <p className="font-semibold text-[#0a2f73]">
                      Curate source data
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Review selected source-backed observations and analyst
                      notes.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d8dee8] bg-white/95 p-4 shadow-sm">
                    <p className="font-semibold text-[#0a2f73]">
                      Monitor signals
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Identify developments that may trigger review or scenario
                      refresh.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d8dee8] bg-white/95 p-4 shadow-sm">
                    <p className="font-semibold text-[#0a2f73]">
                      Review status
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Separate curated assessments, live context and validation needs.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    onClick={() => setViewMode("dashboard")}
                    className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-full bg-[#0a3d91] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f70]"
                  >
                    <Layers className="h-4 w-4" />
                    Explore Dashboard
                  </button>

                  <button
                    onClick={() => setViewMode("executive")}
                    className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-full border border-[#d8dee8] bg-white px-5 py-3 text-sm font-semibold text-[#0a3d91] shadow-sm transition hover:border-[#0a3d91]"
                  >
                    <FileText className="h-4 w-4" />
                    View Executive Briefing
                  </button>

                  <button
                    onClick={() => setViewMode("help")}
                    className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-full border border-[#d8dee8] bg-white px-5 py-3 text-sm font-semibold text-[#0a3d91] shadow-sm transition hover:border-[#0a3d91]"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help & Methodology
                  </button>

                  <button
                    onClick={handlePrintBriefing}
                    className="mobile-full-button inline-flex items-center justify-center gap-2 rounded-full border border-[#d8dee8] bg-[#f8fafc] px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#0a3d91]"
                  >
                    <Printer className="h-4 w-4" />
                    Print / Save Briefing
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-[#d8dee8] bg-white/95 p-5 shadow-xl md:p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[#eef4ff] p-3 text-[#0a3d91]">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Public Preview Snapshot
                    </p>
                    <h2 className="text-2xl font-semibold text-[#0a2f73]">
                      Structured global risk insight
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-700">
                  v1.3 strengthens the source-backed sample layer by showing
                  what was curated, what should be monitored, and what still
                  needs validation before formal intelligence use.
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
                      Public preview
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#b8862b]">
                    v1.5 data status workflow
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    This release adds a clearer data status and review workflow so users can see what is curated, what is live/open data, and what requires validation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
                    v1.5 public preview
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    This tracker uses source-backed sample indicators and
                    enhanced curation fields to demonstrate the Cygnus risk
                    intelligence framework. It should not yet be treated as live
                    intelligence reporting, formal advisory output, legal
                    advice, or financial advice.
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm font-semibold text-[#0a2f73]">
                  Version 1.5
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#d8dee8] bg-white p-2 shadow-sm">
              <div className="mobile-scroll-row flex flex-wrap gap-2">
                <ViewModeButton
                  active={viewMode === "dashboard"}
                  onClick={() => setViewMode("dashboard")}
                >
                  Dashboard
                </ViewModeButton>

                <ViewModeButton
                  active={viewMode === "executive"}
                  onClick={() => setViewMode("executive")}
                >
                  Executive Briefing
                </ViewModeButton>

                <ViewModeButton
                  active={viewMode === "help"}
                  onClick={() => setViewMode("help")}
                >
                  Help & Methodology
                </ViewModeButton>
              </div>
            </div>
          </div>
        </section>

        {viewMode === "executive" ? (
          <ExecutiveBriefingMode
            riskItems={riskItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            onPrintBriefing={handlePrintBriefing}
          />
        ) : viewMode === "help" ? (
          <HelpMethodologyMode />
        ) : (
          <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 shadow-sm md:p-6">
                <SectionTitle
                  icon={Layers}
                  title="Global Risk Indicator Cards"
                  subtitle="Filter indicators by category or keyword."
                />

                <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search risks..."
                      className="w-full rounded-xl border border-[#d8dee8] bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#0a3d91] sm:w-56"
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#d8dee8] bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-[#0a3d91] sm:w-52"
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

                        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                          <span>{item.region}</span>
                          <span className="inline-flex items-center gap-1">
                            <TrendIcon trend={item.trend} /> {item.trend}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-xl border border-[#e3e8ef] bg-[#f8fafc] px-3 py-2 text-xs text-slate-600">
                            Source: {item.sourceReliability}
                          </span>
                          <span className="rounded-xl border border-[#e3e8ef] bg-[#f8fafc] px-3 py-2 text-xs text-slate-600">
                            Review: {item.reviewPriority}
                          </span>
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
                    <MetadataPill>
                      Review: {selectedItem.reviewPriority}
                    </MetadataPill>
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
                        Review priority
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0a2f73]">
                        {selectedItem.reviewPriority}
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
              <DataCurationPanel selectedItem={selectedItem} />
            </div>

            <div className="mt-6">
              <DataStatusReviewPanel selectedItem={selectedItem} />
            </div>

            <div className="mt-6">
              <LiveDataPreviewPanel />
            </div>

            <div className="mt-6">
              <SourceIntelligencePanel selectedItem={selectedItem} />
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
                  subtitle="v1.5 adds a data status and review workflow while keeping the curated source layer and live/open data preview separate."
                />

                <div className="space-y-3">
                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                    <p className="font-semibold text-[#0a2f73]">
                      Enhanced curation
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Each indicator includes curated data points, monitoring
                      signals, intelligence gaps, analyst notes and source
                      quality notes.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                    <p className="font-semibold text-[#0a2f73]">
                      Live data preview
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      The live data preview uses selected World Bank open data indicators for context without automatically changing risk assessments.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
                    <p className="font-semibold text-[#0a2f73]">
                      Review workflow
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      The data status workflow clarifies which parts are curated,
                      which are live/open data, and which items still need validation.
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
                  intelligence-led tools that combine structured methodology
                  with AI-enhanced insight to support stronger decisions, better
                  preparedness, and more resilient outcomes.
                </p>

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#b8862b]">
                    Sources & Disclaimer
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    This tracker currently uses source-backed sample indicators.
                    Source references and reliability fields demonstrate the
                    intended structure for future validated entries. The tracker
                    is intended to support strategic awareness, scenario
                    thinking, and decision support. It should not be treated as
                    official intelligence, legal advice, financial advice, or a
                    substitute for professional judgement.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#d8dee8] bg-white p-4 shadow-sm">
              <img
                src="/branding/cygnus-banner.png"
                alt="Cygnus Development - Risk Intelligence Technology"
                className="mx-auto max-h-[260px] w-full object-contain md:max-h-[300px]"
              />
            </div>
          </section>
        )}

        <footer className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
          <div className="rounded-3xl border border-[#d8dee8] bg-white p-5 text-sm text-slate-600 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-[#0a2f73]">
                  Cygnus Development
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#b8862b]">
                  Risk Intelligence Technology
                </p>
              </div>

              <div className="text-left md:text-right">
                <p>Cygnus Global Strategic Risk Intelligence Tracker</p>
                <p className="mt-1 text-xs">
                  v1.5 public preview · Data status and review workflow
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <PrintableBriefing
        selectedItem={selectedItem}
        lastUpdated={lastUpdated}
      />
    </main>
  );
}
