/**
 * Campus Event Hub - Seed Data
 * Rich campus events data with real dates, venues, categories, and deep details.
 */

const INITIAL_EVENTS = [
  {
    id: "ev-01",
    title: "HACK-CAMPUS 2026: 36h National Flagship Hackathon",
    tagline: "Build futuristic AI, Web3, & IoT solutions. 36 hours of non-stop code, caffeine, and cash prizes!",
    category: "tech",
    categoryLabel: "Tech & Hackathon",
    categoryBadgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    club: "Google Developer Student Club (GDSC)",
    clubLogo: "💻",
    date: "2026-11-06",
    displayDate: "Fri, Nov 6 - Sun, Nov 8, 2026",
    time: "09:00 AM onwards (36 Hours)",
    venue: "Main Campus Auditorium & Innovation Labs",
    maxSeats: 250,
    registeredCount: 218,
    fee: "Free Entry",
    isFree: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Hackathon", "AI/ML", "Web3", "Cash Prizes", "Swag Kits"],
    description: "Welcome to HACK-CAMPUS 2026, the biggest annual hackathon in North Region! Compete with over 200+ top student developers, designers, and innovators. Tackle real-world industry problem statements spanning Generative AI, Sustainable Smart Cities, Healthcare Tech, and Open Innovation.",
    schedule: [
      { time: "Day 1 - 09:00 AM", item: "Check-in, Swag Bag Distribution & Opening Keynote" },
      { time: "Day 1 - 11:00 AM", item: "Hacking Begins & Problem Statement Unveiling" },
      { time: "Day 1 - 08:00 PM", item: "Mentorship Round 1 & Midnight Pizza Party 🍕" },
      { time: "Day 2 - 10:00 AM", item: "Midway Code Review & Energy Boosters" },
      { time: "Day 2 - 08:00 PM", item: "Final Submissions, Code Freeze & Top 10 Demos" },
      { time: "Day 2 - 10:30 PM", item: "Awards Ceremony & ₹1,50,000 Prize Distribution" }
    ],
    prizes: [
      "🥇 1st Place: ₹75,000 + Venture Incubation Support + Mechanical Keyboards",
      "🥈 2nd Place: ₹45,000 + Cloud Credits & Noise Cancelling Headphones",
      "🥉 3rd Place: ₹30,000 + Exclusive GDSC Swag Hampers",
      "🌟 Track Prizes: Best All-Women Team, Best UI/UX, Best AI Implementation"
    ],
    eligibility: "Open to all enrolled college students (UG & PG) from any discipline. Solo or Teams of 2 to 4 members.",
    rules: [
      "All code and prototypes must be developed exclusively during the 36-hour hackathon period.",
      "Open-source libraries and public APIs are permitted; pre-built full applications will lead to immediate disqualification.",
      "Valid College ID card and confirmation QR pass are strictly mandatory for campus entry.",
      "Participants must strictly uphold the Campus Code of Conduct and mutual respect guidelines."
    ],
    contact: {
      coordinator: "Aditya Roy (GDSC Lead)",
      email: "gdsc.campus@college.edu",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "ev-02",
    title: "TARANG 2026: Battle of the Campus Bands & DJ Night",
    tagline: "Feel the beats, guitar solos, and electrifying light shows under the open starry sky!",
    category: "cultural",
    categoryLabel: "Cultural & Arts",
    categoryBadgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    club: "Campus Music & Performing Arts Society (DHWANI)",
    clubLogo: "🎸",
    date: "2026-11-14",
    displayDate: "Sat, Nov 14, 2026",
    time: "05:30 PM - 11:00 PM",
    venue: "Open Air Amphitheatre (OAT)",
    maxSeats: 800,
    registeredCount: 742,
    fee: "Free for Students",
    isFree: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    tags: ["Live Music", "DJ Night", "Battle of Bands", "Food Stalls"],
    description: "Prepare for high-octane live music as 8 premier collegiate rock and fusion bands battle it out for the prestigious Golden Plectrum Trophy, followed by a headliner EDM set by DJ Nuclea with laser visuals and sound pyrotechnics.",
    schedule: [
      { time: "05:30 PM", item: "Gates Open & Acoustic Warm-up Performances" },
      { time: "06:30 PM", item: "Battle of the Bands - Round 1 (Original Compositions)" },
      { time: "08:30 PM", item: "Judges Scoring & Trophy Ceremony" },
      { time: "09:00 PM", item: "Headline Guest DJ Neon Sunset Set & Dance Floor Open" }
    ],
    prizes: [
      "🏆 Champion Band: ₹35,000 + Studio Recording Contract",
      "🥈 Runner-up Band: ₹15,000 + Audio Gear Gift Vouchers"
    ],
    eligibility: "All college students and faculty. External guests allowed with student pass holders.",
    rules: [
      "Strict zero-tolerance policy towards alcohol, drugs, or disruptive behavior.",
      "College digital QR pass must be scanned at security gate 1 or 3.",
      "Outside food or metal bottles not allowed inside the amphitheatre arena."
    ],
    contact: {
      coordinator: "Simran Kaur (Cultural Secretary)",
      email: "cultural.tarang@college.edu",
      phone: "+91 98123 45678"
    }
  },
  {
    id: "ev-03",
    title: "CAMPUS VALORANT & BGMI CLUTCH CHAMPIONSHIP",
    tagline: "5v5 Tactical FPS showdown. Prove your crosshair placement, clutch 1v4 rounds, and claim bragging rights!",
    category: "gaming",
    categoryLabel: "E-Sports & Gaming",
    categoryBadgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    club: "Campus E-Sports & Gaming Guild (LevelUp)",
    clubLogo: "🎮",
    date: "2026-11-20",
    displayDate: "Fri, Nov 20 - Sat, Nov 21, 2026",
    time: "10:00 AM - 07:00 PM",
    venue: "E-Sports Arena & Central Seminar Hall 2",
    maxSeats: 64,
    registeredCount: 52,
    fee: "₹200 / Team",
    isFree: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Valorant", "BGMI", "LAN Tournament", "E-Sports", "Streaming"],
    description: "The most anticipated inter-branch gaming face-off! Custom 144Hz setups, low-ping LAN server, live caster shoutcasting, and huge projector streaming. Compete in 5v5 Valorant Spike Rush & Competitive brackets plus mobile BGMI squad battles.",
    schedule: [
      { time: "Day 1 - 10:00 AM", item: "Team Captain Briefing & Map Vetoes" },
      { time: "Day 1 - 11:00 AM", item: "Group Stages - Best of 1 Matches" },
      { time: "Day 2 - 11:00 AM", item: "Semifinals - Best of 3" },
      { time: "Day 2 - 04:30 PM", item: "Grand Finals Live Casting & Awards" }
    ],
    prizes: [
      "🥇 1st Place Team: ₹20,000 + Razer Gaming Mice & Jerseys",
      "🥈 2nd Place Team: ₹10,000 + Gaming Headsets",
      "⭐ MVP of the Tournament: ₹5,000 Cash Prize"
    ],
    eligibility: "5 players per team (optional 1 substitute). All players must be current enrolled students.",
    rules: [
      "Tournament played on custom tournament realm with official Riot esports rules.",
      "Any third-party macro or illicit script usage results in permanent guild ban.",
      "Players may bring their own mice, keyboards, and in-ear monitors."
    ],
    contact: {
      coordinator: "Rohan Vats (E-Sports Lead)",
      email: "esports.levelup@college.edu",
      phone: "+91 97234 56789"
    }
  },
  {
    id: "ev-04",
    title: "GEN-AI & LLM AGENTS CRASH COURSE",
    tagline: "Hands-on Masterclass: Build autonomous reasoning agents with LangChain, Gemini API, and Vector DBs.",
    category: "workshop",
    categoryLabel: "Workshops & Seminars",
    categoryBadgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    club: "AI & Machine Learning Club (AIML Hub)",
    clubLogo: "🤖",
    date: "2026-11-10",
    displayDate: "Tue, Nov 10, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "Advanced Computing Lab 3 (Block B)",
    maxSeats: 80,
    registeredCount: 76,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Generative AI", "Gemini 2.5", "LLMs", "Hands-on Lab", "Certificate"],
    description: "Move beyond simple chat prompts. Learn how to architect real production AI agents equipped with tool-calling capabilities, vector semantic search, RAG pipelines, and memory. Led by senior industry ML engineers.",
    schedule: [
      { time: "02:00 PM", item: "Introduction to Agentic Architectures & ReAct Patterns" },
      { time: "03:15 PM", item: "Hands-on Lab 1: Building Tool-Calling Agents with Python" },
      { time: "04:30 PM", item: "Lab 2: Multi-Agent Collaboration & Vector Embeddings" },
      { time: "05:30 PM", item: "Q&A, Project Capstone Guidelines & Certificate Issuance" }
    ],
    prizes: [
      "📜 Verifiable Industry Certificate of Completion for all attendees",
      "🚀 Free $100 Cloud API Credits for your project portfolio"
    ],
    eligibility: "Open to 2nd, 3rd, and 4th-year engineering students with basic Python knowledge.",
    rules: [
      "Bring your own charged laptop with Python 3.10+ installed.",
      "Limited seats due to lab workstation capacity; confirmed QR ticket required."
    ],
    contact: {
      coordinator: "Dr. Ananya Sen & Tanmay Joshi",
      email: "aiml.workshop@college.edu",
      phone: "+91 91234 56780"
    }
  },
  {
    id: "ev-05",
    title: "ANNUAL INTER-BRANCH CRICKET TOURNAMENT 2026",
    tagline: "The clash of titans! 12 branches, 1 champion trophy. High intensity T-10 matches under campus floodlights.",
    category: "sports",
    categoryLabel: "Sports & Fitness",
    categoryBadgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    club: "Campus Sports Council & Cricket Board",
    clubLogo: "🏏",
    date: "2026-11-25",
    displayDate: "Wed, Nov 25 - Sun, Nov 29, 2026",
    time: "03:00 PM - 09:30 PM Daily",
    venue: "Campus Main Sports Stadium (Cricket Ground)",
    maxSeats: 300,
    registeredCount: 195,
    fee: "Free for Spectators",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Cricket", "T-10", "Floodlights", "Inter-Department", "Trophy"],
    description: "Feel the adrenaline as branches go head-to-head in fast-paced T-10 matches under stadium floodlights. Cheer for your department, enjoy commentary, live DJ boundary music, and sports food stalls.",
    schedule: [
      { time: "Day 1 - 03:00 PM", item: "Opening Match: CSE vs Mechanical Warriors" },
      { time: "Day 2 - 03:00 PM", item: "Quarter-Finals Blitz Matches" },
      { time: "Day 4 - 05:00 PM", item: "Semi-Finals Under Lights" },
      { time: "Day 5 - 06:00 PM", item: "The Grand Finale & Presentation Ceremony" }
    ],
    prizes: [
      "🏆 Chancellor's Rolling Trophy & Gold Medals",
      "🥈 Runner-up Silver Shield & ₹15,000 Kit Allowance",
      "🎖️ Man of the Tournament, Best Batsman, Best Bowler Trophies"
    ],
    eligibility: "Spectator seats open to all students and staff. Branch cricket teams registered via physical trials.",
    rules: [
      "Official ICC T-10 rules with campus ground boundary ground rules.",
      "Cheer zones demarcated by departments; respect all players and umpires."
    ],
    contact: {
      coordinator: "Capt. K. S. Rathore (Sports Officer)",
      email: "sports.cricket@college.edu",
      phone: "+91 93456 78901"
    }
  },
  {
    id: "ev-06",
    title: "VENTURE-PITCH 2026: Campus Shark Tank",
    tagline: "Pitch your startup idea to real Angel Investors & VC Partners. Win ₹2 Lakh seed grant & incubation!",
    category: "career",
    categoryLabel: "Entrepreneurship & E-Cell",
    categoryBadgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    club: "Campus Entrepreneurship Cell (E-Cell)",
    clubLogo: "🚀",
    date: "2026-12-02",
    displayDate: "Wed, Dec 2, 2026",
    time: "10:30 AM - 04:30 PM",
    venue: "Management Auditorium & Boardroom Alpha",
    maxSeats: 120,
    registeredCount: 88,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    tags: ["Startup", "Pitching", "Seed Capital", "Angel Investors", "Incubation"],
    description: "Do you have a breakthrough startup concept? Pitch your MVP or deck in front of a panel of active angel investors, startup founders, and college alumni venture funds. Walk away with term sheets, mentorship, and equity-free innovation grants.",
    schedule: [
      { time: "10:30 AM", item: "Fireside Chat: 'From College Project to Series A' with Alum Founder" },
      { time: "11:30 AM", item: "Top 10 Startup Pitches (5 min pitch + 5 min Q&A)" },
      { time: "02:00 PM", item: "Investor Deliberation & Networking Lunch" },
      { time: "03:30 PM", item: "Seed Grants Announcement & Incubation Letters" }
    ],
    prizes: [
      "💰 Winner: ₹1,50,000 Equity-free Seed Grant + 1 Year Incubation Lab space",
      "💡 Runner-Up: ₹75,000 Prototype Development Fund",
      "🤝 Top 3: Direct fast-track interview with National Incubators"
    ],
    eligibility: "Any college student or alumni team with an original business concept or tech prototype.",
    rules: [
      "Maximum pitch deck length: 10 slides.",
      "Must present a functional prototype or validated business model."
    ],
    contact: {
      coordinator: "Pooja Malhotra (E-Cell President)",
      email: "ecell.pitch@college.edu",
      phone: "+91 98877 66554"
    }
  },
  {
    id: "ev-07",
    title: "ROBOCON WARS & DRONE RACE DERBY",
    tagline: "Heavyweight battle bots tearing through steel, sparks flying, and high-speed FPV drone obstacle racing!",
    category: "tech",
    categoryLabel: "Tech & Robotics",
    categoryBadgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    club: "Campus Robotics & Automation Society (CRAS)",
    clubLogo: "⚙️",
    date: "2026-12-08",
    displayDate: "Tue, Dec 8, 2026",
    time: "11:00 AM - 06:00 PM",
    venue: "Mechanical Quadrangle & Enclosed Combat Arena",
    maxSeats: 200,
    registeredCount: 164,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Robotics", "Combat Bots", "FPV Drones", "Hardware", "Sparks"],
    description: "Witness 15kg and 30kg custom combat robots battle inside a polycarbonate reinforced arena with spinning blades, pneumatic flippers, and fire hazard traps! Simultaneously, watch nimble FPV micro-drones race through glowing LED neon rings at 80 km/h.",
    schedule: [
      { time: "11:00 AM", item: "Bot Safety Inspection & Weigh-in Verification" },
      { time: "12:00 PM", item: "Robo-Combat Preliminary Rounds" },
      { time: "02:30 PM", item: "FPV Drone Obstacle Time Trials" },
      { time: "04:30 PM", item: "Deathmatch Finals & Heavy Metal Clashes" }
    ],
    prizes: [
      "🥇 Combat Heavyweight Champion: ₹40,000 + 3D Printer Kit",
      "🛸 FPV Drone Speed King: ₹25,000 + FPV Goggles & Controller",
      "🛠️ Most Innovative Mechanical Design Award: ₹10,000"
    ],
    eligibility: "Open to engineering students. Teams must comply with weight class limits.",
    rules: [
      "Arena safety glass must never be breached; emergency fail-safe switches mandatory on all bots.",
      "Spectators must stay behind safety barriers."
    ],
    contact: {
      coordinator: "Vikram Mehta (Robotics Lead)",
      email: "robotics.cras@college.edu",
      phone: "+91 94123 78902"
    }
  },
  {
    id: "ev-08",
    title: "NATYA-MANCH: Annual Inter-College Theatre & Street Play",
    tagline: "Powerful social monologues, energetic Nukkad Natak drums, and emotional stage drama performances.",
    category: "cultural",
    categoryLabel: "Cultural & Arts",
    categoryBadgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    club: "Campus Dramatics & Theatre Guild (RANGMANCH)",
    clubLogo: "🎭",
    date: "2026-12-12",
    displayDate: "Sat, Dec 12, 2026",
    time: "01:00 PM - 07:30 PM",
    venue: "Central Arts Plaza & Main Stage",
    maxSeats: 350,
    registeredCount: 280,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Theatre", "Street Play", "Nukkad Natak", "Drama", "Live Acts"],
    description: "Experience the raw power of voice, percussion, and theatrical storytelling. 10 renowned drama societies present evocative street plays and proscenium theatre productions addressing contemporary societal issues, satire, and human resilience.",
    schedule: [
      { time: "01:00 PM", item: "Inaugural Dhol Beat Procession & Welcome Act" },
      { time: "01:45 PM", item: "Street Play (Nukkad Natak) Competition at Arts Circle" },
      { time: "04:30 PM", item: "Stage Drama Showcase in Main Auditorium" },
      { time: "06:45 PM", item: "Best Actor, Script, & Production Honors" }
    ],
    prizes: [
      "🎭 Best Production Trophy & ₹30,000 Cash Prize",
      "🥁 Best Street Play Ensemble: ₹20,000",
      "⭐ Best Actor (Male & Female) & Best Script Awards"
    ],
    eligibility: "Open to all students, faculties, and theatre enthusiasts.",
    rules: [
      "Maximum performance time: 20 minutes for Street Play, 35 minutes for Stage Drama.",
      "Content must respect campus guidelines and sensitive community standards."
    ],
    contact: {
      coordinator: "Gauri Deshmukh (Drama Secretary)",
      email: "theatre.rangmanch@college.edu",
      phone: "+91 99012 34567"
    }
  }
];

// Sample live activity messages to simulate campus excitement
const LIVE_CAMPUS_ACTIVITIES = [
  "🎉 Priya Sharma (CS-3rd Yr) registered for HACK-CAMPUS 2026!",
  "⚡ Only 8 seats remaining for Gen-AI Masterclass!",
  "🎸 Dhwani Band confirmed slot for TARANG 2026 Battle of Bands!",
  "🚀 Team 'NeuralForge' registered for Campus Shark Tank!",
  "🔥 14 students registered in the last 20 minutes!",
  "🎮 Team 'Phoenix Clutch' signed up for Valorant Championship!"
];
