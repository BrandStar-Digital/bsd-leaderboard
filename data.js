// ============================================================
// BrandStar Digital AI Marketing Engine — Leaderboard Data
// ============================================================
// Phase 1 demonstration data. Point totals are illustrative only.
// Phase 2 will replace this with live data from the engine.
// ============================================================

// --- 28-person roster (April 2026 org chart) ---
// Mark Alfieri, Jackson Sauder, Shafi Habibi excluded per scope.
// Point values intentionally varied so all four ranks appear in the preview.

window.BSD_TEAM = [
  // Leadership
  { name: "Seth Rand",         role: "President",              dept: "Leadership",      points: 5820, streak: 28, badgeTier: 3 },
  { name: "Kristin Ravesloot", role: "Agency Director",        dept: "Leadership",      points: 6240, streak: 31, badgeTier: 3 },
  { name: "Cara Duque",        role: "VP of Client Services",  dept: "Leadership",      points: 5430, streak: 24, badgeTier: 3 },

  // Strategy & Research
  { name: "Dimitrije Micic",   role: "Senior Account Manager", dept: "Strategy",        points: 3290, streak: 11, badgeTier: 2 },

  // Creative / UX
  { name: "Ana Lajcak",        role: "Graphic Designer",       dept: "Creative",        points: 2420, streak: 7,  badgeTier: 2 },
  { name: "Milica Staletovic", role: "UI/UX Designer",         dept: "Creative",        points: 2180, streak: 6,  badgeTier: 2 },
  { name: "Nevena Jovic",      role: "UI/UX Designer",         dept: "Creative",        points: 4720, streak: 19, badgeTier: 3 },
  { name: "Sebastian Ospina",  role: "Social Media Manager",   dept: "Creative",        points: 3080, streak: 10, badgeTier: 2 },
  { name: "Sofia Rosa",        role: "Social & Content Mgr",   dept: "Creative",        points: 2840, streak: 9,  badgeTier: 2 },

  // Client Services
  { name: "Ginger Marks",      role: "Client Services Mgr",    dept: "Client Services", points: 4960, streak: 22, badgeTier: 3 },
  { name: "Don Warshaw",       role: "Account Director",       dept: "Client Services", points: 4150, streak: 17, badgeTier: 2 },
  { name: "Paulina Goicoechea",role: "Account Manager",        dept: "Client Services", points: 3620, streak: 14, badgeTier: 2 },
  { name: "Olga Alcazar",      role: "Senior Account Manager", dept: "Client Services", points: 3860, streak: 15, badgeTier: 2 },
  { name: "Cailin Navia",      role: "Account Manager",        dept: "Client Services", points: 1680, streak: 4,  badgeTier: 1 },
  { name: "Paula Pena",        role: "Account Manager",        dept: "Client Services", points: 1350, streak: 3,  badgeTier: 1 },
  { name: "Alana Starke",      role: "Senior Account Manager", dept: "Client Services", points: 2610, streak: 8,  badgeTier: 2 },
  { name: "Sophie Mwangata",   role: "Account Coordinator",    dept: "Client Services", points: 960,  streak: 2,  badgeTier: 1 },

  // Email
  { name: "Aljon Penus",       role: "Email Marketing Spec.",  dept: "Email",           points: 1920, streak: 5,  badgeTier: 1 },

  // Paid Media
  { name: "Vukasin Obradovic", role: "Sr. Digital Media Planner", dept: "Paid Media",   points: 4410, streak: 17, badgeTier: 2 },
  { name: "Mike Sherman",      role: "Digital Media Planner",  dept: "Paid Media",      points: 1180, streak: 3,  badgeTier: 1 },
  { name: "Priyanka Saini",    role: "Paid Media Buyer",       dept: "Paid Media",      points: 820,  streak: 2,  badgeTier: 1 },
  { name: "Igor Mijuskovic",   role: "Paid Media Buyer",       dept: "Paid Media",      points: 540,  streak: 1,  badgeTier: 1 },

  // SEO / AIO
  { name: "Adrian Go",         role: "SEO Specialist",         dept: "SEO",             points: 1520, streak: 4,  badgeTier: 2 },
  { name: "Amir Shaikh",       role: "SEO Specialist",         dept: "SEO",             points: 640,  streak: 0,  badgeTier: 1 },

  // Web Development
  { name: "Dipesh Patel",      role: "Web Developer",          dept: "Web Dev",         points: 3860, streak: 14, badgeTier: 2 },
  { name: "Rico Dadiz",        role: "Web Developer",          dept: "Web Dev",         points: 2420, streak: 7,  badgeTier: 2 },

  // Admin
  { name: "Ann Santiago",      role: "Operations Manager",     dept: "Admin",           points: 3290, streak: 12, badgeTier: 2 },
  { name: "Susann Vernon",     role: "Operations Coordinator", dept: "Admin",           points: 380,  streak: 0,  badgeTier: 0 }
];

// --- 20 badges across 5 categories ---
window.BSD_BADGES = [
  { id: 1,  cat: "discipline", name: "First Session",        req: "Completed first agent session" },
  { id: 2,  cat: "discipline", name: "CCB-Ready",            req: "CCB pasted first — 10 consecutive sessions" },
  { id: 3,  cat: "discipline", name: "QA Guardian",          req: "Agent 19 QA run 10 times before delivery" },
  { id: 4,  cat: "discipline", name: "Voice Keeper",         req: "10 deliverables passed voice filter first review" },
  { id: 5,  cat: "discipline", name: "Refinement Author",    req: "Submitted a prompt to the Prompt Library" },
  { id: 6,  cat: "discipline", name: "Mentor",               req: "Onboarded a new team member through first session" },
  { id: 7,  cat: "mastery",    name: "Prospector",           req: "Used Agent 01 Prospect Research 10+ times" },
  { id: 8,  cat: "mastery",    name: "Strategist",           req: "Used Agent 06 Campaign Strategy 10+ times" },
  { id: 9,  cat: "mastery",    name: "Paid Media Pro",       req: "Used Agents 13–16 combined 25+ times" },
  { id: 10, cat: "mastery",    name: "Full-Lifecycle",       req: "Used at least one agent from each phase" },
  { id: 11, cat: "mastery",    name: "All-Hands",            req: "Used 20+ of the 24 agents at least once" },
  { id: 12, cat: "platform",   name: "Skill Seeker",         req: "Triggered 5 installed skills" },
  { id: 13, cat: "platform",   name: "SEO Specialist",       req: "Used any 5 SEO-family skills" },
  { id: 14, cat: "platform",   name: "Connector Enabled",    req: "Used 3+ MCP connectors in a single session" },
  { id: 15, cat: "platform",   name: "Platform Explorer",    req: "Claude Enterprise used 30 consecutive sessions" },
  { id: 16, cat: "streak",     name: "7-Day Streak",         req: "Seven consecutive days of engine use" },
  { id: 17, cat: "streak",     name: "30-Day Streak",        req: "Thirty consecutive days of engine use" },
  { id: 18, cat: "streak",     name: "Consistency Champion", req: "Ninety-day CCB discipline streak" },
  { id: 19, cat: "culture",    name: "Knowledge Sharer",     req: "Shared a best practice in Teams #ai-engine" },
  { id: 20, cat: "culture",    name: "Voice Ambassador",     req: "Every deliverable this month passed voice filter" }
];

// --- 24 agents with stub 30-day usage ---
window.BSD_AGENTS = [
  { c: "01", n: "Prospect Research",               uses: 28 },
  { c: "02", n: "Proposal & Pitch Deck Production",uses: 14 },
  { c: "03", n: "Client Brand Brief",              uses: 42 },
  { c: "04", n: "Client Onboarding",               uses: 18 },
  { c: "05", n: "Brand & Messaging Alignment",     uses: 22 },
  { c: "06", n: "Campaign Strategy",               uses: 31 },
  { c: "07", n: "Content Strategy",                uses: 35 },
  { c: "08", n: "Creative Production",             uses: 48 },
  { c: "09", n: "Social Media Management",         uses: 40 },
  { c: "10", n: "SEO",                             uses: 26 },
  { c: "11", n: "Email & Automation",              uses: 19 },
  { c: "12", n: "Web Design & Development",        uses: 15 },
  { c: "13", n: "Paid Media Strategy",             uses: 24 },
  { c: "14", n: "Paid Media Optimization",         uses: 33 },
  { c: "15", n: "Paid Media RevOps",               uses: 7  },
  { c: "16", n: "Paid Media E-Commerce",           uses: 11 },
  { c: "17", n: "Client Reporting & Narrative",    uses: 37 },
  { c: "18", n: "Client Communication",            uses: 29 },
  { c: "19", n: "QA & Brand Compliance",           uses: 52 },
  { c: "20", n: "Client Retention & Risk",         uses: 6  },
  { c: "21", n: "Competitive Intelligence",        uses: 0  },
  { c: "22", n: "PR & Media Outreach",             uses: 3  },
  { c: "23", n: "Biz Dev Intelligence",            uses: 8  },
  { c: "24", n: "Influencer Discovery & Outreach", uses: 2  }
];

// --- Active weekly / monthly challenges ---
window.BSD_CHALLENGES = [
  { p: "This Week",  t: "CCB Discipline",          d: "Start every agent session with the Client Context Block pasted as the first message.", r: "300 points", c: "green" },
  { p: "This Week",  t: "Agent Explorer",          d: "Use three agents you have not used before this month.",                                   r: "600 points", c: "blue"  },
  { p: "This Week",  t: "QA Gate",                 d: "Run Agent 19 on every client-facing deliverable.",                                        r: "500 points", c: "purple"},
  { p: "This Month", t: "Prompt Refinement",       d: "Submit one prompt improvement or new template to the Prompt Library.",                   r: "300 points", c: "pink"  },
  { p: "This Month", t: "Full-Lifecycle Operator", d: "Use at least one agent from each of the three phases.",                                  r: "800 points", c: "yellow"},
  { p: "This Month", t: "Streak Keeper",           d: "Maintain a 14-day engine use streak.",                                                    r: "700 points", c: "red"   }
];

// --- Team-wide stub metrics (Phase 2 replaces with live aggregation) ---
window.BSD_TEAM_METRICS = {
  teamStreakDays: 47,
  qaCompliancePct: 94,
  weeklyTrend: [42, 58, 65, 71, 68, 82, 88, 95]
};
