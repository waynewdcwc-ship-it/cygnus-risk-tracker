import {
  AlertTriangle,
  Activity,
  Globe2,
  ShieldAlert,
  Zap,
  Truck,
  Landmark,
  Server,
} from "lucide-react";

export const lastUpdated = "May 2026";

const prototypeMetadata = {
  lastUpdated: "May 2026",
  sourceType: "Illustrative / sample data",
  assessmentStatus: "Prototype assessment",
  confidenceNote:
    "Confidence reflects the illustrative quality of the sample indicator and is not based on live-source validation.",
  sourceReliability: "Not yet validated",
  informationConfidence: "Illustrative only",
  sourceSummary:
    "This entry is currently based on prototype sample content. Future versions may include curated OSINT sources, analyst notes, official releases, media monitoring, data feeds, and AI-assisted source synthesis.",
  sourceReferences: [
    {
      label: "Prototype reference placeholder",
      type: "Internal sample data",
      url: "",
      note: "No external source has been attached to this prototype indicator yet.",
    },
  ],
};

export const riskItems = [
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
    coordinates: [34.0479, 100.6197],
    sourceNote: "Illustrative global strategic risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [51.5072, -0.1276],
    sourceNote: "Illustrative macroeconomic risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [15.5007, 32.5599],
    sourceNote: "Illustrative maritime and logistics risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [37.7749, -122.4194],
    sourceNote: "Illustrative cyber and digital infrastructure risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [25.2048, 55.2708],
    sourceNote: "Illustrative energy security risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [50.8503, 4.3517],
    sourceNote: "Illustrative regulatory fragmentation risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [-15.7835, -47.8668],
    sourceNote: "Illustrative climate and resilience risk indicator.",
    ...prototypeMetadata,
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
    coordinates: [30.0444, 31.2357],
    sourceNote: "Illustrative social stability risk indicator.",
    ...prototypeMetadata,
  },
];

export const watchpoints = [
  "Escalation around major geopolitical fault lines affecting trade, sanctions, or security posture",
  "Disruption to a major maritime chokepoint or global logistics corridor",
  "Systemic cyber incident affecting cloud platforms, critical infrastructure, or third-party providers",
  "Energy price volatility triggered by conflict, policy decisions, or supply constraints",
  "Climate-linked disruption to infrastructure, agriculture, ports, or transport networks",
  "Regulatory fragmentation affecting data, AI, trade, sanctions, climate, or supply chains",
  "Public unrest or political instability caused by economic pressure, mistrust, or polarisation",
];

export const methodology = {
  riskLevels: [
    {
      level: "High",
      meaning:
        "A high-risk indicator suggests a material strategic issue that may require active monitoring, contingency planning, or leadership attention.",
    },
    {
      level: "Medium",
      meaning:
        "A medium-risk indicator suggests a developing or persistent issue that should be monitored and included in planning assumptions.",
    },
    {
      level: "Low",
      meaning:
        "A low-risk indicator suggests limited immediate strategic pressure, but may still require periodic review.",
    },
  ],
  trends: [
    {
      trend: "Increasing",
      meaning:
        "The indicator is assessed as becoming more significant, more complex, or more likely to affect strategic planning.",
    },
    {
      trend: "Stable",
      meaning:
        "The indicator remains relevant but is not currently assessed as significantly worsening or improving.",
    },
    {
      trend: "Decreasing",
      meaning:
        "The indicator is assessed as easing or becoming less strategically significant.",
    },
  ],
  confidence:
    "Confidence reflects how strongly the available information supports the indicator assessment. In this prototype, confidence levels are illustrative and should not be treated as validated intelligence judgements.",
};

export const sourceMethodology = {
  sourceReliability: [
    {
      rating: "High",
      meaning:
        "Information is drawn from authoritative, primary, or consistently reliable sources.",
    },
    {
      rating: "Medium",
      meaning:
        "Information is drawn from credible but potentially incomplete sources, or from multiple sources with some uncertainty.",
    },
    {
      rating: "Low",
      meaning:
        "Information is limited, uncorroborated, preliminary, or from sources requiring caution.",
    },
    {
      rating: "Not yet validated",
      meaning:
        "The entry has not yet been linked to validated external sources and should be treated as prototype content.",
    },
  ],
  informationConfidence: [
    {
      rating: "High",
      meaning:
        "The available information strongly supports the assessment and is unlikely to materially change without significant new developments.",
    },
    {
      rating: "Medium",
      meaning:
        "The available information supports the assessment, but important uncertainties remain.",
    },
    {
      rating: "Low",
      meaning:
        "The assessment is plausible but rests on limited, early, ambiguous, or incomplete information.",
    },
    {
      rating: "Illustrative only",
      meaning:
        "This assessment is included to demonstrate structure and workflow only. It is not a validated intelligence judgement.",
    },
  ],
};