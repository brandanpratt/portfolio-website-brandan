export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "AI & Data" | "Web Platform" | "Government" | "Website";
  year?: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  stack: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bahamas-election-analytics",
    title: "Bahamas Election Analytics 2026",
    client: "Personal project",
    category: "AI & Data",
    year: "2026",
    summary:
      "A live election analytics platform: real-time constituency data streamed from APIs into Snowflake and surfaced on an interactive geospatial dashboard.",
    problem:
      "Election night coverage in The Bahamas relies on scattered updates. There was no single live view of seat counts, constituency results and party performance.",
    approach: [
      "Python ingestion pipelines pull constituency results from election APIs in near real time.",
      "Data is warehoused in Snowflake with analytics marts for seats, turnout and party performance.",
      "A Streamlit + Plotly dashboard renders GeoJSON constituency maps with auto-refreshing seat tracking.",
    ],
    outcome:
      "A publicly deployed, auto-refreshing dashboard that turns raw election feeds into an at-a-glance national picture.",
    stack: ["Python", "Pandas", "SQLAlchemy", "Snowflake", "Streamlit", "Plotly", "GeoJSON", "REST APIs"],
    images: [
      "/projects/data-projects/bahamas-election-1.png",
      "/projects/data-projects/bahamas-election-2.png",
      "/projects/data-projects/bahamas-election-3.png",
    ],
    liveUrl: "https://bahamas-election-analytics.streamlit.app/",
    repoUrl: "https://github.com/brandanpratt/bahamas-election-analytics",
    featured: true,
  },
  {
    slug: "employee-id-system",
    title: "Employee ID Management System",
    client: "Public-sector agency, The Bahamas",
    category: "Government",
    summary:
      "A centralised system for registering staff, collecting photos and generating print-ready ID cards automatically.",
    problem:
      "Employee ID issuance across a large public-sector workforce was manual, slow and hard to audit.",
    approach: [
      "Built an employee registration and verification flow with photo submission.",
      "Generated ID cards dynamically from templates, with batch printing.",
      "Added an admin back office with role-based access, category and position management and advanced search.",
    ],
    outcome:
      "One source of truth for employee identity data and a repeatable, auditable card-printing workflow, delivered through the Digital Transformation Unit.",
    stack: ["PHP", "JavaScript", "MariaDB", "PDF generation", "Role-based access"],
    images: [],
    featured: true,
  },
  {
    slug: "triblockhr",
    title: "TriblockHR",
    client: "Plato Alpha Designs",
    category: "Web Platform",
    year: "2023",
    summary:
      "An HR management SaaS covering timesheets, documents, payroll and performance reviews.",
    problem:
      "Growing organisations were running HR on spreadsheets and email, with no reliable record of time, documents or reviews.",
    approach: [
      "Built a Laravel REST API with a React dashboard front end.",
      "Shipped timesheet tracking, document management and performance review workflows.",
      "Deployed and maintained on hardened Linux hosting with SSL and release workflows.",
    ],
    outcome: "A production HR platform in active use by client organisations.",
    stack: ["Laravel", "React", "MySQL", "REST API", "Linux"],
    images: [
      "/projects/triblock-dashboard.png",
      "/projects/triblock-timesheets.png",
      "/projects/triblock-documents.png",
      "/projects/triblock-performancereview.png",
    ],
    liveUrl: "https://triblockhr.net/",
    featured: true,
  },
  {
    slug: "retail-data-migration",
    title: "Retail Data Migration Platform",
    client: "Engineering case study",
    category: "AI & Data",
    summary:
      "Incremental migration of retail transactions from legacy SQL Server into a layered Snowflake warehouse, orchestrated with Airflow and modelled with dbt.",
    problem:
      "Legacy on-prem SQL Server data was locked away from modern analytics, and full reloads were slow and error-prone.",
    approach: [
      "Modular Python ETL with watermark-based incremental loading and ROW_NUMBER deduplication.",
      "Snowflake RAW → STAGING → MARTS architecture with dbt transformations.",
      "Airflow DAG orchestration, automated data-quality tests, audit logging and failure alerting.",
    ],
    outcome:
      "A repeatable, observable pipeline pattern that moves legacy data to the cloud safely, and the data foundation AI work depends on.",
    stack: ["Python", "Airflow", "dbt", "Snowflake", "SQL Server", "Docker", "PostgreSQL"],
    images: [],
    repoUrl: "https://github.com/brandanpratt/retail-data-migration",
  },
  {
    slug: "ournews-go242",
    title: "Our News (GO242)",
    client: "Our News Bahamas",
    category: "Website",
    summary:
      "A news and community platform for The Bahamas with local news, weather and community celebrations.",
    problem: "The publisher needed a fast, mobile-first home for news, weather and community content.",
    approach: [
      "WordPress build with a multi-section editorial layout.",
      "Weather forecast integration and a community celebrations section.",
      "Dropbox API integration for media workflows.",
    ],
    outcome: "A mobile-first news site serving a Bahamian audience.",
    stack: ["WordPress", "PHP", "JavaScript", "MySQL", "Dropbox API"],
    images: ["/projects/ournews-hero.png", "/projects/ournews-celebrations.png"],
    liveUrl: "https://ournews.bs/",
  },
  {
    slug: "jubilee-international-ministries",
    title: "Jubilee International Ministries",
    client: "Jubilee International Ministries",
    category: "Website",
    summary:
      "A church website with ministry information, leadership profiles, events and visitor engagement.",
    problem: "The ministry needed a welcoming, easy-to-update online home for members and visitors.",
    approach: [
      "Responsive WordPress site with ministry showcases and leadership profiles.",
      "Event and visitor engagement sections the team can manage themselves.",
    ],
    outcome: "A self-managed site that represents the ministry online.",
    stack: ["WordPress", "PHP", "HTML/CSS"],
    images: [
      "/projects/jubilee-hero.png",
      "/projects/jubilee-welcome.png",
      "/projects/jubilee-ministries.png",
      "/projects/jubilee-leadership.png",
    ],
    liveUrl: "https://jubileepittintl.com/",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
