export type ProductSpec = {
  category: string;
  rows: { label: string; value: string }[];
};

export type Product = {
  id: string;
  category: "threading" | "grooving";
  badge: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  pipeRange: string;
  motorPower: string;
  speed: string;
  weight: string;
  price: string;
  warranty: string;
  features: string[];
  specs: ProductSpec[];
  relatedIds: string[];
  images?: string[];
};

export const products: Product[] = [
  // ── Threading Machines ────────────────────────────────────────────────────
  {
    id: "pro-300",
    category: "threading",
    badge: "Best Seller",
    name: "TT Pro 300",
    series: "Professional Series",
    tagline: "The contractor's choice",
    description:
      "The TT Pro 300 is the go-to threading machine for contractors and small workshops. Compact enough to move between job sites yet powerful enough to handle pipe from 1/8\" to 3\" with precision. The automatic die head and built-in oiler keep every thread clean and consistent.",
    pipeRange: "1/8\" – 3\"",
    motorPower: "1.5 kW",
    speed: "38 / 72 RPM",
    weight: "62 kg",
    price: "฿89,000",
    warranty: "2 years",
    images: [
      "/uploads/products/0fdcbad1-eb95-41a3-845c-4e6909a48df3.png",
      "/uploads/products/105a0654-1859-4d04-8119-5031f223dcce.jpg",
      "/uploads/products/12ad58f9-aa04-46f0-98b6-7caf7bd7225b.jpg",
    ],
    features: [
      "Automatic die head opens at thread completion",
      "Built-in oil pump for continuous lubrication",
      "Supports BSPT, NPT, and G (BSP) thread standards",
      "Safety overload clutch protects machine and operator",
      "Dual-speed gearbox for precision control",
      "Compact design fits on standard tri-stand",
    ],
    specs: [
      {
        category: "Threading Capacity",
        rows: [
          { label: "Pipe Size Range", value: "1/8\" – 3\" (DN6 – DN80)" },
          { label: "Thread Standards", value: "BSPT, NPT, G (BSP)" },
          { label: "Die Head Type", value: "Auto-open, 4-die set" },
          { label: "Thread Length", value: "Up to 75 mm" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "1.5 kW (2 HP)" },
          { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
          { label: "Spindle Speed", value: "38 / 72 RPM (2-speed)" },
          { label: "Chuck Capacity", value: "1/8\" – 3\" pipe" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "820 × 480 × 520 mm" },
          { label: "Net Weight", value: "62 kg" },
          { label: "Carriage", value: "Heavy-duty with tri-stand" },
          { label: "Coolant Tank", value: "4.5 L integrated" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015" },
          { label: "Safety Standard", value: "EN 60745, IEC 62841" },
          { label: "IP Rating", value: "IP44" },
          { label: "Warranty", value: "2 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["industrial-500", "heavy-800", "gv-pro-100"],
  },
  {
    id: "industrial-500",
    category: "threading",
    badge: "Most Popular",
    name: "TT Industrial 500",
    series: "Industrial Series",
    tagline: "Power meets precision",
    description:
      "Engineered for heavy-duty industrial applications, the TT Industrial 500 tackles large-diameter pipe threading with unmatched torque and reliability. The digital display, quick-change die head, and integrated coolant pump system make it the preferred choice for industrial maintenance teams and fabrication shops.",
    pipeRange: "1/8\" – 4\"",
    motorPower: "2.2 kW",
    speed: "28 / 56 RPM",
    weight: "98 kg",
    price: "฿145,000",
    warranty: "3 years",
    features: [
      "Digital speed and status display panel",
      "Quick-change auto-release die head",
      "Supports BSPT, NPT, G (BSP), and Metric threads",
      "Integrated 8 L coolant pump system",
      "Heavy-duty tri-stand included",
      "CE certified to EN 60745 and IEC 62841",
    ],
    specs: [
      {
        category: "Threading Capacity",
        rows: [
          { label: "Pipe Size Range", value: "1/8\" – 4\" (DN6 – DN100)" },
          { label: "Thread Standards", value: "BSPT, NPT, G (BSP), Metric" },
          { label: "Die Head Type", value: "Auto-open quick-change" },
          { label: "Thread Length", value: "Up to 100 mm" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "2.2 kW (3 HP)" },
          { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
          { label: "Spindle Speed", value: "28 / 56 RPM (2-speed)" },
          { label: "Chuck Capacity", value: "1/8\" – 4\" pipe" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "960 × 560 × 620 mm" },
          { label: "Net Weight", value: "98 kg" },
          { label: "Carriage", value: "Heavy-duty steel with tri-stand" },
          { label: "Coolant Tank", value: "8 L integrated pump" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015" },
          { label: "Safety Standard", value: "EN 60745, IEC 62841" },
          { label: "IP Rating", value: "IP55" },
          { label: "Warranty", value: "3 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["pro-300", "heavy-800", "gv-industrial-200"],
  },
  {
    id: "heavy-800",
    category: "threading",
    badge: "Premium",
    name: "TT Heavy 800",
    series: "Heavy-Duty Series",
    tagline: "Built for infrastructure",
    description:
      "The TT Heavy 800 is the ultimate threading solution for large-scale industrial and infrastructure projects. PLC-controlled operation, auto-centering chuck, stainless steel housing, and IP65 rating make this machine equally at home in refineries, shipyards, and water treatment plants.",
    pipeRange: "1/8\" – 6\"",
    motorPower: "3.0 kW",
    speed: "16 / 32 RPM",
    weight: "185 kg",
    price: "฿238,000",
    warranty: "5 years",
    features: [
      "PLC touchscreen control panel",
      "Auto-centering CNC die head for zero setup time",
      "304 stainless steel housing for harsh environments",
      "IP65 rated — fully protected against dust and water jets",
      "Remote stop/start pendant included",
      "ATEX Zone 2 certified for hazardous areas",
    ],
    specs: [
      {
        category: "Threading Capacity",
        rows: [
          { label: "Pipe Size Range", value: "1/8\" – 6\" (DN6 – DN150)" },
          { label: "Thread Standards", value: "BSPT, NPT, G (BSP), Metric, DIN" },
          { label: "Die Head Type", value: "Auto-centering CNC die head" },
          { label: "Thread Length", value: "Up to 150 mm" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "3.0 kW (4 HP)" },
          { label: "Voltage", value: "380V / 415V, 50/60 Hz" },
          { label: "Spindle Speed", value: "16 / 32 RPM (PLC-controlled)" },
          { label: "Chuck Capacity", value: "1/8\" – 6\" pipe" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "1,280 × 680 × 800 mm" },
          { label: "Net Weight", value: "185 kg" },
          { label: "Frame Material", value: "304 Stainless steel housing" },
          { label: "Coolant Tank", value: "15 L with filtration" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015, ATEX Zone 2" },
          { label: "Safety Standard", value: "EN 60745, EN ISO 12100" },
          { label: "IP Rating", value: "IP65" },
          { label: "Warranty", value: "5 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["industrial-500", "pro-300", "gv-heavy-400"],
  },

  // ── Grooving Machines ─────────────────────────────────────────────────────
  {
    id: "gv-pro-100",
    category: "grooving",
    badge: "Best Seller",
    name: "GV Pro 100",
    series: "Professional Series",
    tagline: "Fast grooves, every time",
    description:
      "The GV Pro 100 electric pipe groover creates precise roll grooves on steel, stainless, and copper pipe from 1\" to 6\" in seconds. Ideal for fire protection, HVAC, and plumbing contractors who need a portable, reliable groover for everyday jobsite use.",
    pipeRange: "1\" – 6\"",
    motorPower: "0.75 kW",
    speed: "12 RPM",
    weight: "45 kg",
    price: "฿65,000",
    warranty: "2 years",
    features: [
      "Electric roll grooving — no hydraulic pump required",
      "Compatible with ANSI/AWWA C606 and ISO 6182 groove standards",
      "Works on steel, stainless, copper, and aluminium pipe",
      "Auto-advance upper roll for consistent groove depth",
      "Folding handle for compact transport",
      "One-man operation on or off the tri-stand",
    ],
    specs: [
      {
        category: "Grooving Capacity",
        rows: [
          { label: "Pipe Size Range", value: "1\" – 6\" (DN25 – DN150)" },
          { label: "Groove Standards", value: "ANSI/AWWA C606, ISO 6182, Victaulic® compatible" },
          { label: "Groove Type", value: "Roll groove (cut groove adapter optional)" },
          { label: "Groove Depth Accuracy", value: "±0.05 mm" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "0.75 kW (1 HP)" },
          { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
          { label: "Drive Speed", value: "12 RPM" },
          { label: "Grooving Time (6\" pipe)", value: "~15 seconds" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "680 × 360 × 480 mm" },
          { label: "Net Weight", value: "45 kg" },
          { label: "Stand", value: "Folding tri-stand included" },
          { label: "Roll Material", value: "Alloy steel, heat-treated" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015" },
          { label: "Pipe Material", value: "Carbon steel, SS, copper, aluminium" },
          { label: "IP Rating", value: "IP44" },
          { label: "Warranty", value: "2 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["gv-industrial-200", "gv-heavy-400", "pro-300"],
  },
  {
    id: "gv-industrial-200",
    category: "grooving",
    badge: "Most Popular",
    name: "GV Industrial 200",
    series: "Industrial Series",
    tagline: "Mid-range power, maximum versatility",
    description:
      "The GV Industrial 200 handles pipe from 1\" to 12\", covering the widest range of industrial piping applications. Dual-speed drive, digital groove counter, and heavy-duty alloy rolls make it the preferred groover for mechanical contractors, fabrication shops, and plant maintenance crews.",
    pipeRange: "1\" – 12\"",
    motorPower: "1.5 kW",
    speed: "8 / 16 RPM",
    weight: "92 kg",
    price: "฿125,000",
    warranty: "3 years",
    features: [
      "Dual-speed drive for thin-wall and heavy-wall pipe",
      "Digital groove counter with preset stop",
      "Supports standard and flush-face groove profiles",
      "Extended upper roll travel for large-diameter pipe",
      "Stainless steel drive housing resists corrosion",
      "Compatible with all major coupling brands",
    ],
    specs: [
      {
        category: "Grooving Capacity",
        rows: [
          { label: "Pipe Size Range", value: "1\" – 12\" (DN25 – DN300)" },
          { label: "Groove Standards", value: "ANSI/AWWA C606, ISO 6182, Victaulic® / Grinnell® / Tyco® compatible" },
          { label: "Groove Types", value: "Roll groove, flush-face groove" },
          { label: "Groove Depth Accuracy", value: "±0.03 mm" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "1.5 kW (2 HP)" },
          { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
          { label: "Drive Speed", value: "8 / 16 RPM (2-speed)" },
          { label: "Grooving Time (12\" pipe)", value: "~30 seconds" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "920 × 520 × 600 mm" },
          { label: "Net Weight", value: "92 kg" },
          { label: "Stand", value: "Heavy-duty adjustable stand included" },
          { label: "Roll Material", value: "Alloy steel, TiN-coated" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015" },
          { label: "Pipe Material", value: "Carbon steel, SS, ductile iron" },
          { label: "IP Rating", value: "IP55" },
          { label: "Warranty", value: "3 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["gv-pro-100", "gv-heavy-400", "industrial-500"],
  },
  {
    id: "gv-heavy-400",
    category: "grooving",
    badge: "Heavy Duty",
    name: "GV Heavy 400",
    series: "Heavy-Duty Series",
    tagline: "Built for large-diameter pipe",
    description:
      "The GV Heavy 400 is engineered for large-diameter pipe grooming on water mains, oil & gas lines, and industrial plants. Handles pipe from 2\" to 24\" with hydraulic-assisted roll advancement, PLC control, and remote pendant — delivering consistent groove geometry even on thick-wall pipe.",
    pipeRange: "2\" – 24\"",
    motorPower: "2.2 kW",
    speed: "6 / 12 RPM",
    weight: "165 kg",
    price: "฿198,000",
    warranty: "5 years",
    features: [
      "Hydraulic-assisted upper roll advancement",
      "PLC control with digital depth indicator",
      "Handles standard, heavy-wall, and XH pipe",
      "Remote stop/start pendant for safe operation",
      "Auto-depth stop prevents over-grooving",
      "Certified for use with fire suppression system couplings",
    ],
    specs: [
      {
        category: "Grooving Capacity",
        rows: [
          { label: "Pipe Size Range", value: "2\" – 24\" (DN50 – DN600)" },
          { label: "Groove Standards", value: "ANSI/AWWA C606, ISO 6182, FM/UL listed compatible" },
          { label: "Groove Types", value: "Roll groove, cut groove, IPS groove" },
          { label: "Wall Thickness", value: "Up to Schedule 80" },
        ],
      },
      {
        category: "Power & Performance",
        rows: [
          { label: "Motor Power", value: "2.2 kW (3 HP)" },
          { label: "Voltage", value: "380V / 415V, 50/60 Hz" },
          { label: "Drive Speed", value: "6 / 12 RPM (PLC-controlled)" },
          { label: "Hydraulic System", value: "2,000 psi max, integrated pump" },
        ],
      },
      {
        category: "Physical",
        rows: [
          { label: "Dimensions (L×W×H)", value: "1,180 × 640 × 760 mm" },
          { label: "Net Weight", value: "165 kg" },
          { label: "Frame", value: "Welded steel, epoxy-coated" },
          { label: "Roll Material", value: "H13 tool steel, heat-treated" },
        ],
      },
      {
        category: "Compliance",
        rows: [
          { label: "Certification", value: "CE, ISO 9001:2015, FM Global" },
          { label: "Pipe Material", value: "Carbon steel, SS, ductile iron, HDPE adapter" },
          { label: "IP Rating", value: "IP55" },
          { label: "Warranty", value: "5 years parts & labor" },
        ],
      },
    ],
    relatedIds: ["gv-industrial-200", "gv-pro-100", "heavy-800"],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelated(product: Product): Product[] {
  return product.relatedIds
    .map((id) => getProduct(id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 3);
}

export const threadingProducts = products.filter((p) => p.category === "threading");
export const groovingProducts = products.filter((p) => p.category === "grooving");
