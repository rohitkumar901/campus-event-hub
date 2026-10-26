/**
 * Campus Event Hub - Seed Events Data
 * Rich collegiate festival and departmental events with genuine campus vibe!
 */

const INITIAL_EVENTS = [
  {
    id: "ev-01",
    title: "HACK-CAMPUS 2026: 36h Flagship Hackathon",
    tagline: "Build futuristic AI, Web3, & IoT solutions. 36 hours of non-stop code, midnight pizza, and ₹1,50,000 cash prizes!",
    category: "tech",
    categoryLabel: "💻 Tech & Hackathon",
    categoryColor: "blue",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    borderClass: "cat-border-tech",
    sticker: "🔥 36h Non-stop",
    stickerColor: "bg-orange-500 text-white",
    club: "Google Developer Student Club (GDSC)",
    clubLogo: "💻",
    date: "2026-11-06",
    displayDate: "Nov 6 - Nov 8, 2026",
    time: "09:00 AM (36 Hours)",
    venue: "Main Campus Auditorium & Labs",
    maxSeats: 250,
    registeredCount: 218,
    fee: "Free Entry",
    isFree: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Hackathon", "AI/ML", "Web3", "Cash Prizes", "Swag Kits"],
    description: "Welcome to HACK-CAMPUS 2026! Compete with over 200+ top student developers, designers, and innovators. Tackle real-world problem statements spanning Generative AI, Sustainable Smart Cities, and Open Innovation.",
    schedule: [
      { time: "Day 1 - 09:00 AM", item: "Check-in, Swag Bag Distribution & Opening Ceremony" },
      { time: "Day 1 - 11:00 AM", item: "Hacking Begins & Problem Statements Reveal" },
      { time: "Day 1 - 09:00 PM", item: "Mentorship Round 1 & Midnight Pizza Party 🍕" },
      { time: "Day 2 - 10:00 AM", item: "Progress Review & Red Bull Energy Break ⚡" },
      { time: "Day 2 - 08:00 PM", item: "Final Demos, Code Freeze & Top 10 Pitches" },
      { time: "Day 2 - 10:30 PM", item: "Awards Ceremony & ₹1,50,000 Prize Distribution" }
    ],
    prizes: [
      "🥇 1st Place: ₹75,000 Cash + Mechanical Keyboards + Cloud Credits",
      "🥈 2nd Place: ₹45,000 Cash + Noise Cancelling Headphones",
      "🥉 3rd Place: ₹30,000 Cash + GDSC Swag Backpacks",
      "🌟 Special Tracks: Best All-Women Team, Best UI/UX"
    ],
    eligibility: "Open to all enrolled college students (UG & PG). Solo or Teams of 2 to 4 members.",
    rules: [
      "All code must be written during the 36-hour hackathon period.",
      "Open-source libraries and APIs permitted; pre-built full apps not allowed.",
      "College ID card and digital QR pass are strictly mandatory at gate check-in."
    ],
    contact: {
      coordinator: "Aditya Roy (GDSC Lead)",
      email: "gdsc.campus@college.edu",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "ev-02",
    title: "TARANG 2026: Battle of Campus Bands & EDM Night",
    tagline: "Feel the drums, electric guitar solos, and laser shows under the open sky! 8 rock bands + headline DJ set.",
    category: "cultural",
    categoryLabel: "🎸 Cultural & Bands",
    categoryColor: "pink",
    badgeClass: "bg-pink-500/20 text-pink-400 border-pink-500/40",
    borderClass: "cat-border-cultural",
    sticker: "🎵 Live Concert",
    stickerColor: "bg-pink-600 text-white",
    club: "Campus Music & Performing Arts (DHWANI)",
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
    description: "Get ready for high-octane rock, fusion melodies, and an electrifying headline DJ set with pyrotechnics. 8 premier university bands compete for the Golden Plectrum Trophy!",
    schedule: [
      { time: "05:30 PM", item: "Gates Open & Campus Food Street Fair" },
      { time: "06:30 PM", item: "Battle of the Bands - Round 1 (Original Tracks)" },
      { time: "08:30 PM", item: "Judges Scoring & Trophy Ceremony" },
      { time: "09:00 PM", item: "Headliner DJ Neon Sunset & Open Dance Arena" }
    ],
    prizes: [
      "🏆 Champion Band: ₹35,000 + Studio Recording Contract",
      "🥈 Runner-up: ₹15,000 + Audio Gear Gift Vouchers"
    ],
    eligibility: "Open to all students and faculty with valid college pass.",
    rules: [
      "College QR ticket must be scanned at entry Gate 1 or Gate 3.",
      "Strict campus security protocol: Outside drinks/bottles not permitted inside OAT."
    ],
    contact: {
      coordinator: "Simran Kaur (Cultural Secretary)",
      email: "dhwani.fest@college.edu",
      phone: "+91 98123 45678"
    }
  },
  {
    id: "ev-03",
    title: "CAMPUS VALORANT & BGMI CLUTCH CHAMPIONSHIP",
    tagline: "5v5 LAN showdown! Custom 144Hz setups, live shoutcasters, and intense clutch rounds for college glory.",
    category: "gaming",
    categoryLabel: "🎮 E-Sports League",
    categoryColor: "orange",
    badgeClass: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    borderClass: "cat-border-gaming",
    sticker: "⚡ 5v5 LAN Arena",
    stickerColor: "bg-orange-600 text-white",
    club: "Campus Gaming Guild (LevelUp)",
    clubLogo: "🎮",
    date: "2026-11-20",
    displayDate: "Nov 20 - Nov 21, 2026",
    time: "10:00 AM - 07:00 PM",
    venue: "E-Sports Arena (Block C)",
    maxSeats: 64,
    registeredCount: 52,
    fee: "₹200 / Squad",
    isFree: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Valorant", "BGMI", "LAN Tournament", "E-Sports", "Streaming"],
    description: "The biggest collegiate gaming tournament! Custom 0-ping LAN server, live caster commentary on projector screens, and high-intensity bracket matches.",
    schedule: [
      { time: "Day 1 - 10:00 AM", item: "Captains Briefing & Map Vetoes" },
      { time: "Day 1 - 11:00 AM", item: "Group Stages - Best of 1" },
      { time: "Day 2 - 01:00 PM", item: "Semifinals & Loser Bracket Finals" },
      { time: "Day 2 - 05:00 PM", item: "Grand Finals Live Casting & Awards" }
    ],
    prizes: [
      "🥇 1st Place Squad: ₹20,000 + Razer Gaming Mice & Custom Jerseys",
      "🥈 2nd Place Squad: ₹10,000 + Gaming Headsets",
      "⭐ Tournament MVP: ₹5,000 Cash Prize"
    ],
    eligibility: "5 players per team (optional 1 substitute). All players must be enrolled students.",
    rules: [
      "Official tournament realm rules apply. Any scripts or cheating leads to instant disqualify.",
      "Players may bring their own mice, mechanical keyboards, and in-ear monitors."
    ],
    contact: {
      coordinator: "Rohan Vats (E-Sports President)",
      email: "esports.guild@college.edu",
      phone: "+91 97234 56789"
    }
  },
  {
    id: "ev-04",
    title: "GEN-AI & LLM AGENTS MASTERCLASS",
    tagline: "Hands-on Workshop: Build autonomous reasoning agents with LangChain, Gemini API, and Vector DBs.",
    category: "workshop",
    categoryLabel: "🤖 AI & Workshop",
    categoryColor: "cyan",
    badgeClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    borderClass: "cat-border-workshop",
    sticker: "📜 Certificate",
    stickerColor: "bg-cyan-600 text-white",
    club: "AI & Machine Learning Club",
    clubLogo: "🤖",
    date: "2026-11-10",
    displayDate: "Tue, Nov 10, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "Advanced Computing Lab 3",
    maxSeats: 80,
    registeredCount: 76,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Generative AI", "Gemini", "Agents", "Hands-on Lab", "Certificate"],
    description: "Learn how to architect production AI agents equipped with tool-calling capabilities, vector semantic search, RAG pipelines, and persistent memory. Led by senior industry ML engineers.",
    schedule: [
      { time: "02:00 PM", item: "Agentic Architectures & ReAct Patterns Demystified" },
      { time: "03:15 PM", item: "Hands-on Lab 1: Building Tool-Calling Agents with Python" },
      { time: "04:30 PM", item: "Lab 2: Multi-Agent Workflows & Vector Embeddings" },
      { time: "05:30 PM", item: "Q&A, Capstone Guidelines & Verifiable Certificate Issuance" }
    ],
    prizes: [
      "📜 Verifiable Industry Certificate for your LinkedIn & Resume",
      "🚀 Free $100 Cloud API Credits for personal projects"
    ],
    eligibility: "Open to 2nd, 3rd, and 4th-year engineering and CS students.",
    rules: [
      "Bring your own charged laptop with Python 3.10+ installed.",
      "Workstations allocated on first-come QR scan basis."
    ],
    contact: {
      coordinator: "Dr. Ananya Sen & Tanmay Joshi",
      email: "aiml.club@college.edu",
      phone: "+91 91234 56780"
    }
  },
  {
    id: "ev-05",
    title: "CAMPUS PREMIER LEAGUE CRICKET 2026",
    tagline: "The battle of departments! 12 branches, 1 championship trophy. Fast-paced T-10 matches under stadium floodlights.",
    category: "sports",
    categoryLabel: "🏏 Sports & Fitness",
    categoryColor: "emerald",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    borderClass: "cat-border-sports",
    sticker: "🏆 Floodlight T-10",
    stickerColor: "bg-emerald-600 text-white",
    club: "Campus Sports Council",
    clubLogo: "🏏",
    date: "2026-11-25",
    displayDate: "Nov 25 - Nov 29, 2026",
    time: "03:00 PM - 09:30 PM Daily",
    venue: "Main Sports Stadium Ground",
    maxSeats: 300,
    registeredCount: 195,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Cricket", "T-10", "Floodlights", "Department Clashes", "Trophy"],
    description: "Cheer for your branch! Fast-paced 10-over matches under stadium floodlights with commentary, DJ boundary music, and sports food stalls.",
    schedule: [
      { time: "Day 1 - 03:00 PM", item: "Opening Match: CSE Warriors vs Mechanical Titans" },
      { time: "Day 2 - 03:00 PM", item: "Quarter-Finals Knockout Blitz" },
      { time: "Day 4 - 05:00 PM", item: "Semi-Finals Under Lights" },
      { time: "Day 5 - 06:00 PM", item: "The Grand Finale & Presentation Ceremony" }
    ],
    prizes: [
      "🏆 Chancellor's Rolling Gold Cup + Medals",
      "🥈 Runner-up Silver Shield & ₹15,000 Sports Kit Allowance",
      "🎖️ Man of the Tournament, Best Batsman, Best Bowler Trophies"
    ],
    eligibility: "Spectator seating open to all students and staff.",
    rules: [
      "ICC T-10 rules with campus boundary adaptations.",
      "Department cheer zones demarcated for safety and good sportsmanship."
    ],
    contact: {
      coordinator: "Capt. K. S. Rathore (Sports Officer)",
      email: "sports.council@college.edu",
      phone: "+91 93456 78901"
    }
  },
  {
    id: "ev-06",
    title: "VENTURE-PITCH 2026: Campus Shark Tank",
    tagline: "Pitch your startup MVP to Angel Investors & Alumni VCs. Win ₹2 Lakh seed grant and incubation support!",
    category: "career",
    categoryLabel: "🚀 E-Cell & Pitch",
    categoryColor: "amber",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    borderClass: "cat-border-career",
    sticker: "💰 ₹2L Seed Grant",
    stickerColor: "bg-amber-600 text-white",
    club: "Campus Entrepreneurship Cell (E-Cell)",
    clubLogo: "🚀",
    date: "2026-12-02",
    displayDate: "Wed, Dec 2, 2026",
    time: "10:30 AM - 04:30 PM",
    venue: "Management Auditorium",
    maxSeats: 120,
    registeredCount: 88,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    tags: ["Startup", "Pitching", "Seed Capital", "Angel Investors", "Incubation"],
    description: "Do you have a working prototype or startup business model? Pitch in front of active angel investors, startup founders, and alumni venture funds.",
    schedule: [
      { time: "10:30 AM", item: "Fireside Keynote: 'Zero to Series A' by Alumni Founder" },
      { time: "11:30 AM", item: "Top 10 Startup Pitches (5 min pitch + 5 min Q&A)" },
      { time: "02:00 PM", item: "Investor Deliberations & Networking Mixer" },
      { time: "03:30 PM", item: "Seed Grants Announcement & Incubation Letters" }
    ],
    prizes: [
      "💰 Winner: ₹1,50,000 Equity-free Seed Grant + 1 Year Incubation Lab space",
      "💡 Runner-Up: ₹75,000 Prototype Development Fund",
      "🤝 Direct fast-track interview with National Incubators"
    ],
    eligibility: "Open to all enrolled students and recent alumni with prototype or validated business idea.",
    rules: [
      "Maximum pitch deck length: 10 slides.",
      "Live MVP or prototype demonstration required during pitch."
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
    tagline: "Heavyweight battle bots tearing through steel, sparks flying, and high-speed FPV drone obstacle racing at 80 km/h!",
    category: "tech",
    categoryLabel: "💻 Tech & Robotics",
    categoryColor: "blue",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    borderClass: "cat-border-tech",
    sticker: "⚙️ Combat Arena",
    stickerColor: "bg-blue-600 text-white",
    club: "Campus Robotics Society",
    clubLogo: "⚙️",
    date: "2026-12-08",
    displayDate: "Tue, Dec 8, 2026",
    time: "11:00 AM - 06:00 PM",
    venue: "Enclosed Combat Arena (Mech Quad)",
    maxSeats: 200,
    registeredCount: 164,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Robotics", "Combat Bots", "FPV Drones", "Hardware", "Sparks"],
    description: "Witness 15kg and 30kg custom combat robots battle inside a polycarbonate reinforced arena with spinning blades, pneumatic flippers, and fire hazards! Plus high-speed FPV drone obstacle time-trials.",
    schedule: [
      { time: "11:00 AM", item: "Bot Safety Inspection & Weigh-in Verification" },
      { time: "12:00 PM", item: "Combat Bot Preliminary Elimination Rounds" },
      { time: "02:30 PM", item: "FPV Drone LED Obstacle Time Trials" },
      { time: "04:30 PM", item: "Heavyweight Deathmatch Finals & Awarding" }
    ],
    prizes: [
      "🥇 Combat Heavyweight Champion: ₹40,000 + 3D Printer Kit",
      "🛸 FPV Drone Speed King: ₹25,000 + FPV Goggles & Controller",
      "🛠️ Most Innovative Mechanical Design: ₹10,000"
    ],
    eligibility: "Open to engineering students. Weight classes must be strictly respected.",
    rules: [
      "All bots must have remote fail-safe emergency kill switches.",
      "Spectators must stay behind polycarbonate safety barriers at all times."
    ],
    contact: {
      coordinator: "Vikram Mehta (Robotics Lead)",
      email: "robotics.club@college.edu",
      phone: "+91 94123 78902"
    }
  },
  {
    id: "ev-08",
    title: "NATYA-MANCH: Annual Street Play & Theatre Fest",
    tagline: "Powerful social monologues, energetic Nukkad Natak drums, and emotional stage drama performances.",
    category: "cultural",
    categoryLabel: "🎸 Cultural & Arts",
    categoryColor: "pink",
    badgeClass: "bg-pink-500/20 text-pink-400 border-pink-500/40",
    borderClass: "cat-border-cultural",
    sticker: "🎭 Street Play",
    stickerColor: "bg-rose-600 text-white",
    club: "Campus Dramatics Guild (RANGMANCH)",
    clubLogo: "🎭",
    date: "2026-12-12",
    displayDate: "Sat, Dec 12, 2026",
    time: "01:00 PM - 07:30 PM",
    venue: "Central Arts Plaza & Stage",
    maxSeats: 350,
    registeredCount: 280,
    fee: "Free Entry",
    isFree: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Theatre", "Street Play", "Nukkad Natak", "Drama", "Live Acts"],
    description: "Experience the raw power of voice, percussion, and theatrical storytelling. 10 renowned collegiate drama societies present evocative street plays and proscenium theatre productions.",
    schedule: [
      { time: "01:00 PM", item: "Inaugural Dhol Beat Procession & Welcome Act" },
      { time: "01:45 PM", item: "Street Play (Nukkad Natak) at Arts Circle" },
      { time: "04:30 PM", item: "Stage Drama Showcase in Main Auditorium" },
      { time: "06:45 PM", item: "Best Actor, Script, & Ensemble Honors" }
    ],
    prizes: [
      "🎭 Best Production Trophy & ₹30,000 Cash Award",
      "🥁 Best Street Play Ensemble: ₹20,000",
      "⭐ Best Actor (Male & Female) & Best Script Awards"
    ],
    eligibility: "Open to all students, faculties, and theatre enthusiasts.",
    rules: [
      "Maximum performance time: 20 minutes for Street Play, 35 minutes for Stage Drama.",
      "Props and percussion must be coordinated prior to slot."
    ],
    contact: {
      coordinator: "Gauri Deshmukh (Drama Secretary)",
      email: "rangmanch.fest@college.edu",
      phone: "+91 99012 34567"
    }
  }
];

const LIVE_CAMPUS_ACTIVITIES = [
  "🎉 Priya Sharma (CS-3rd Yr) registered for HACK-CAMPUS 2026!",
  "⚡ Only 4 seats left for Gen-AI Masterclass!",
  "🎸 Dhwani Band confirmed slot for Battle of Bands!",
  "🚀 Team 'NeuralForge' registered for Campus Shark Tank!",
  "🔥 18 students registered in the last 20 minutes!",
  "🎮 Team 'Phoenix Clutch' signed up for Valorant Championship!"
];
