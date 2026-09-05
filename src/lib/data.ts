export type ShowcaseItem = {
  slug: string;
  kind: "experience" | "project";
  title: string;
  org: string;
  period: string;
  metric: string;
  metricLabel: string;
  summary: string;
  tools: string[];
  link?: string;
  linkLabel?: string;
  featured?: boolean;
  bgImage?: string;
  bgImageOpacity?: number;
  bgImageHoverOpacity?: number;
  drawer: {
    heading: string;
    body: DrawerSection[];
  };
};

export type DrawerSection = {
  label: string;
  bullets: string[];
};

export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "ineos-hotbox-bearing",
    kind: "experience",
    featured: true,
    bgImage: "/diagrams/thrust-needle-bearing.svg",
    title: "Hotbox Bearing Redesign",
    org: "INEOS — Engineering Intern",
    period: "May 2025 – August 2025",
    metric: "Adopted Plant-Wide",
    metricLabel: "New standard for every hotbox",
    summary:
      "Root-caused a recurring seizure failure on hotbox vent joints and redesigned the bearing interface — approved by plant management as the standard build for every new hotbox on site.",
    tools: ["Root Cause Analysis", "Bearing Design", "Preventive Maintenance", "Plant Operations"],
    drawer: {
      heading: "Hotbox Bearing Redesign",
      body: [
        {
          label: "Problem",
          bullets: [
            "Ball-and-socket joints on hotbox vents were seizing in the field, driving repeat maintenance calls and downtime risk.",
          ],
        },
        {
          label: "Root Cause",
          bullets: [
            "Extreme heat cycling combined with corrosion was degrading the ball-and-socket interface, increasing friction until the joint seized.",
          ],
        },
        {
          label: "Solution",
          bullets: [
            "Replaced the high-friction ball-and-socket setup with a thrust needle bearing sandwiched between two thrust washers.",
            "The new interface cut both friction and corrosion exposure at the joint, directly addressing the root cause rather than just the symptom.",
          ],
        },
        {
          label: "Plant-Wide Adoption",
          bullets: [
            "Presented the redesign to plant management.",
            "Approved and adopted as the standard build for all new hotboxes plant-wide.",
          ],
        },
        {
          label: "Broader Internship Scope",
          bullets: [
            "Shadowed the maintenance team on preventive maintenance across plant equipment, including winch PM and cable replacement, bucket lift operations, and compressor motor belt changeout.",
            "Toured and observed facility operations — PP3, PP4, rail car loading, and the cogeneration unit — for broader plant and process exposure.",
          ],
        },
      ],
    },
  },
  {
    slug: "outpost-fps",
    kind: "project",
    featured: true,
    title: "Outpost — Tactical Arena FPS",
    org: "Personal Project — Solo Developer",
    period: "Self-directed, ongoing",
    metric: "~9K",
    metricLabel: "Lines of custom JS",
    summary:
      "A browser-native tactical shooter built from scratch with Three.js and Rapier — no game engine, no backend. Custom physics-based movement, hitscan combat, and team-based AI opponents across 1v1 to 5v5 matches, shipped as a static site.",
    tools: [
      "Three.js",
      "Rapier Physics",
      "Custom Character Controller",
      "Combat AI",
      "Procedural Textures",
      "Web Audio API",
    ],
    link: "https://outpostfps.vercel.app",
    linkLabel: "Play it here",
    drawer: {
      heading: "Outpost — Tactical Arena FPS",
      body: [
        {
          label: "Architecture",
          bullets: [
            "Fully client-side: Vite, Three.js, and Rapier physics — no server or database, ships as a static site.",
            "~9,000 lines of custom JavaScript across gameplay, environment, animation, and AI systems.",
            "Async asset pipeline loads and caches character and weapon models, with automatic fallback to procedural geometry if a load ever fails.",
          ],
        },
        {
          label: "Combat & AI",
          bullets: [
            "Built a physics-based character controller with sprint, crouch, and a momentum-preserving slide.",
            "Designed a single shared bot AI — difficulty scales by reaction time, aim, and movement — that takes cover, tracks line of sight, and fights on teams across 1v1 to 5v5 matches.",
            "Hitscan weapon system with dedicated headshot detection and separate hip-fire / aim-down-sights accuracy.",
          ],
        },
        {
          label: "Rendering & Audio",
          bullets: [
            "Every environment texture and normal map is generated procedurally at runtime — zero image assets.",
            "All sound effects (gunfire, footsteps, hits) are synthesized live with the Web Audio API, including spatial audio for bot positioning.",
            "Custom first-person viewmodel with animation blending, weapon sway, and aim-down-sights lag.",
          ],
        },
      ],
    },
  },
  {
    slug: "cad-plane-fabrication",
    kind: "project",
    bgImage: "/renders/plane-assembly.png",
    bgImageOpacity: 0.45,
    bgImageHoverOpacity: 0.6,
    title: "Fixed-Wing Aircraft Fabrication",
    org: "Academic Project — Design Lead",
    period: "Jan 2025 – May 2025",
    metric: "15/15",
    metricLabel: "Project score",
    summary:
      "Led design and fabrication for a 4-person team — translating SolidWorks models into 3D-printed, CNC-machined, and laser-cut components that met every weight and clearance spec.",
    tools: ["3D Printing", "CNC Machining", "Laser Cutting", "SolidWorks", "Tolerance Analysis"],
    drawer: {
      heading: "Fixed-Wing Aircraft Fabrication",
      body: [
        {
          label: "Role",
          bullets: ["Mechanical design lead and team coordinator for a 4-person team."],
        },
        {
          label: "What I Did",
          bullets: [
            "Led SolidWorks modeling, tolerance analysis, and part integration.",
            "Translated design requirements into fabricated components across 3D printing, CNC machining, and laser cutting.",
            "Documented fit issues as they emerged and implemented design revisions to resolve them.",
            "Verified structural integrity of the full assembly before final delivery.",
          ],
        },
        {
          label: "Result",
          bullets: [
            "Met all weight and clearance specifications.",
            "Earned 15/15 on the project.",
          ],
        },
      ],
    },
  },
  {
    slug: "automated-sorting-machine",
    kind: "project",
    title: "Automated Sorting Machine",
    org: "Academic Project — Design-Build-Test",
    period: "Jan 2025 – May 2025",
    metric: "D-B-T",
    metricLabel: "Design · Build · Test",
    summary:
      "Designed and assembled a remote-triggered electromechanical sorter integrating servos, LEDs, and an Arduino microcontroller through a full build-and-test workflow.",
    tools: ["Arduino", "Servo Control", "Embedded C/C++", "Electromechanical Design"],
    drawer: {
      heading: "Automated Sorting Machine",
      body: [
        {
          label: "What I Built",
          bullets: [
            "Designed and assembled a functional electromechanical device integrating servos, LEDs, and an Arduino microcontroller into a complete remote-triggered system.",
          ],
        },
        {
          label: "Engineering Work",
          bullets: [
            "Programmed the Arduino to coordinate servo actuation, LED feedback signals, and remote-triggered control logic.",
            "Hands-on embedded systems design and real-time hardware debugging.",
          ],
        },
        {
          label: "Process",
          bullets: [
            "Applied a build-and-test workflow — design, prototype, validate — similar to product development cycles used in industry.",
          ],
        },
      ],
    },
  },
  {
    slug: "material-science-lab",
    kind: "project",
    title: "Material Science & Lab",
    org: "Coursework — Applied Materials Testing",
    period: "University of Houston",
    metric: "6+",
    metricLabel: "Test methods",
    summary:
      "Hands-on lab work across mechanical and materials testing methods, from tensile and fatigue testing to corrosion analysis and heat treatment.",
    tools: ["Tensile Testing", "Fatigue Testing", "Charpy Impact", "Corrosion Analysis"],
    drawer: {
      heading: "Material Science & Lab",
      body: [
        {
          label: "Hands-On Labs",
          bullets: [
            "Tensile testing",
            "Fatigue testing",
            "Creep testing",
            "Charpy impact testing",
            "Corrosion analysis",
            "Recrystallization",
            "Age hardening",
            "Heat treatment",
          ],
        },
      ],
    },
  },
  {
    slug: "numerical-analysis-matlab",
    kind: "project",
    title: "Numerical Analysis for Scientific Computing",
    org: "Coursework — MATLAB",
    period: "University of Houston",
    metric: "MATLAB",
    metricLabel: "Primary tool",
    summary:
      "Implemented core numerical methods in MATLAB — root-finding, integration, interpolation, and iterative solvers — applied to linear algebra and matrix-based problems.",
    tools: ["MATLAB", "Numerical Methods", "Linear Algebra"],
    drawer: {
      heading: "Numerical Analysis for Scientific Computing",
      body: [
        {
          label: "What I Implemented",
          bullets: [
            "Numerical methods in MATLAB: root-finding, numerical integration, polynomial interpolation, iterative linear solvers.",
            "Applied linear algebra and matrix operations computationally — relevant to eigenvector-based techniques, simulation, and regression.",
          ],
        },
      ],
    },
  },
];

export const skillGroups = [
  {
    title: "Design & Fabrication",
    items: [
      "SolidWorks",
      "Fusion 360",
      "OpenSCAD",
      "SketchUp",
      "3D Printing (Cura, PrusaSlicer)",
      "OctoPrint",
      "CNC Machining",
      "Laser Cutting (RDWorks)",
    ],
  },
  {
    title: "Testing & Instrumentation",
    items: [
      "Tensile / Fatigue / Creep / Charpy Testing",
      "Pressure Transducer Calibration",
      "RTD / Thermocouple Calibration",
      "Stress & Strain Measurement",
      "Regression Analysis",
    ],
  },
  {
    title: "Computing & Analysis",
    items: ["MATLAB", "R", "SQL", "Tableau", "Excel (Macros)"],
  },
  {
    title: "Embedded Systems",
    items: [
      "Arduino Programming",
      "Servo / Sensor Integration",
      "Remote-Triggered Actuation",
      "Circuit Debugging",
    ],
  },
  {
    title: "Enterprise & Documentation",
    items: ["SAP", "SharePoint", "Power Automate"],
  },
];

export const leadership = [
  {
    org: "Muslim Student Association (UH)",
    role: "President · Historian · QCP Committee",
    period: "Aug 2019 – Present",
    bullets: [
      "Directed all club operations and event logistics for a multi-officer team.",
      "Increased member engagement by 30% through structured programming and improved organizational consistency.",
    ],
  },
  {
    org: "Young Muslims",
    role: "NeighborNet Coordinator · Core Team · Cloud · Finance Lead (Houston-wide)",
    period: "Jan 2022 – Present",
    bullets: [
      "Organized weekly educational and social events engaging 40–80 local youth.",
      "Collaborated with Houston-area leadership on city-wide event planning and strategy.",
      "Fostered community growth by leading study circles, mentoring members, and performing targeted youth outreach.",
    ],
  },
  {
    org: "Flipfellas",
    role: "Co-Founder",
    period: "May 2023 – Present",
    bullets: [
      "Launched an e-commerce operation on Facebook Marketplace.",
      "Analyzed sales data to identify emerging product trends and optimize sourcing strategy.",
    ],
  },
  {
    org: "Community Speaker",
    role: "Public Speaking & Content",
    period: "Aug 2023 – Present",
    bullets: [
      "Delivers monthly talks/sermons to live audiences of up to 800 people.",
      "Manages a YouTube channel generating 15,000+ views.",
    ],
  },
];

export const honors = [
  "JP Morgan Merit Scholarship (Aug 2026)",
  "UH Foundation Excellence Scholarship (Jan 2026)",
  "Cizik Scholarship (Aug 2025)",
  "Google Data Analytics Certificate (Aug 2024)",
  "Dean's List (Jan 2024)",
  "Great Conversation Scholarship (Aug 2023)",
];

export const education = {
  school: "University of Houston, Cullen College of Engineering",
  location: "Houston, TX",
  degree: "B.S. Mechanical Engineering, Minor in Mathematics",
  details: "GPA 3.3 · Honors Program · Senior",
  coursework: [
    "Solid Mechanics",
    "Material Science & Lab",
    "Experimental Methods & Lab",
    "Dynamics",
    "Thermodynamics",
    "Fluid Mechanics",
    "Numerical Analysis for Scientific Computing",
    "Computing for Engineers (MATLAB)",
    "Partial Differential Equations",
    "Engineering Math",
    "Calculus I/II/III",
    "Linear Algebra",
    "Finite Element Analysis",
  ],
  graduate: [
    "Biofluid Dynamics",
    "Systems Identification",
  ],
  inProgress: ["Capstone", "Design of Machine Elements", "Thermal Design", "Heat Transfer"],
};
