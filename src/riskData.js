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

const sourceBackedMetadata = {
  lastUpdated: "May 2026",
  sourceType: "Curated open-source reporting",
  assessmentStatus: "Source-backed sample assessment",
  confidenceNote:
    "Confidence reflects whether the cited public sources support the indicator theme. This remains a prototype assessment and should not be treated as validated intelligence reporting.",
};

export const riskItems = [
  {
    id: 1,
    category: "Geopolitical",
    title: "Strategic fragmentation and geopolitical shock risk",
    region: "Global / major geopolitical fault lines",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Global risk conditions remain shaped by geopolitical shocks, strategic competition, rapid technological change, climate instability, and social strain.",
    implications: [
      "Higher exposure to sanctions, policy shocks, and escalation risk",
      "Greater need for regional contingency planning",
      "Increased pressure on leadership monitoring and scenario assumptions",
    ],
    assumption:
      "Global planning should assume persistent strategic fragmentation and periodic geopolitical shocks across major fault lines.",
    icon: Globe2,
    coordinates: [34.0479, 100.6197],
    sourceNote: "Source-backed sample indicator using WEF global risk reporting.",
    sourceReliability: "Medium",
    informationConfidence: "Medium",
    sourceSummary:
      "The World Economic Forum's Global Risks Report 2026 frames global risk across near-, medium-, and longer-term timeframes and highlights turbulence spanning geopolitical shocks, technology change, climate instability, and societal stress.",
    sourceReferences: [
      {
        label: "World Economic Forum - Global Risks Report 2026",
        type: "Global risk report",
        url: "https://www.weforum.org/publications/global-risks-report-2026/",
        note: "Used to support the broad global risk framing and multi-domain risk context.",
      },
      {
        label: "WEF Global Risks Report 2026 PDF",
        type: "Report PDF",
        url: "https://reports.weforum.org/docs/WEF_Global_Risks_Report_2026.pdf",
        note: "Provides the report source for deeper review.",
      },
    ],
    ...sourceBackedMetadata,
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
      "The global economy remains exposed to slower growth, inflation uncertainty, commodity-price shocks, and second-order effects from geopolitical disruption.",
    implications: [
      "More cautious capital allocation",
      "Pressure on margins, procurement costs, and demand forecasting",
      "Need for downside, base-case, and recovery financial scenarios",
    ],
    assumption:
      "Strategic plans should include downside, base-case, and recovery scenarios for global economic conditions and inflation sensitivity.",
    icon: Landmark,
    coordinates: [51.5072, -0.1276],
    sourceNote: "Source-backed sample indicator using IMF World Economic Outlook reporting.",
    sourceReliability: "High",
    informationConfidence: "Medium",
    sourceSummary:
      "The IMF April 2026 World Economic Outlook projects slower global growth and notes that global headline inflation is expected to rise modestly in 2026 before declining in 2027, with risk linked to geopolitical conflict and commodity-price channels.",
    sourceReferences: [
      {
        label: "IMF World Economic Outlook - April 2026",
        type: "Macroeconomic outlook",
        url: "https://www.imf.org/en/publications/weo/issues/2026/04/14/world-economic-outlook-april-2026",
        note: "Used to support the growth and inflation uncertainty indicator.",
      },
      {
        label: "IMF WEO April 2026 Executive Summary PDF",
        type: "Executive summary PDF",
        url: "https://www.imf.org/-/media/files/publications/weo/2026/april/english/execsum.pdf",
        note: "Used for summary figures and macroeconomic outlook context.",
      },
    ],
    ...sourceBackedMetadata,
  },
  {
    id: 3,
    category: "Supply Chain",
    title: "Maritime chokepoint and route disruption risk",
    region: "Red Sea / Suez / Strait of Hormuz / global corridors",
    level: "High",
    trend: "Increasing",
    confidence: "High",
    summary:
      "Maritime disruption remains a strategic risk as route diversions, chokepoint concerns, and port/logistics pressures affect global trade flows and cost assumptions.",
    implications: [
      "Longer lead times and route uncertainty",
      "Higher freight, insurance, and inventory-buffer costs",
      "Increased need for supplier and corridor diversification",
    ],
    assumption:
      "Scenario models should include disruption to at least one major global trade corridor during the planning period.",
    icon: Truck,
    coordinates: [15.5007, 32.5599],
    sourceNote: "Source-backed sample indicator using UNCTAD maritime transport reporting.",
    sourceReliability: "High",
    informationConfidence: "High",
    sourceSummary:
      "UNCTAD's 2025 maritime transport overview reports continuing Red Sea disruption, reduced Suez Canal transit levels, and heightened concern around strategic chokepoints including the Strait of Hormuz.",
    sourceReferences: [
      {
        label: "UNCTAD Review of Maritime Transport 2025",
        type: "Maritime transport report",
        url: "https://unctad.org/publication/review-maritime-transport-2025",
        note: "Used to support maritime disruption and global logistics pressure.",
      },
      {
        label: "UNCTAD Review of Maritime Transport 2025 Overview PDF",
        type: "Overview PDF",
        url: "https://unctad.org/system/files/official-document/rmt2025overview_en.pdf",
        note: "Used for specific chokepoint and Red Sea disruption context.",
      },
    ],
    ...sourceBackedMetadata,
  },
  {
    id: 4,
    category: "Cyber",
    title: "AI-accelerated cyber and systemic disruption exposure",
    region: "Global digital infrastructure",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Cyber risk is being reshaped by AI adoption, geopolitical fragmentation, cyber inequity, ransomware, supply-chain exposure, and exploitation of vulnerable digital infrastructure.",
    implications: [
      "Greater operational continuity risk",
      "Higher third-party technology and cloud dependency exposure",
      "Need to validate recovery, backup, and incident response plans",
    ],
    assumption:
      "Cyber disruption should be treated as a credible cross-border business continuity and strategic risk scenario.",
    icon: Server,
    coordinates: [37.7749, -122.4194],
    sourceNote: "Source-backed sample indicator using WEF, Microsoft, and ENISA cyber reporting.",
    sourceReliability: "Medium",
    informationConfidence: "Medium",
    sourceSummary:
      "WEF's Global Cybersecurity Outlook 2026 highlights AI adoption, geopolitical fragmentation and cyber inequity as reshaping risk. Microsoft and ENISA reporting also point to ransomware, financially motivated threat activity, phishing, vulnerabilities, and exposed services as continuing issues.",
    sourceReferences: [
      {
        label: "WEF Global Cybersecurity Outlook 2026",
        type: "Cybersecurity outlook",
        url: "https://www.weforum.org/publications/global-cybersecurity-outlook-2026/",
        note: "Used to support AI, fragmentation, and cyber inequity risk framing.",
      },
      {
        label: "Microsoft Digital Defense Report 2025",
        type: "Threat landscape report",
        url: "https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2025",
        note: "Used to support cyber threat and attacker behaviour context.",
      },
      {
        label: "ENISA Threat Landscape 2025",
        type: "Cybersecurity threat landscape",
        url: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
        note: "Used to support vulnerability, phishing, and intrusion-risk context.",
      },
    ],
    ...sourceBackedMetadata,
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
      "Energy security remains central to economic and national security as markets balance geopolitical fragility, affordability, sustainability, critical minerals, and electricity-system resilience.",
    implications: [
      "Potential input-cost and fuel-price volatility",
      "Exposure to electricity, logistics, and critical-minerals constraints",
      "Need to assess energy resilience and transition assumptions",
    ],
    assumption:
      "Planning should include energy price volatility, regional supply disruption, and critical-mineral constraints as recurring strategic variables.",
    icon: Zap,
    coordinates: [25.2048, 55.2708],
    sourceNote: "Source-backed sample indicator using IEA World Energy Outlook reporting.",
    sourceReliability: "High",
    informationConfidence: "Medium",
    sourceSummary:
      "The IEA World Energy Outlook 2025 states that energy security is taking centre stage amid geopolitical strains, energy affordability and sustainability pressures, supply concerns, critical-minerals issues, and vulnerabilities in electricity systems.",
    sourceReferences: [
      {
        label: "IEA World Energy Outlook 2025",
        type: "Energy outlook",
        url: "https://www.iea.org/reports/world-energy-outlook-2025",
        note: "Used to support energy security and energy-transition volatility framing.",
      },
      {
        label: "IEA WEO 2025 Executive Summary",
        type: "Executive summary",
        url: "https://www.iea.org/reports/world-energy-outlook-2025/executive-summary",
        note: "Used for summary statements on energy security, supply, and critical minerals.",
      },
    ],
    ...sourceBackedMetadata,
  },
  {
    id: 6,
    category: "Regulatory",
    title: "Regulatory fragmentation and governance pressure",
    region: "Global / cross-border operations",
    level: "Medium",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Diverging regulatory approaches across trade, sanctions, AI, cybersecurity, climate, energy, and supply chains may increase compliance complexity for global organisations.",
    implications: [
      "Higher compliance and reporting burden",
      "Potential restrictions on data, suppliers, or market access",
      "Need for early legal, policy, and governance review",
    ],
    assumption:
      "Strategic plans should assume regulatory fragmentation rather than global policy alignment.",
    icon: ShieldAlert,
    coordinates: [50.8503, 4.3517],
    sourceNote: "Source-backed sample indicator using WEF cyber/governance risk framing and IEA policy divergence context.",
    sourceReliability: "Medium",
    informationConfidence: "Medium",
    sourceSummary:
      "WEF's cybersecurity outlook highlights geopolitical fragmentation and sovereignty challenges, while the IEA World Energy Outlook notes that governments are reaching different conclusions on energy security, affordability and sustainability. Together, these support a broader regulatory-fragmentation risk theme.",
    sourceReferences: [
      {
        label: "WEF Global Cybersecurity Outlook 2026",
        type: "Cybersecurity and governance outlook",
        url: "https://www.weforum.org/publications/global-cybersecurity-outlook-2026/",
        note: "Used to support fragmentation, sovereignty and cyber governance context.",
      },
      {
        label: "IEA World Energy Outlook 2025",
        type: "Energy policy outlook",
        url: "https://www.iea.org/reports/world-energy-outlook-2025",
        note: "Used to support divergence in energy policy and security priorities.",
      },
    ],
    ...sourceBackedMetadata,
  },
  {
    id: 7,
    category: "Climate",
    title: "Climate overshoot and resilience pressure",
    region: "Global climate-exposed regions",
    level: "High",
    trend: "Increasing",
    confidence: "Medium",
    summary:
      "Climate-linked disruption remains a strategic risk as emissions trajectories, overshoot risk, extreme weather, water stress, and resilience costs affect infrastructure, agriculture, logistics, insurance, and continuity planning.",
    implications: [
      "Higher disruption risk to facilities and transport networks",
      "Increased insurance, resilience, and adaptation costs",
      "Need to test location-specific continuity assumptions",
    ],
    assumption:
      "Global planning should include climate-linked disruption as a recurring operational and strategic risk factor.",
    icon: AlertTriangle,
    coordinates: [-15.7835, -47.8668],
    sourceNote: "Source-backed sample indicator using UNEP climate-risk reporting.",
    sourceReliability: "High",
    informationConfidence: "Medium",
    sourceSummary:
      "UNEP's Emissions Gap Report 2025 states that limiting overshoot requires faster and larger emissions reductions to minimize climate risks and damages, and that every fraction of a degree avoided reduces losses, costs and reliance on uncertain removal options.",
    sourceReferences: [
      {
        label: "UNEP Emissions Gap Report 2025",
        type: "Climate risk report",
        url: "https://www.unep.org/resources/emissions-gap-report-2025",
        note: "Used to support climate overshoot, damages, and resilience pressure.",
      },
      {
        label: "UNEP Emissions Gap Report series",
        type: "Climate reporting series",
        url: "https://www.unep.org/resources/emissions-gap-report",
        note: "Provides background on the annual emissions-gap assessment framework.",
      },
    ],
    ...sourceBackedMetadata,
  },
  {
    id: 8,
    category: "Social Stability",
    title: "Social cohesion and trust erosion risk",
    region: "Multiple regions",
    level: "Medium",
    trend: "Increasing",
    confidence: "Low",
    summary:
      "Cost-of-living pressure, political polarization, misinformation, migration strain, cyber-enabled fraud, and declining institutional trust may increase protest, instability, and reputational risk.",
    implications: [
      "Possible disruption to operations and public services",
      "Increased reputational and stakeholder-management risk",
      "Need for localized monitoring and crisis communication planning",
    ],
    assumption:
      "Scenario planning should include sudden localized unrest even where national-level risk appears manageable.",
    icon: Activity,
    coordinates: [30.0444, 31.2357],
    sourceNote: "Source-backed sample indicator using WEF global risk and cybersecurity reporting.",
    sourceReliability: "Medium",
    informationConfidence: "Low",
    sourceSummary:
      "WEF global risk and cybersecurity reporting highlights societal strain, cyber-enabled fraud, AI-related vulnerabilities, and wider risk turbulence. This indicator remains lower confidence because social stability risk is highly context-specific and requires localized validation.",
    sourceReferences: [
      {
        label: "WEF Global Risks Report 2026",
        type: "Global risk report",
        url: "https://www.weforum.org/publications/global-risks-report-2026/",
        note: "Used to support societal-strain and multi-domain risk context.",
      },
      {
        label: "WEF Global Cybersecurity Outlook 2026",
        type: "Cybersecurity outlook",
        url: "https://www.weforum.org/publications/global-cybersecurity-outlook-2026/",
        note: "Used to support cyber-enabled fraud, AI vulnerability, and trust-related risk context.",
      },
    ],
    ...sourceBackedMetadata,
  },
];

export const watchpoints = [
  "Escalation around major geopolitical fault lines affecting trade, sanctions, or security posture",
  "Global growth or inflation shock affecting capital allocation, procurement, or demand assumptions",
  "Disruption to a major maritime chokepoint or global logistics corridor",
  "Systemic cyber incident affecting cloud platforms, critical infrastructure, or third-party providers",
  "Energy price volatility triggered by conflict, policy decisions, supply constraints, or critical-mineral pressure",
  "Climate-linked disruption to infrastructure, agriculture, ports, or transport networks",
  "Regulatory fragmentation affecting data, AI, trade, sanctions, climate, energy, or supply chains",
  "Public unrest or political instability caused by economic pressure, mistrust, misinformation, or polarization",
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
    "Confidence reflects how strongly the cited public information supports the indicator assessment. In this prototype, confidence levels remain indicative and should not be treated as formal intelligence judgements.",
};

export const sourceMethodology = {
  sourceReliability: [
    {
      rating: "High",
      meaning:
        "Information is drawn from authoritative, primary, or consistently reliable sources such as official international organizations, public agencies, or major institutional reports.",
    },
    {
      rating: "Medium",
      meaning:
        "Information is drawn from credible sources but may require further corroboration, regional validation, or sector-specific interpretation.",
    },
    {
      rating: "Low",
      meaning:
        "Information is limited, highly context-specific, preliminary, ambiguous, or from sources requiring caution.",
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
        "The available public information strongly supports the assessment and is unlikely to materially change without significant new developments.",
    },
    {
      rating: "Medium",
      meaning:
        "The available public information supports the assessment, but important uncertainties or regional variations remain.",
    },
    {
      rating: "Low",
      meaning:
        "The assessment is plausible but rests on limited, early, ambiguous, localized, or incomplete information.",
    },
    {
      rating: "Illustrative only",
      meaning:
        "This assessment is included to demonstrate structure and workflow only. It is not a validated intelligence judgement.",
    },
  ],
};