/**
 * Campus Event Hub - Main Application Engine
 * Handles State, LocalStorage, Modals, Multi-step Form Wizard, QR Code Generation, Sound Effects, and ICS Exports.
 */

const App = (() => {
  // Application State
  const state = {
    events: [],
    registrations: [],
    bookmarks: [],
    activeCategory: "all",
    searchQuery: "",
    priceFilter: "all",
    sortOrder: "date-asc",
    onlyBookmarks: false,
    currentView: "grid", // 'grid' | 'timeline'
    soundEnabled: true,
    darkMode: true,
    wizardStep: 1,
    activeRegistrationEvent: null,
    activeDetailEvent: null,
  };

  // Audio Synthesizer (Zero external dependencies)
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playClick() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {
        // silent fallback
      }
    },
    playSuccess() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = "triangle";
        osc2.type = "sine";

        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc1.frequency.setValueAtTime(1046.5, now + 0.3); // C6

        osc2.frequency.setValueAtTime(261.63, now); // C4
        osc2.frequency.setValueAtTime(329.63, now + 0.1);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
      } catch (e) {
        // silent fallback
      }
    }
  };

  // LocalStorage Helpers
  function loadLocalData() {
    try {
      const storedEvents = localStorage.getItem("campus_events_list");
      state.events = storedEvents ? JSON.parse(storedEvents) : [...INITIAL_EVENTS];

      const storedRegs = localStorage.getItem("campus_user_registrations");
      state.registrations = storedRegs ? JSON.parse(storedRegs) : [];

      const storedBookmarks = localStorage.getItem("campus_user_bookmarks");
      state.bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

      const storedTheme = localStorage.getItem("campus_theme_pref");
      if (storedTheme === "light") {
        setTheme(false);
      }
    } catch (e) {
      state.events = [...INITIAL_EVENTS];
      state.registrations = [];
      state.bookmarks = [];
    }
  }

  function saveLocalEvents() {
    localStorage.setItem("campus_events_list", JSON.stringify(state.events));
  }

  function saveLocalRegistrations() {
    localStorage.setItem("campus_user_registrations", JSON.stringify(state.registrations));
  }

  function saveLocalBookmarks() {
    localStorage.setItem("campus_user_bookmarks", JSON.stringify(state.bookmarks));
  }

  // Toast Notification System
  function showToast(title, message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `p-3.5 rounded-2xl glass-panel border shadow-2xl flex items-start gap-3 pointer-events-auto transform transition-all duration-300 translate-y-3 opacity-0 max-w-sm ${
      type === "success" 
        ? "border-emerald-500/40 text-emerald-200 bg-slate-900/95" 
        : type === "warning" 
        ? "border-amber-500/40 text-amber-200 bg-slate-900/95" 
        : "border-brand-500/40 text-brand-200 bg-slate-900/95"
    }`;

    const icon = type === "success" ? "check-circle-2" : type === "warning" ? "alert-circle" : "sparkles";

    toast.innerHTML = `
      <div class="p-1 rounded-lg ${type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-500/20 text-brand-400'} shrink-0 mt-0.5">
        <i data-lucide="${icon}" class="w-4 h-4"></i>
      </div>
      <div class="flex-1 pr-2">
        <div class="text-xs font-bold text-white">${title}</div>
        <div class="text-[11px] text-slate-300 mt-0.5 leading-snug">${message}</div>
      </div>
      <button class="text-slate-400 hover:text-white" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove("translate-y-3", "opacity-0");
    }, 20);

    setTimeout(() => {
      toast.classList.add("translate-y-3", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // Confetti Explosion
  function fireConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"]
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#6366f1", "#10b981"]
        });
      }, 150);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#f59e0b", "#ec4899"]
        });
      }, 250);
    }
  }

  // Theme Toggler
  function setTheme(dark) {
    state.darkMode = dark;
    const html = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");

    if (dark) {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("campus_theme_pref", "dark");
      if (themeIcon) themeIcon.setAttribute("data-lucide", "sun");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("campus_theme_pref", "light");
      if (themeIcon) themeIcon.setAttribute("data-lucide", "moon");
    }
    if (window.lucide) lucide.createIcons();
  }

  // Filter & Search Logic
  function getFilteredEvents() {
    let result = [...state.events];

    // Category
    if (state.activeCategory !== "all") {
      result = result.filter(ev => ev.category === state.activeCategory);
    }

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(ev => 
        ev.title.toLowerCase().includes(q) ||
        ev.club.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        (ev.tags && ev.tags.some(t => t.toLowerCase().includes(q))) ||
        (ev.tagline && ev.tagline.toLowerCase().includes(q))
      );
    }

    // Price
    if (state.priceFilter === "free") {
      result = result.filter(ev => ev.isFree);
    } else if (state.priceFilter === "paid") {
      result = result.filter(ev => !ev.isFree);
    }

    // Bookmarks only
    if (state.onlyBookmarks) {
      result = result.filter(ev => state.bookmarks.includes(ev.id));
    }

    // Sorting
    if (state.sortOrder === "date-asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (state.sortOrder === "popularity") {
      result.sort((a, b) => (b.registeredCount / b.maxSeats) - (a.registeredCount / a.maxSeats));
    } else if (state.sortOrder === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }

  // Render Category Counts
  function updateCategoryBadges() {
    const cats = ["tech", "cultural", "gaming", "sports", "workshop", "career"];
    const allCount = state.events.length;
    const catAllEl = document.getElementById("catCountAll");
    if (catAllEl) catAllEl.textContent = allCount;

    cats.forEach(cat => {
      const count = state.events.filter(e => e.category === cat).length;
      const el = document.getElementById(`catCount${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
      if (el) el.textContent = count;
    });

    const statCountEl = document.getElementById("statEventsCount");
    if (statCountEl) statCountEl.textContent = allCount;

    const bCountEl = document.getElementById("bookmarkCountBadge");
    if (bCountEl) bCountEl.textContent = state.bookmarks.length;

    const wCountEl = document.getElementById("walletCountBadge");
    if (wCountEl) wCountEl.textContent = state.registrations.length;
  }

  // Render Events in Grid
  function renderEventsGrid() {
    const container = document.getElementById("eventsGridContainer");
    const emptyState = document.getElementById("emptySearchState");
    if (!container) return;

    const filtered = getFilteredEvents();

    if (filtered.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    } else {
      emptyState.classList.add("hidden");
    }

    container.innerHTML = filtered.map(ev => {
      const isRegistered = state.registrations.some(r => r.eventId === ev.id);
      const isBookmarked = state.bookmarks.includes(ev.id);
      const spotsLeft = Math.max(0, ev.maxSeats - ev.registeredCount);
      const fillPercent = Math.min(100, Math.round((ev.registeredCount / ev.maxSeats) * 100));

      const isUrgent = spotsLeft < 20;

      return `
        <div class="event-card glass-panel rounded-3xl overflow-hidden border border-slate-800/80 flex flex-col justify-between group">
          
          <!-- Event Image Cover with Overlays -->
          <div class="relative h-48 overflow-hidden bg-slate-900 cursor-pointer" onclick="App.openEventDetailsModal('${ev.id}')">
            <img 
              src="${ev.image}" 
              alt="${ev.title}" 
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            <!-- Category & Free Badges -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${ev.categoryBadgeColor || 'bg-brand-500/20 text-brand-300'} border backdrop-blur-md">
                ${ev.categoryLabel || ev.category}
              </span>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-semibold ${ev.isFree ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'} border backdrop-blur-md">
                ${ev.fee}
              </span>
            </div>

            <!-- Bookmark Button -->
            <button 
              onclick="event.stopPropagation(); App.toggleBookmark('${ev.id}')" 
              class="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-rose-400 border border-white/10 backdrop-blur-md transition-all active:scale-90"
              title="${isBookmarked ? 'Remove bookmark' : 'Bookmark event'}"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>

            <!-- Bottom Club Tag -->
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
              <span class="font-medium flex items-center gap-1.5 truncate">
                <span>${ev.clubLogo || '🏛️'}</span>
                <span class="truncate">${ev.club}</span>
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 
                onclick="App.openEventDetailsModal('${ev.id}')"
                class="font-bold text-base text-white hover:text-brand-300 cursor-pointer transition-colors line-clamp-2 mb-2 leading-snug"
              >
                ${ev.title}
              </h3>
              <p class="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                ${ev.tagline || ev.description}
              </p>

              <!-- Date & Venue Pills -->
              <div class="space-y-1.5 text-xs text-slate-300 mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-brand-400 shrink-0"></i>
                  <span class="truncate">${ev.displayDate || ev.date}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
                  <span class="truncate">${ev.time}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
                  <span class="truncate">${ev.venue}</span>
                </div>
              </div>
            </div>

            <!-- Capacity Progress Bar & Status -->
            <div class="pt-3 border-t border-slate-800/80">
              <div class="flex items-center justify-between text-[11px] mb-1.5">
                <span class="text-slate-400 font-medium">Capacity</span>
                <span class="font-bold ${isUrgent ? 'text-rose-400' : 'text-emerald-400'}">
                  ${spotsLeft > 0 ? `${spotsLeft} seats left` : 'Housefull'}
                </span>
              </div>
              <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  class="h-full rounded-full transition-all duration-500 ${isUrgent ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-brand-500 to-emerald-400'}"
                  style="width: ${fillPercent}%"
                ></div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <button 
                  onclick="App.openEventDetailsModal('${ev.id}')"
                  class="w-full py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <i data-lucide="info" class="w-3.5 h-3.5"></i>
                  <span>Quick View</span>
                </button>

                ${
                  isRegistered
                    ? `
                      <button 
                        onclick="App.viewTicketByEventId('${ev.id}')"
                        class="w-full py-2 px-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
                        <span>Pass Ready</span>
                      </button>
                    `
                    : `
                      <button 
                        onclick="App.openRegistrationModal('${ev.id}')"
                        class="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20 hover:shadow-brand-500/40 transition-all active:scale-95"
                      >
                        <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
                        <span>Register</span>
                      </button>
                    `
                }
              </div>
            </div>

          </div>

        </div>
      `;
    }).join("");

    if (window.lucide) lucide.createIcons();
  }

  // Render Timeline View
  function renderTimelineView() {
    const listContainer = document.getElementById("timelineEventsList");
    if (!listContainer) return;

    const sortedEvents = [...state.events].sort((a, b) => new Date(a.date) - new Date(b.date));

    listContainer.innerHTML = sortedEvents.map(ev => {
      const isRegistered = state.registrations.some(r => r.eventId === ev.id);
      return `
        <div class="relative group">
          <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-slate-900 flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-brand-400 font-mono-code">${ev.displayDate || ev.date}</span>
                <span class="text-slate-600">•</span>
                <span class="text-xs text-slate-400">${ev.time}</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded uppercase ${ev.categoryBadgeColor || 'bg-slate-800 text-slate-300'}">
                ${ev.categoryLabel || ev.category}
              </span>
            </div>
            <h4 class="text-base font-bold text-white hover:text-brand-300 cursor-pointer" onclick="App.openEventDetailsModal('${ev.id}')">
              ${ev.title}
            </h4>
            <p class="text-xs text-slate-400 mt-1 line-clamp-1">${ev.tagline || ev.description}</p>
            <div class="mt-3 flex items-center justify-between gap-4 pt-2 border-t border-slate-800/60 text-xs">
              <div class="text-slate-400 flex items-center gap-1.5">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-400"></i>
                <span>${ev.venue}</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="App.openEventDetailsModal('${ev.id}')" class="text-xs text-brand-400 hover:underline">
                  Details
                </button>
                ${
                  isRegistered
                    ? `<span class="text-emerald-400 font-bold text-[11px]">✓ Registered</span>`
                    : `<button onclick="App.openRegistrationModal('${ev.id}')" class="px-3 py-1 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500">Register</button>`
                }
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) lucide.createIcons();
  }

  // Bookmarking Toggle
  function toggleBookmark(eventId) {
    AudioEngine.playClick();
    if (state.bookmarks.includes(eventId)) {
      state.bookmarks = state.bookmarks.filter(id => id !== eventId);
      showToast("Removed", "Event removed from favorites", "info");
    } else {
      state.bookmarks.push(eventId);
      showToast("Saved!", "Event added to your favorites ❤️", "success");
    }
    saveLocalBookmarks();
    updateCategoryBadges();
    renderEventsGrid();
  }

  // Registration Form Wizard
  function openRegistrationModal(eventId) {
    AudioEngine.playClick();
    const ev = state.events.find(e => e.id === eventId);
    if (!ev) return;

    state.activeRegistrationEvent = ev;
    state.wizardStep = 1;

    document.getElementById("regEventId").value = ev.id;
    document.getElementById("regEventTitle").textContent = ev.title;
    document.getElementById("regEventDate").textContent = ev.displayDate || ev.date;
    document.getElementById("regEventVenue").textContent = ev.venue;

    updateWizardStepUI();
    document.getElementById("registrationModal").classList.remove("hidden");
  }

  function closeRegistrationModal() {
    AudioEngine.playClick();
    document.getElementById("registrationModal").classList.add("hidden");
    state.activeRegistrationEvent = null;
  }

  function updateWizardStepUI() {
    const s1 = document.getElementById("formStep1");
    const s2 = document.getElementById("formStep2");
    const s3 = document.getElementById("formStep3");

    const i1 = document.getElementById("step1Indicator");
    const i2 = document.getElementById("step2Indicator");
    const i3 = document.getElementById("step3Indicator");

    const prevBtn = document.getElementById("prevStepBtn");
    const nextBtn = document.getElementById("nextStepBtn");
    const submitBtn = document.getElementById("submitRegBtn");

    s1.classList.add("hidden");
    s2.classList.add("hidden");
    s3.classList.add("hidden");

    i1.className = "flex items-center gap-2 text-slate-500";
    i2.className = "flex items-center gap-2 text-slate-500";
    i3.className = "flex items-center gap-2 text-slate-500";

    if (state.wizardStep === 1) {
      s1.classList.remove("hidden");
      i1.className = "flex items-center gap-2 text-brand-400 font-bold";
      prevBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      nextBtn.textContent = "Continue to Preferences →";
      submitBtn.classList.add("hidden");
    } else if (state.wizardStep === 2) {
      s2.classList.remove("hidden");
      i1.className = "flex items-center gap-2 text-emerald-400 font-semibold";
      i2.className = "flex items-center gap-2 text-brand-400 font-bold";
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
      nextBtn.textContent = "Review & Finalize →";
      submitBtn.classList.add("hidden");
    } else if (state.wizardStep === 3) {
      s3.classList.remove("hidden");
      i1.className = "flex items-center gap-2 text-emerald-400 font-semibold";
      i2.className = "flex items-center gap-2 text-emerald-400 font-semibold";
      i3.className = "flex items-center gap-2 text-brand-400 font-bold";
      prevBtn.classList.remove("hidden");
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");

      // Populate review summary
      const ev = state.activeRegistrationEvent;
      const studentName = document.getElementById("studentName").value;
      const studentRoll = document.getElementById("studentRoll").value;

      document.getElementById("summaryEventName").textContent = ev ? ev.title : "";
      document.getElementById("summaryStudentName").textContent = studentName;
      document.getElementById("summaryStudentRoll").textContent = studentRoll;
    }
  }

  function stepNextWizard() {
    AudioEngine.playClick();
    if (state.wizardStep === 1) {
      const name = document.getElementById("studentName").value.trim();
      const roll = document.getElementById("studentRoll").value.trim();
      const email = document.getElementById("studentEmail").value.trim();

      if (!name || !roll || !email) {
        showToast("Missing Fields", "Please complete all required student details", "warning");
        return;
      }
      state.wizardStep = 2;
    } else if (state.wizardStep === 2) {
      state.wizardStep = 3;
    }
    updateWizardStepUI();
  }

  function stepBackWizard() {
    AudioEngine.playClick();
    if (state.wizardStep > 1) {
      state.wizardStep--;
      updateWizardStepUI();
    }
  }

  function toggleTeamInput(isTeam) {
    AudioEngine.playClick();
    const box = document.getElementById("teamDetailsBox");
    if (isTeam) {
      box.classList.remove("hidden");
    } else {
      box.classList.add("hidden");
    }
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();
    const accept = document.getElementById("acceptRulesCheck").checked;
    if (!accept) {
      showToast("Agreement Required", "Please accept the code of conduct to proceed.", "warning");
      return;
    }

    const ev = state.activeRegistrationEvent;
    if (!ev) return;

    // Check if already registered
    const existingIndex = state.registrations.findIndex(r => r.eventId === ev.id);
    if (existingIndex !== -1) {
      showToast("Already Registered", "You already have a pass for this event!", "info");
      closeRegistrationModal();
      openTicketModal(state.registrations[existingIndex]);
      return;
    }

    const passId = "CEH-" + Math.floor(100000 + Math.random() * 900000);
    const regData = {
      id: passId,
      eventId: ev.id,
      eventTitle: ev.title,
      eventDate: ev.displayDate || ev.date,
      eventTime: ev.time,
      eventVenue: ev.venue,
      club: ev.club,
      studentName: document.getElementById("studentName").value.trim(),
      studentRoll: document.getElementById("studentRoll").value.trim().toUpperCase(),
      studentEmail: document.getElementById("studentEmail").value.trim(),
      dept: document.getElementById("studentDept").value,
      year: document.getElementById("studentYear").value,
      participationType: document.querySelector('input[name="participationType"]:checked').value,
      teamName: document.getElementById("teamName").value.trim(),
      teammates: document.getElementById("teammateDetails").value.trim(),
      tshirtSize: document.getElementById("tshirtSize").value,
      dietaryPref: document.getElementById("dietaryPref").value,
      registeredAt: new Date().toISOString(),
      gate: "Gate " + (Math.floor(Math.random() * 3) + 1) + " • Section " + String.fromCharCode(65 + Math.floor(Math.random() * 4))
    };

    // Increment count on event
    ev.registeredCount = (ev.registeredCount || 0) + 1;
    saveLocalEvents();

    state.registrations.unshift(regData);
    saveLocalRegistrations();
    updateCategoryBadges();
    renderEventsGrid();

    // Close registration modal & open ticket
    closeRegistrationModal();
    fireConfetti();
    AudioEngine.playSuccess();
    showToast("Registration Confirmed! 🎉", `Your digital pass ${passId} has been generated.`, "success");

    openTicketModal(regData);
  }

  // Ticket Modal & QR Code Generation
  let qrCodeInstance = null;

  function openTicketModal(regData) {
    const modal = document.getElementById("ticketModal");
    if (!modal) return;

    document.getElementById("ticketEventTitle").textContent = regData.eventTitle;
    document.getElementById("ticketClubOrganizer").textContent = "Organized by " + regData.club;
    document.getElementById("ticketPassId").textContent = regData.id;
    document.getElementById("ticketEventDate").textContent = regData.eventDate;
    document.getElementById("ticketEventTime").textContent = regData.eventTime;
    document.getElementById("ticketEventVenue").textContent = regData.eventVenue;
    document.getElementById("ticketAttendeeName").textContent = regData.studentName;
    document.getElementById("ticketAttendeeRoll").textContent = "#" + regData.studentRoll;
    document.getElementById("ticketGateNumber").textContent = regData.gate || "Gate 1 • Row B";

    const teamBadge = document.getElementById("ticketTeamBadge");
    if (regData.participationType === "team" && regData.teamName) {
      teamBadge.textContent = "Team: " + regData.teamName;
    } else {
      teamBadge.textContent = "Solo Attendee Pass";
    }

    // Render Dynamic QR Code
    const qrContainer = document.getElementById("ticketQRCode");
    qrContainer.innerHTML = "";

    const qrPayload = JSON.stringify({
      passId: regData.id,
      event: regData.eventTitle,
      student: regData.studentName,
      roll: regData.studentRoll,
      status: "AUTHENTICATED"
    });

    if (typeof QRCode !== "undefined") {
      qrCodeInstance = new QRCode(qrContainer, {
        text: qrPayload,
        width: 110,
        height: 110,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      qrContainer.innerHTML = `<div class="p-2 text-[10px] text-slate-800 font-mono-code">${regData.id}</div>`;
    }

    modal.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  function closeTicketModal() {
    AudioEngine.playClick();
    document.getElementById("ticketModal").classList.add("hidden");
  }

  function viewTicketByEventId(eventId) {
    const reg = state.registrations.find(r => r.eventId === eventId);
    if (reg) {
      openTicketModal(reg);
    }
  }

  // Event Details Modal
  function openEventDetailsModal(eventId) {
    AudioEngine.playClick();
    const ev = state.events.find(e => e.id === eventId);
    if (!ev) return;

    state.activeDetailEvent = ev;

    document.getElementById("detailHeroImage").src = ev.image;
    document.getElementById("detailTitle").textContent = ev.title;
    document.getElementById("detailTagline").textContent = ev.tagline || "";
    document.getElementById("detailDate").textContent = ev.displayDate || ev.date;
    document.getElementById("detailTime").textContent = ev.time;
    document.getElementById("detailVenue").textContent = ev.venue;
    
    const spotsLeft = Math.max(0, ev.maxSeats - ev.registeredCount);
    document.getElementById("detailSeats").textContent = `${spotsLeft} / ${ev.maxSeats} Left`;

    const catBadge = document.getElementById("detailCategoryBadge");
    catBadge.textContent = ev.categoryLabel || ev.category;
    catBadge.className = `inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${ev.categoryBadgeColor || 'bg-brand-500/20 text-brand-300'}`;

    document.getElementById("detailDescription").textContent = ev.description;

    // Tags
    const tagsContainer = document.getElementById("detailTagsList");
    tagsContainer.innerHTML = (ev.tags || []).map(t => 
      `<span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700/60">#${t}</span>`
    ).join("");

    // Schedule
    const schedContainer = document.getElementById("detailScheduleList");
    if (ev.schedule && ev.schedule.length > 0) {
      schedContainer.innerHTML = ev.schedule.map(s => `
        <div class="relative pl-3">
          <div class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-400"></div>
          <span class="font-bold text-brand-300 font-mono-code">${s.time}:</span>
          <span class="text-slate-300 ml-1">${s.item}</span>
        </div>
      `).join("");
    } else {
      schedContainer.innerHTML = `<p class="text-slate-400">Schedule to be announced by ${ev.club}.</p>`;
    }

    // Prizes
    const prizesContainer = document.getElementById("detailPrizesList");
    if (ev.prizes && ev.prizes.length > 0) {
      prizesContainer.innerHTML = ev.prizes.map(p => `
        <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2">
          <i data-lucide="award" class="w-4 h-4 text-amber-400 shrink-0"></i>
          <span class="font-medium text-slate-200">${p}</span>
        </div>
      `).join("");
    } else {
      prizesContainer.innerHTML = `<p class="text-slate-400">Participation certificates & goodies for all attendees.</p>`;
    }

    // Rules & Eligibility
    document.getElementById("detailEligibility").textContent = ev.eligibility || "Open to all enrolled university students.";
    const rulesList = document.getElementById("detailRulesList");
    if (ev.rules && ev.rules.length > 0) {
      rulesList.innerHTML = ev.rules.map(r => `<li>${r}</li>`).join("");
    } else {
      rulesList.innerHTML = `<li>Standard university campus conduct applies.</li>`;
    }

    // Contact
    const contact = ev.contact || {};
    document.getElementById("detailContactInfo").textContent = `${contact.coordinator || ev.club} • ${contact.email || 'events@college.edu'} • ${contact.phone || '+91 98765 43210'}`;

    // Bookmark icon state
    updateDetailBookmarkIcon();

    // Check if registered
    const isReg = state.registrations.some(r => r.eventId === ev.id);
    const regBtn = document.getElementById("detailRegisterBtn");
    if (isReg) {
      regBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>View Pass</span>`;
      regBtn.className = "px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2";
    } else {
      regBtn.innerHTML = `<i data-lucide="ticket" class="w-4 h-4"></i><span>Register Now</span>`;
      regBtn.className = "px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/20 active:scale-95 flex items-center gap-2";
    }

    switchDetailTab('about');
    document.getElementById("detailsModal").classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  function closeDetailsModal() {
    AudioEngine.playClick();
    document.getElementById("detailsModal").classList.add("hidden");
    state.activeDetailEvent = null;
  }

  function switchDetailTab(tabName) {
    AudioEngine.playClick();
    const tabs = ["about", "schedule", "prizes", "rules"];
    tabs.forEach(t => {
      const content = document.getElementById(`tabContent${t.charAt(0).toUpperCase() + t.slice(1)}`);
      const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
      if (t === tabName) {
        content.classList.remove("hidden");
        btn.className = "pb-3 border-b-2 border-brand-500 text-brand-400 font-bold";
      } else {
        content.classList.add("hidden");
        btn.className = "pb-3 border-b-2 border-transparent text-slate-400 hover:text-white";
      }
    });
    if (window.lucide) lucide.createIcons();
  }

  function updateDetailBookmarkIcon() {
    if (!state.activeDetailEvent) return;
    const isBookmarked = state.bookmarks.includes(state.activeDetailEvent.id);
    const icon = document.getElementById("detailBookmarkIcon");
    if (icon) {
      if (isBookmarked) {
        icon.className = "w-4 h-4 fill-rose-500 text-rose-500";
      } else {
        icon.className = "w-4 h-4 text-slate-300";
      }
    }
  }

  function toggleDetailBookmark() {
    if (!state.activeDetailEvent) return;
    toggleBookmark(state.activeDetailEvent.id);
    updateDetailBookmarkIcon();
  }

  function proceedToRegisterFromModal() {
    if (!state.activeDetailEvent) return;
    const evId = state.activeDetailEvent.id;
    const isReg = state.registrations.some(r => r.eventId === evId);
    closeDetailsModal();
    if (isReg) {
      viewTicketByEventId(evId);
    } else {
      openRegistrationModal(evId);
    }
  }

  // Pass Wallet Modal
  function openWalletModal() {
    AudioEngine.playClick();
    const modal = document.getElementById("walletModal");
    const container = document.getElementById("walletItemsList");
    const emptyState = document.getElementById("emptyWalletState");

    if (state.registrations.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
      container.innerHTML = state.registrations.map(r => `
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="qr-code" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-white">${r.eventTitle}</span>
                <span class="px-2 py-0.2 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300">CONFIRMED</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${r.eventDate} • ${r.eventVenue}</p>
              <div class="text-[10px] font-mono-code text-brand-300 mt-1">Pass ID: ${r.id} • ${r.participationType === 'team' ? 'Team: ' + r.teamName : 'Solo'}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button 
              onclick="App.viewTicketByEventId('${r.eventId}')"
              class="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>View Pass</span>
            </button>
            <button 
              onclick="App.cancelRegistration('${r.id}')"
              class="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
              title="Cancel Registration"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `).join("");
    }

    modal.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  function closeWalletModal() {
    AudioEngine.playClick();
    document.getElementById("walletModal").classList.add("hidden");
  }

  function cancelRegistration(passId) {
    if (!confirm("Are you sure you want to cancel this registration? Your spot will be released.")) return;

    AudioEngine.playClick();
    const index = state.registrations.findIndex(r => r.id === passId);
    if (index !== -1) {
      const reg = state.registrations[index];
      const ev = state.events.find(e => e.id === reg.eventId);
      if (ev && ev.registeredCount > 0) {
        ev.registeredCount--;
        saveLocalEvents();
      }
      state.registrations.splice(index, 1);
      saveLocalRegistrations();
      updateCategoryBadges();
      renderEventsGrid();
      openWalletModal(); // refresh
      showToast("Cancelled", "Registration pass cancelled successfully.", "info");
    }
  }

  // Host Event Modal (Organizer Mode)
  function openHostEventModal() {
    AudioEngine.playClick();
    const modal = document.getElementById("hostEventModal");
    modal.classList.remove("hidden");
  }

  function closeHostEventModal() {
    AudioEngine.playClick();
    document.getElementById("hostEventModal").classList.add("hidden");
  }

  function handleHostEventSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("newEventTitle").value.trim();
    const category = document.getElementById("newEventCategory").value;
    const club = document.getElementById("newEventClub").value.trim();
    const date = document.getElementById("newEventDate").value;
    const time = document.getElementById("newEventTime").value.trim();
    const venue = document.getElementById("newEventVenue").value.trim();
    const maxSeats = parseInt(document.getElementById("newEventMaxSeats").value) || 100;
    const description = document.getElementById("newEventDescription").value.trim();

    const catBadgeColors = {
      tech: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      cultural: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      gaming: "bg-red-500/10 text-red-400 border-red-500/20",
      sports: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      workshop: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      career: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    };

    const newEvent = {
      id: "ev-" + Date.now(),
      title,
      tagline: description.slice(0, 90) + "...",
      category,
      categoryLabel: category.toUpperCase(),
      categoryBadgeColor: catBadgeColors[category] || "bg-brand-500/10 text-brand-400 border-brand-500/20",
      club,
      clubLogo: "🌟",
      date,
      displayDate: new Date(date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      time,
      venue,
      maxSeats,
      registeredCount: 1,
      fee: "Free Entry",
      isFree: true,
      isFeatured: false,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      tags: [category.toUpperCase(), "Campus2026", "StudentActivity"],
      description,
      schedule: [
        { time: time, item: "Opening & Welcome Note" },
        { time: "Subsequent Sessions", item: "Core event activity and interactive rounds" }
      ],
      prizes: [
        "Certificate of Participation & campus recognition"
      ],
      eligibility: "Open to all enrolled students.",
      rules: ["College ID mandatory for entry."],
      contact: {
        coordinator: club + " Executive Team",
        email: "events." + club.toLowerCase().replace(/\s+/g, '') + "@college.edu",
        phone: "+91 99999 88888"
      }
    };

    state.events.unshift(newEvent);
    saveLocalEvents();
    updateCategoryBadges();
    renderEventsGrid();

    closeHostEventModal();
    fireConfetti();
    AudioEngine.playSuccess();
    showToast("Event Published! 🚀", `"${title}" is now live on the Campus Event Hub.`, "success");
  }

  // Calendar .ICS Export Generator
  function generateICSContent(eventObj) {
    const cleanDate = (eventObj.date || "2026-11-06").replace(/-/g, "");
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Campus Event Hub//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${eventObj.id}-${Date.now()}@campuseventhub.edu`,
      `DTSTAMP:${cleanDate}T090000Z`,
      `DTSTART:${cleanDate}T090000Z`,
      `DTEND:${cleanDate}T180000Z`,
      `SUMMARY:${eventObj.title}`,
      `DESCRIPTION:${eventObj.tagline || eventObj.description || 'Campus Event'}`,
      `LOCATION:${eventObj.venue}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadICSFile(filename, content) {
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Calendar Downloaded", "ICS file generated and downloaded.", "success");
  }

  function exportTicketToCalendar() {
    AudioEngine.playClick();
    const passId = document.getElementById("ticketPassId").textContent;
    const reg = state.registrations.find(r => r.id === passId);
    if (!reg) return;
    const ev = state.events.find(e => e.id === reg.eventId) || reg;
    const ics = generateICSContent(ev);
    downloadICSFile(`${ev.title.slice(0, 20).replace(/\s+/g, '_')}_pass.ics`, ics);
  }

  function downloadDetailIcs() {
    AudioEngine.playClick();
    if (!state.activeDetailEvent) return;
    const ics = generateICSContent(state.activeDetailEvent);
    downloadICSFile(`${state.activeDetailEvent.title.slice(0, 20).replace(/\s+/g, '_')}.ics`, ics);
  }

  function exportAllEventsToCalendar() {
    AudioEngine.playClick();
    const icsArr = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Campus Event Hub All//EN"
    ];
    state.events.forEach(ev => {
      const cleanDate = (ev.date || "2026-11-06").replace(/-/g, "");
      icsArr.push("BEGIN:VEVENT");
      icsArr.push(`UID:${ev.id}@campuseventhub.edu`);
      icsArr.push(`DTSTART:${cleanDate}T090000Z`);
      icsArr.push(`SUMMARY:${ev.title}`);
      icsArr.push(`LOCATION:${ev.venue}`);
      icsArr.push("END:VEVENT");
    });
    icsArr.push("END:VCALENDAR");
    downloadICSFile("Campus_Master_Schedule_2026.ics", icsArr.join("\r\n"));
  }

  // Live Countdown Timer
  function initLiveCountdown() {
    // Flagship event date: Nov 6, 2026 09:00 AM
    const targetDate = new Date("2026-11-06T09:00:00").getTime();

    function updateTimer() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = document.getElementById("countdownDays");
        const hEl = document.getElementById("countdownHours");
        const mEl = document.getElementById("countdownMins");
        const sEl = document.getElementById("countdownSecs");

        if (dEl) dEl.textContent = String(days).padStart(2, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(mins).padStart(2, '0');
        if (sEl) sEl.textContent = String(secs).padStart(2, '0');
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // Live Ticker Simulation
  function initLiveTicker() {
    const tickerText = document.getElementById("liveTickerText");
    const timeDisplay = document.getElementById("currentTimeDisplay");
    let index = 0;

    setInterval(() => {
      if (tickerText && typeof LIVE_CAMPUS_ACTIVITIES !== "undefined") {
        tickerText.style.opacity = 0;
        setTimeout(() => {
          index = (index + 1) % LIVE_CAMPUS_ACTIVITIES.length;
          tickerText.textContent = LIVE_CAMPUS_ACTIVITIES[index];
          tickerText.style.opacity = 1;
        }, 300);
      }
    }, 4500);

    function updateClock() {
      if (timeDisplay) {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    updateClock();
    setInterval(updateClock, 30000);
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Category pills
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        AudioEngine.playClick();
        pills.forEach(p => {
          p.classList.remove("active-pill", "bg-brand-600", "text-white", "shadow-md");
          p.classList.add("bg-slate-800/80", "text-slate-300");
        });
        pill.classList.remove("bg-slate-800/80", "text-slate-300");
        pill.classList.add("active-pill", "bg-brand-600", "text-white", "shadow-md");

        state.activeCategory = pill.dataset.category;
        renderEventsGrid();
      });
    });

    // Global Search
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderEventsGrid();
      });
    }

    // Ctrl + K shortcut
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
      if (e.key === "Escape") {
        closeRegistrationModal();
        closeTicketModal();
        closeDetailsModal();
        closeWalletModal();
        closeHostEventModal();
      }
    });

    // Pricing Filter
    const priceSelect = document.getElementById("pricingFilterSelect");
    if (priceSelect) {
      priceSelect.addEventListener("change", (e) => {
        AudioEngine.playClick();
        state.priceFilter = e.target.value;
        renderEventsGrid();
      });
    }

    // Sort order
    const sortSelect = document.getElementById("sortOrderSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        AudioEngine.playClick();
        state.sortOrder = e.target.value;
        renderEventsGrid();
      });
    }

    // Favorites Filter toggle
    const favBtn = document.getElementById("filterBookmarksBtn");
    if (favBtn) {
      favBtn.addEventListener("click", () => {
        AudioEngine.playClick();
        state.onlyBookmarks = !state.onlyBookmarks;
        if (state.onlyBookmarks) {
          favBtn.classList.remove("bg-slate-800/80", "text-slate-300");
          favBtn.classList.add("bg-rose-500/20", "text-rose-300", "border-rose-500/40");
        } else {
          favBtn.classList.add("bg-slate-800/80", "text-slate-300");
          favBtn.classList.remove("bg-rose-500/20", "text-rose-300", "border-rose-500/40");
        }
        renderEventsGrid();
      });
    }

    // View switcher (Grid vs Timeline)
    const gridBtn = document.getElementById("viewGridBtn");
    const timelineBtn = document.getElementById("viewTimelineBtn");
    const gridContainer = document.getElementById("eventsGridContainer");
    const timelineContainer = document.getElementById("eventsTimelineContainer");

    function setView(view) {
      AudioEngine.playClick();
      state.currentView = view;
      if (view === "grid") {
        gridContainer.classList.remove("hidden");
        timelineContainer.classList.add("hidden");
        gridBtn.className = "px-3 py-1 rounded-lg text-xs font-semibold bg-brand-600 text-white flex items-center gap-1.5 transition-all";
        timelineBtn.className = "px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all";
        renderEventsGrid();
      } else {
        gridContainer.classList.add("hidden");
        timelineContainer.classList.remove("hidden");
        timelineBtn.className = "px-3 py-1 rounded-lg text-xs font-semibold bg-brand-600 text-white flex items-center gap-1.5 transition-all";
        gridBtn.className = "px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all";
        renderTimelineView();
      }
    }

    if (gridBtn) gridBtn.addEventListener("click", () => setView("grid"));
    if (timelineBtn) timelineBtn.addEventListener("click", () => setView("timeline"));

    const navExplore = document.getElementById("navExploreBtn");
    if (navExplore) navExplore.addEventListener("click", () => setView("grid"));

    const navSchedule = document.getElementById("navScheduleBtn");
    if (navSchedule) navSchedule.addEventListener("click", () => setView("timeline"));

    // Sound toggle
    const soundBtn = document.getElementById("toggleSoundBtn");
    const soundIcon = document.getElementById("soundIcon");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
          soundIcon.setAttribute("data-lucide", "volume-2");
          showToast("Sound On", "Micro-audio effects enabled.", "info");
        } else {
          soundIcon.setAttribute("data-lucide", "volume-x");
          showToast("Sound Muted", "Audio effects disabled.", "info");
        }
        if (window.lucide) lucide.createIcons();
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        setTheme(!state.darkMode);
      });
    }

    // Wallet Button
    const walletBtn = document.getElementById("openWalletBtn");
    if (walletBtn) walletBtn.addEventListener("click", openWalletModal);

    // Host Event Button
    const hostBtn = document.getElementById("openHostEventBtn");
    if (hostBtn) hostBtn.addEventListener("click", openHostEventModal);
  }

  function resetFilters() {
    AudioEngine.playClick();
    state.activeCategory = "all";
    state.searchQuery = "";
    state.priceFilter = "all";
    state.onlyBookmarks = false;

    const s = document.getElementById("globalSearchInput");
    if (s) s.value = "";

    const p = document.getElementById("pricingFilterSelect");
    if (p) p.value = "all";

    const pills = document.querySelectorAll(".category-pill");
    pills.forEach(pill => {
      if (pill.dataset.category === "all") {
        pill.classList.add("active-pill", "bg-brand-600", "text-white", "shadow-md");
        pill.classList.remove("bg-slate-800/80", "text-slate-300");
      } else {
        pill.classList.remove("active-pill", "bg-brand-600", "text-white", "shadow-md");
        pill.classList.add("bg-slate-800/80", "text-slate-300");
      }
    });

    renderEventsGrid();
    showToast("Filters Reset", "Showing all campus events", "info");
  }

  // Public Interface
  return {
    init() {
      loadLocalData();
      setupEventListeners();
      updateCategoryBadges();
      renderEventsGrid();
      initLiveCountdown();
      initLiveTicker();

      if (window.lucide) lucide.createIcons();
    },
    openRegistrationModal,
    closeRegistrationModal,
    stepNextWizard,
    stepBackWizard,
    toggleTeamInput,
    handleRegistrationSubmit,
    openTicketModal,
    closeTicketModal,
    viewTicketByEventId,
    openEventDetailsModal,
    closeDetailsModal,
    switchDetailTab,
    toggleDetailBookmark,
    proceedToRegisterFromModal,
    toggleBookmark,
    openWalletModal,
    closeWalletModal,
    cancelRegistration,
    openHostEventModal,
    closeHostEventModal,
    handleHostEventSubmit,
    exportTicketToCalendar,
    downloadDetailIcs,
    exportAllEventsToCalendar,
    resetFilters
  };
})();

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
