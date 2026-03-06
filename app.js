/* Latest file as of 3.5.2026 at 5:45pm */

/***********************
 * CONFIG: CSV URLS
 ***********************/
const CSV = {
  masterTeamResults:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHJf5JjoRNkO4wkTzgq_Uf4Wcye3HOghJ3HePez8gfnaeASLGvHqrsECYRQGSVfANqcxqL59KgkmL/pub?gid=1987375919&single=true&output=csv",
  
  masterPlayerResults:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHJf5JjoRNkO4wkTzgq_Uf4Wcye3HOghJ3HePez8gfnaeASLGvHqrsECYRQGSVfANqcxqL59KgkmL/pub?gid=1256859448&single=true&output=csv",
  
  masterMatchLog:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHJf5JjoRNkO4wkTzgq_Uf4Wcye3HOghJ3HePez8gfnaeASLGvHqrsECYRQGSVfANqcxqL59KgkmL/pub?gid=0&single=true&output=csv",

  currentMatchLog:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7ur2CnLVDH6aYXW8aIRuYnRJ2276zgIeGiJGCJ3o4PRhuD4g8cHgAefZ-SHQwnWPm38K72eQOQ3yW/pub?gid=458254007&single=true&output=csv",
};

/***********************
 * Master CSV cache (load once)
 ***********************/
const masterCache = {
  teamResultsRaw: null,     // parsed rows from Master Team Results CSV
  playerResultsRaw: null,   // parsed rows from Master Player Results CSV
  matchLogRaw: null,        // parsed rows from Master Match Log CSV
};

async function getMasterTeamResultsRaw() {
  if (masterCache.teamResultsRaw) return masterCache.teamResultsRaw;

  const res = await fetch(CSV.masterTeamResults); // allow normal browser caching
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
    transform: (val) => (typeof val === "string" ? val.trim() : val),
  });

  if (parsed.errors?.length) {
    console.error(parsed.errors);
    throw new Error("CSV parse error");
  }

  masterCache.teamResultsRaw = parsed.data;
  return masterCache.teamResultsRaw;
}

async function getMasterPlayerResultsRaw() {
  if (masterCache.playerResultsRaw) return masterCache.playerResultsRaw;

  const res = await fetch(CSV.masterPlayerResults); // allow normal browser caching
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
    transform: (val) => (typeof val === "string" ? val.trim() : val),
  });

  if (parsed.errors?.length) {
    console.error(parsed.errors);
    throw new Error("CSV parse error");
  }

  masterCache.playerResultsRaw = parsed.data;
  return masterCache.playerResultsRaw;
}

async function getMasterMatchLogRaw() {
  if (masterCache.matchLogRaw) return masterCache.matchLogRaw;

  const res = await fetch(CSV.masterMatchLog); // allow normal browser caching
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
    transform: (val) => (typeof val === "string" ? val.trim() : val),
  });

  if (parsed.errors?.length) {
    console.error(parsed.errors);
    throw new Error("CSV parse error");
  }

  masterCache.matchLogRaw = parsed.data;
  return masterCache.matchLogRaw;
}

/***********************
 * IMAGES (static lists)
 ***********************/
const LOGO_FILES = [
  "Logo23 - 2025 - Sand Valley.jpg",
  "Logo22 - 2024 - St. George.jpg",
  "Logo21 - 2023 - Paynes Valley.jpg",
  "Logo20 - 2022 - Harbour Town Golf Links.jpg",
  "Logo19 - 2021 - Bandon Dunes.jpg",
  "Logo18 - 2019 - TPC San Antonio.jpg",
  "Logo17 - 2018 - Pebble Beach.jpg",
  "Logo16 - 2017 - Streamsong.jpg",
  "Logo15 - 2016 - Whistler.jpg",
  "Logo14 - 2015 - Pinehurst.jpg",
  "Logo13 - 2014 - Whistling Straits.jpg",
  "Logo12 - 2013 - Torrey Pines.jpg",
  "Logo11 - 2012 - Grande Dunes.jpg",
  "Logo10 - 2011 - Bandon Dunes.jpg",
  "Logo09 - 2010 - Pelican Hill.jpg",
  "Logo08 - 2009 - Bear Dance.jpg",
  "Logo07 - 2008 - Atunyote.jpg",
  "Logo06 - 2007 - Twin Warriors.jpg",
  "Logo05 - 2006 - Robert Trent Jones.jpg",
  "Logo04 - 2005 - Barton Creek.jpg",
  "Logo03 - 2004 - La Quinta Resort.jpg",
  "Logo02 - 2023 - Raven South Mountain.jpg",
  "Logo01 - 2002 - TPC Star Pass.jpg"
];

const COURSE_FILES = [
  "Course30 - 2025 - Sand Valley.jpg",
  "Course31 - 2025 - The Sandbox.jpg",
  "Course32 - 2025 - The Lido.jpg",
  "Course28 - 2024 - Sand Hollow.jpg",
  "Course29 - 2024 - Wolf Creek.jpg",
  "Course24 - 2023 - Paynes Valley.jpg",
  "Course25 - 2023 - Buffalo Ridge.jpg",
  "Course26 - 2023 - Ozark National.jpg",
  "Course27 - 2023 - Top of the Rock.jpg",
  "Course21 - 2022 - Harbour Town Golf Links.jpg",
  "Course22 - 2022 - Atlantic Dunes.jpg",
  "Course23 - 2022 - Heron Point.jpg",
  "Course16 - 2021 - Bandon Dunes.jpg",
  "Course17 - 2021 - Bandon Trails.jpg",
  "Course18 - 2021 - Old Macdonald.jpg",
  "Course19 - 2021 - Pacific Dunes.jpg",
  "Course20 - 2021 - Sheep Ranch.jpg",
  "Course12 - 2018 - Pebble Beach.jpg",
  "Course13 - 2018 - Poppy Hills.jpg",
  "Course14 - 2018 - Spyglass Hill.jpg",
  "Course15 - 2019 - TPC San Antonio.jpg",
  "Course11 - 2017 - Streamsong.jpg",
  "Course10 - 2016 - Whistler Big Sky.jpg",
  "Course09 - 2016 - Nicklaus North.jpg",
  "Course05 - 2015 - Pinehurst No 2.jpg",
  "Course06 - 2015 - Pinehurst No 4.jpg",
  "Course07 - 2015 - Pinehurst No 8.jpg",
  "Course08 - 2015 - Pinehurst No 9.jpg",
  "Course03 - 2014 - Whistling Straits.jpg",
  "Course04 - 2014 - Blackwolf Run.jpg",
  "Course01 - 2013 - Torrey Pines.jpg",
  "Course02 - 2013 - Aviara.jpg"
];

/***********************
 * DOM
 ***********************/
const viewTitleEl = document.getElementById("viewTitle");
const viewControlsEl = document.getElementById("viewControls");
const viewBodyEl = document.getElementById("viewBody");
const statusEl = document.getElementById("status");

const menuBtn = document.getElementById("menuBtn");
const refreshBtn = document.getElementById("refreshBtn");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const drawerNav = document.getElementById("drawerNav");

/***********************
 * ROUTER / NAV
 ***********************/
const VIEWS = [
  { id: "team-results", title: "Team Results by Year" },
  { id: "player-results", title: "Team Results by Player" },
  { id: "tournament-view", title: "Historical Scoreboard" },
  { id: "current-scoreboard", title: "LIVE Scoreboard" },
  { id: "nemesis", title: "Head-to-Head" },
  { id: "player-match-history", title: "Player Match History" },
  { id: "logos-maps", title: "Logos and Course Maps" },
  { id: "ai-analysis", title: "AI Analysis and Predictions" },
  { id: "read-me", title: "Read Me" },
];

let currentRoute = "team-results";     // sets the default view

/***********************
 * Shared caches
 ***********************/
const cache = {
  matchLogLoaded: false,
  matchLogPromise: null,
  matchLogRows: [],
  teamByPlayerYear: new Map(), // from match log
  matchLogFull: {
    master: { loaded: false, promise: null, rows: [], byYear: new Map() },
    current: { loaded: false, promise: null, rows: [], byYear: new Map() },
  },
};

/***********************
 * Current Scoreboard refresh + polling
 ***********************/
let currentScoreboardPollTimer = null;

function stopCurrentScoreboardPolling() {
  if (currentScoreboardPollTimer) {
    clearInterval(currentScoreboardPollTimer);
    currentScoreboardPollTimer = null;
  }
}

function startCurrentScoreboardPolling() {
  stopCurrentScoreboardPolling();
  currentScoreboardPollTimer = setInterval(() => {
    // Only poll while user is actually on the Current Scoreboard view
    if (currentRoute === "current-scoreboard") {
      refreshCurrentScoreboard({ silent: true });
    }
  }, 30000); // 30 seconds
}

// ---------- replacement refreshCurrentScoreboard ----------
let _currentRefreshInFlight = false;

async function refreshCurrentScoreboard({ silent = false } = {}) {
  // Safety: ensure bucket exists
  if (!cache.matchLogFull || !cache.matchLogFull.current) return;
  const bucket = cache.matchLogFull.current;

  // Avoid concurrent refreshes
  if (_currentRefreshInFlight) return;
  _currentRefreshInFlight = true;

  // UI: show quick refresh status if not silent
  if (!silent) {
    setStatusHTML(`<div class="meta"><span>Refreshing current scoreboard…</span></div>`);
    if (refreshBtn) refreshBtn.disabled = true;
  }

  // Stop polling while we run manual refresh
  stopCurrentScoreboardPolling();

  try {
    // Build cache-busted URL to avoid CDN / intermediate caching
    const url = `${CSV.currentMatchLog}${CSV.currentMatchLog.includes('?') ? '&' : '?'}_=${Date.now()}`;

    // Always fetch fresh for current scoreboard
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (val) => (typeof val === "string" ? val.trim() : val),
    });

    if (parsed.errors?.length) {
      console.error("CSV parse errors:", parsed.errors);
      throw new Error("CSV parse error");
    }

    const rawRows = parsed.data;

    // Build rows exactly the same way ensureMatchLogFullLoaded("current") would
    const rows = rawRows
      .filter((r) => r.Year && r.Team && r.Player)
      .map((r) => ({
        year: Number(String(r.Year).trim()),
        trip: String(r.Trip || "").trim(),
        round: Number(String(r.Round || "").trim()),
        format: String(r.Format || "").trim(),
        course: String(r.Course || "").trim(),
        match: Number(String(r.Match || "").trim()),
        matchId: String(r.Match_ID || r.MatchId || "").trim(),
        player: String(r.Player || "").trim(),
        team: String(r.Team || "").trim(),
        strokes: String(r.Strokes ?? "").trim(),
        opponent: String(r.Opponent || "").trim(),
        result: String(r.Result || "").trim(),
        points: toNumber(r.Points),
        w: toNumber(r.W),
        l: toNumber(r.L),
        h: toNumber(r.H),
        ptsdiff: toNumber(r.Pts_Diff),
      }))
      .filter((r) => Number.isFinite(r.year));

    // Update bucket immediately so subsequent calls use fresh data
    bucket.rows = rows;
    bucket.byYear.clear();
    for (const r of bucket.rows) {
      if (!bucket.byYear.has(r.year)) bucket.byYear.set(r.year, []);
      bucket.byYear.get(r.year).push(r);
    }
    bucket.loaded = true;
    bucket.promise = null;

    // Clear expansions so UI re-renders cleanly (optional)
    if (state.csb && state.csb.expandedKeys) state.csb.expandedKeys.clear();

    // Re-render current scoreboard UI (this will use the freshly-updated bucket)
    renderScoreboard("current");
  } catch (err) {
    console.error("refreshCurrentScoreboard error:", err);
    if (!silent) setStatusHTML(`<div class="meta"><span>Refresh failed — try again.</span></div>`);
  } finally {
    _currentRefreshInFlight = false;
    if (refreshBtn) {
      refreshBtn.disabled = false;
    }
    // resume polling if still on the current view
    if (currentRoute === "current-scoreboard") startCurrentScoreboardPolling();
  }
}


/***********************
 * View state
 ***********************/
const state = {
  pmh: {
    allRows: [],
    currentFormat: "Both",
    selectedYear: "All",
    availableYears: [],
    expandedPlayers: new Set(),
    sort: { col: null, dir: null },
    defaultSort: { col: "pct", dir: "desc" },
  },

  pr: {
    rows: [],
    selectedYear: "All",
    availableYears: [],
    expandedPlayers: new Set(),
    sort: { col: null, dir: null },
    defaultSort: { col: "wins", dir: "desc" },
  },
 
  tr: {
    rows: [],                 // rows from Master Team Results
    expandedYears: new Set(), // years currently expanded
  },
 
  sb: {
    selectedYear: null,          // number
    availableYears: [],          // [2025, 2024, ...]
    expandedKeys: new Set(),     // round|format
  },

  csb: {
    selectedYear: null,
    availableYears: [],
    expandedKeys: new Set(),
  },

  h2h: {
    rows: [],
    selectedYear: "All",
    mode: "singles_opp",
    availableYears: [],
    expandedPlayers: new Set(),
    sort: { col: null, dir: null },
    defaultSort: { col: "ptsdiff", dir: "desc" },
  },

  lm: {
    mode: "logos", // "logos" or "courses"
    index: 0,
  },

  ai: {
    scenario: "Player Profile", // default per your request
    style: "Locker-Room", // default style

    // Scenario: Year/Trip Summary
    year: null, // will be set to max year on first render
    trip: "All", // rendered based on year

    // Scenario: Player Profile
    player: "",

    // Scenario: Singles Prediction
    player1: "",
    player2: "",

    // Scenario: Fourball Prediction
    ca1: "",
    ca2: "",
    tx1: "",
    tx2: "",
  },
};


/***********************
 * Drawer
 ***********************/
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildDrawer() {
  drawerNav.innerHTML = VIEWS.map((v) => {
    const active = v.id === currentRoute ? "is-active" : "";
    return `<button class="nav-item ${active}" data-route="${v.id}" type="button">${escapeHtml(
      v.title
    )}</button>`;
  }).join("");
}

function openDrawer() {
  overlay.hidden = false;
  drawer.hidden = false;
  menuBtn.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  overlay.hidden = true;
  drawer.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

drawerNav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-route]");
  if (!btn) return;
  setRoute(btn.dataset.route);
  closeDrawer();
});

if (refreshBtn) {
  refreshBtn.addEventListener("click", async () => {
    refreshBtn.disabled = true;
    try {
      await refreshCurrentScoreboard({ silent: false });
    } finally {
      setTimeout(() => { refreshBtn.disabled = false; }, 500);
    }
  });
}

/***********************
 * Router
 ***********************/
function setStatusHTML(html) {
  statusEl.innerHTML = html || "";
}

function renderUnderConstruction(title) {
  setStatusHTML("");
  viewBodyEl.innerHTML = `
    <div class="hint" style="margin-top: 6px;">
      <strong>${escapeHtml(title)}</strong><br/>
      <p>
        This app is for all things NSRC including team and player results, detailed match results (since 2015), and live tournament scoring. Across all views, click on a row to show additional information. Filters and column sorting is also available.</p>
        View overview:
        <ul>
          <li><b>Team Results by Year:</b> Displays the winning team and points for all history. Click on a year to display the Points by Round as well as the Points and Record by Player.</li>
          <li><b>Team Results by Player:</b> Displays who’s been on the winning team the most. Click on a player to display results by year.</li>
          <li><b>Historical Scoreboard:</b> Displays the round-by-round scores and match results for every year since 2015. Click on any round to display the individual matches.</li>
          <li><b>LIVE Scoreboard:</b> Displays the live scoreboard and match results for the current year.</li>
          <li><b>Head-to-Head:</b> Displays player aggregate points earned (or lost) and match results by format. Filter by Singles vs Opponent, Fourball vs Opponent, and Fourball with Partner. Click on any player to display individual opponents or partners.</li>
          <li><b>Player Match History:</b> Displays match records for all players since 2015. Filter by Fourball, Singles, or Both formats. Click on any player to display match results by year.</li>
          <li><b>Logos and Course Maps:</b> Self explanatory.</li>
          <li><b>AI Analysis and Predictions:</b> Generate AI write-ups for (1) year summary, (2) player profiles, (3) Singles predictions, and (4) Fourball predictions. Choose between a SportsCenter version or a Locker-Room version.</li>
        </ul>
        You can always view on your PC or phone browser. For better viewing and easier access on your iPhone, you can add an app icon to your home screen by following these steps:
        <ol>
          <li>tap Share</li>
          <li>tap More</li>
          <li>tap "Add to Home Screen"</li>
          <li>activate "Open as Web App"</li>
          <li>tap "Add"</li>
        </ol>
        <b>Data:</b>
        <ul>
          <li>Total team Wins/Losses are known since 2002. Points by team are only known since 2015.</li>
          <li>Full participants are available since 2014. Winning team members were pulled from the engraved trophy from 2002-2013. The only losing team member known for those years is either Adam or Grant.</li>
          <li>Match details are only available beginning 2015. Strokes per match are available beginning 2018.</li>
      </p>
    </div>
  `;
}

function setRoute(routeId) {
  currentRoute = routeId;
  // Show refresh ONLY on Current Scoreboard
  if (refreshBtn) {
    refreshBtn.hidden = (routeId !== "current-scoreboard");
  }
  buildDrawer();

  viewControlsEl.innerHTML = "";
  viewBodyEl.innerHTML = "";
  setStatusHTML("");

  const view = VIEWS.find((v) => v.id === routeId);
  viewTitleEl.textContent = view ? view.title : "NSRC";
 
  // Start/stop polling depending on route
  if (routeId === "current-scoreboard") startCurrentScoreboardPolling();
  else stopCurrentScoreboardPolling();

  switch (routeId) {
    case "player-match-history":
      renderPlayerMatchHistory();
      break;
    case "player-results":
      renderPlayerResults();
      break;
    case "logos-maps":
      renderLogosAndMaps();
      break;
    case "team-results":
      renderTeamResults();
      break;
    case "tournament-view":
      renderScoreboard("master");
      break;
    case "current-scoreboard":
      renderScoreboard("current");
      break;
    case "nemesis":
      renderHeadToHeadDominance();
      break;
    case "ai-analysis":
      renderAIAnalysis();
      break;
    default:
      renderUnderConstruction(viewTitleEl.textContent);
      break;
  }
}

/***********************
 * Helpers
 ***********************/
function toNumber(x) {
  const n = Number(String(x ?? "").trim());
  return Number.isFinite(n) ? n : 0;
}

function pick(r, ...keys) {
  for (const k of keys) {
    const v = r?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
}

function fmtInt(v) {
  const n = toNumber(v);
  if (n === null) return "";
  // show integers without decimals; keep .5 etc if they ever occur
  const isInt = Math.abs(n - Math.round(n)) < 1e-9;
  return isInt ? String(Math.round(n)) : String(n);
}

function cmp(a, b) {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function triToggleSort(viewSort, col) {
  if (viewSort.col !== col) {
    viewSort.col = col;
    viewSort.dir = "desc";
    return;
  }
  if (viewSort.dir === "desc") {
    viewSort.dir = "asc";
    return;
  }
  viewSort.col = null;
  viewSort.dir = null;
}

function sortIndicator(viewSort, col) {
  if (viewSort.col !== col) return "";
  return viewSort.dir === "desc" ? "▼" : "▲";
}

/***********************
 * Match log team index (PMH uses this)
 ***********************/
function ensureMatchLogLoaded() {
  // Only treat as "loaded" if we actually have rows
  if (cache.matchLogLoaded && Array.isArray(cache.matchLogRows) && cache.matchLogRows.length) {
    return Promise.resolve(cache.matchLogRows);
  }

  // If a load is in progress (or previously failed but not cleared), return it
  if (cache.matchLogPromise) return cache.matchLogPromise;

  cache.matchLogPromise = (async () => {
    try {
      const rawRows = await getMasterMatchLogRaw();

      const rows = rawRows
        .filter((r) => pick(r, "Player", "player") && pick(r, "Year", "year"))
        .map((r) => ({
          player: String(pick(r, "Player", "player")).trim(),
          year: Number(String(pick(r, "Year", "year")).trim()),
          team: String(pick(r, "Team", "team")).trim(),
        }))
        .filter((r) => r.player && Number.isFinite(r.year));

      // If we somehow built zero rows, treat as failure so we can retry later
      if (!rows.length) throw new Error("ensureMatchLogLoaded: built 0 rows");

      cache.matchLogRows = rows;

      // Build the per-player-year team lookup
      buildTeamByPlayerYearIndex(cache.matchLogRows);

      cache.matchLogLoaded = true;
      return cache.matchLogRows;
    } catch (e) {
      // IMPORTANT: allow retries later (Patch #4 will call these in background)
      console.error("ensureMatchLogLoaded failed:", e);
      cache.matchLogLoaded = false;
      cache.matchLogRows = [];
      cache.teamByPlayerYear = cache.teamByPlayerYear || new Map();
      cache.teamByPlayerYear.clear();
      throw e;
    } finally {
      // CRITICAL: never leave a rejected promise stuck in cache
      cache.matchLogPromise = null;
    }
  })();

  return cache.matchLogPromise;
}

function buildTeamByPlayerYearIndex(rows) {
  const counts = new Map(); // player -> year -> team -> count

  for (const r of rows) {
    if (!r.player || !Number.isFinite(r.year) || !r.team) continue;

    if (!counts.has(r.player)) counts.set(r.player, new Map());
    const ymap = counts.get(r.player);

    if (!ymap.has(r.year)) ymap.set(r.year, new Map());
    const tmap = ymap.get(r.year);

    tmap.set(r.team, (tmap.get(r.team) || 0) + 1);
  }

  cache.teamByPlayerYear.clear();
  for (const [player, ymap] of counts.entries()) {
    const outY = new Map();
    for (const [year, tmap] of ymap.entries()) {
      let bestTeam = "";
      let bestCt = -1;
      for (const [team, ct] of tmap.entries()) {
        if (ct > bestCt) {
          bestCt = ct;
          bestTeam = team;
        }
      }
      if (bestTeam) outY.set(year, bestTeam);
    }
    cache.teamByPlayerYear.set(player, outY);
  }
}

function getTeamFromMatchLog(player, year) {
  const ymap = cache.teamByPlayerYear.get(player);
  return ymap ? (ymap.get(year) || "") : "";
}

/***********************
 * Shared: ensure full match log loaded (for Team Results drilldown)
 ***********************/
function ensureMatchLogFullLoaded(sourceKey = "master") {
  const bucket = cache.matchLogFull[sourceKey];
  if (!bucket) throw new Error(`Unknown match log sourceKey: ${sourceKey}`);

  if (bucket.loaded) return Promise.resolve(bucket.rows);
  if (bucket.promise) return bucket.promise;

  const url = sourceKey === "current" ? CSV.currentMatchLog : CSV.masterMatchLog;

  bucket.promise = (async () => {
    try {
      let rawRows;

      if (sourceKey === "current") {
        // keep current scoreboard real-time
        const res = await fetch(CSV.currentMatchLog, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const csvText = await res.text();

        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          transform: (val) => (typeof val === "string" ? val.trim() : val),
        });

        if (parsed.errors?.length) {
          console.error(parsed.errors);
          throw new Error("CSV parse error");
        }

        rawRows = parsed.data;
      } else {
        // master match log: cache after first load
        rawRows = await getMasterMatchLogRaw();
      }

      const rows = rawRows
        .filter((r) => r.Year && r.Team && r.Player)
        .map((r) => ({
          year: Number(String(r.Year).trim()),
          trip: String(r.Trip || "").trim(),
          round: Number(String(r.Round || "").trim()),
          format: String(r.Format || "").trim(),
          course: String(r.Course || "").trim(),
          match: Number(String(r.Match || "").trim()),
          matchId: String(r.Match_ID || r.MatchId || "").trim(),
          player: String(r.Player || "").trim(),
          team: String(r.Team || "").trim(),
          strokes: String(r.Strokes ?? "").trim(),
          opponent: String(r.Opponent || "").trim(),
          partner: String(r.Partner || "").trim(),
          result: String(r.Result || "").trim(),
          points: toNumber(r.Points),
          w: toNumber(r.W),
          l: toNumber(r.L),
          h: toNumber(r.H),
          ptsdiff: toNumber(r.Pts_Diff),
        }))
        .filter((r) => Number.isFinite(r.year));

      if (!rows.length) throw new Error(`ensureMatchLogFullLoaded(${sourceKey}): built 0 rows`);

      bucket.rows = rows;

      bucket.byYear.clear();
      for (const r of bucket.rows) {
        if (!bucket.byYear.has(r.year)) bucket.byYear.set(r.year, []);
        bucket.byYear.get(r.year).push(r);
      }

      bucket.loaded = true;
      return bucket.rows;
    } catch (e) {
      console.error(`ensureMatchLogFullLoaded(${sourceKey}) failed:`, e);
      bucket.loaded = false;
      bucket.rows = [];
      bucket.byYear.clear();
      throw e;
    } finally {
      // CRITICAL: allow retry if there was a failure
      bucket.promise = null;
    }
  })();
  return bucket.promise;

}

/***********************
 * VIEW: PLAYER RESULTS
 ***********************/
function renderPlayerResults() {
  const pr = state.pr;
  viewControlsEl.innerHTML = "";

  viewBodyEl.innerHTML = `
    <div class="tablewrap">
      <table class="table" aria-label="Player results table">
        <colgroup>
          <col style="width: 33%" />
          <col style="width: 25%" />
          <col style="width: 25%" />
          <col style="width: 17%" />
        </colgroup>
        <thead>
          <tr>
            <th class="sortable" data-col="player">Player<span class="sort-ind" id="prSortPlayer"></span></th>
            <th class="center sortable" data-col="wins">NSRC Win<span class="sort-ind" id="prSortWins"></span></th>
            <th class="center sortable" data-col="losses">NSRC Loss<span class="sort-ind" id="prSortLosses"></span></th>
            <th class="num sortable" data-col="pct">Win%<span class="sort-ind" id="prSortPct"></span></th>
          </tr>
        </thead>
        <tbody id="tbodyPR"></tbody>
      </table>
    </div>
    <p class="hint">Tap a player row to expand yearly results. Tap again to collapse.</p>
  `;

  const tbodyEl = document.getElementById("tbodyPR");
  const thead = viewBodyEl.querySelector("thead");

  const COLS = {
    player: ["Player", "Name"],
    year: ["Year", "YEAR", "year"],
    trip: ["Trip", "TRIP", "trip"],
    team: ["Team", "TEAM", "team"],
    wins: ["NSRC Wins", "Wins", "Win"],
    losses: ["NSRC Losses", "Losses", "Loss"],
  };

  function pickFirstColumn(rowObj, candidates) {
    for (const c of candidates) if (c in rowObj) return c;
    return null;
  }

  function parseYear(val) {
    const raw = String(val ?? "").trim();
    if (!raw) return null;
    const lower = raw.toLowerCase();
    if (lower === "all" || lower === "total" || lower === "grand total") return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  function renderStatus(playersCount) {
    const years = ["All", ...pr.availableYears]; // e.g. ["All", 2025, 2024, ...]
    const yearLabel = String(pr.selectedYear);

    const tripLabel =
      pr.selectedYear === "All"
        ? "All"
        : (pr.tripByYear?.get(Number(pr.selectedYear)) || "");

    setStatusHTML(`
      <div class="meta">
        <span class="meta-btn">
          Year: <strong>${escapeHtml(yearLabel)}</strong>
          <select class="chip-select" id="prYearSelect" aria-label="Year filter">
            ${years
              .map((y) => {
                const yStr = String(y);
                return `<option value="${escapeHtml(yStr)}"${
                  yStr === yearLabel ? " selected" : ""
                }>${escapeHtml(yStr)}</option>`;
              })
              .join("")}
          </select>
        </span>

        <span class="sep">•</span>

        <span>Trip: <strong>${escapeHtml(tripLabel)}</strong></span>

        <span class="sep">•</span>

        <span>Players: ${playersCount}</span>
      </div>
    `);

    document.getElementById("prYearSelect").addEventListener("change", (e) => {
      pr.selectedYear = e.target.value === "All" ? "All" : Number(e.target.value);
      pr.expandedPlayers.clear();
      pr.sort = { col: null, dir: null }; // optional: resets back to default sort for the view
      render();
    });
  }

  async function loadData() {
    setStatusHTML(`<div class="meta"><span>Loading Player Results…</span></div>`);
    tbodyEl.innerHTML = "";

    const parsedRows = await getMasterPlayerResultsRaw();

    pr.rows = parsedRows;
    pr.expandedPlayers.clear();

    // Years (desc) + Trip lookup by Year
      const sample = pr.rows[0] || {};
      const yearCol = pickFirstColumn(sample, COLS.year) || "Year";
      const tripCol = pickFirstColumn(sample, COLS.trip);

      const yearSet = new Set();
      pr.tripByYear = new Map();

      for (const r of pr.rows) {
        const y = parseYear(r[yearCol]);
        if (!Number.isFinite(y)) continue;

        yearSet.add(y);

        if (tripCol) {
          const trip = String(r[tripCol] ?? "").trim();
          if (trip && !pr.tripByYear.has(y)) pr.tripByYear.set(y, trip);
        }
      }

      pr.availableYears = Array.from(yearSet).sort((a, b) => b - a);

      // Keep selection valid
      if (pr.selectedYear !== "All") {
        const yNum = Number(pr.selectedYear);
        if (!pr.availableYears.includes(yNum)) pr.selectedYear = "All";
      }

    render();
  }

  function buildAggregates() {
    const totalsByPlayer = new Map();
    const yearsByPlayer = new Map();

    if (!pr.rows.length) return { totalsByPlayer, yearsByPlayer };

    const sample = pr.rows[0] || {};
    const playerCol = pickFirstColumn(sample, COLS.player) || "Player";
    const yearCol = pickFirstColumn(sample, COLS.year) || "Year";
    const tripCol = pickFirstColumn(sample, COLS.trip);
    const teamCol = pickFirstColumn(sample, COLS.team);
    const winsCol = pickFirstColumn(sample, COLS.wins);
    const lossesCol = pickFirstColumn(sample, COLS.losses);

    let sawTotalsRow = false;

    for (const r of pr.rows) {
      const player = String(r[playerCol] ?? "").trim();
      if (!player) continue;

      const year = parseYear(r[yearCol]);
      const wins = toNumber(r[winsCol]);
      const losses = toNumber(r[lossesCol]);
      const team = teamCol ? String(r[teamCol] ?? "").trim() : "";

      if (Number.isFinite(year)) {
        if (!yearsByPlayer.has(player)) yearsByPlayer.set(player, new Map());
        const ym = yearsByPlayer.get(player);

        if (!ym.has(year)) ym.set(year, { wins: 0, losses: 0, team: team || "" });
        const a = ym.get(year);
        a.wins += wins;
        a.losses += losses;
        if (!a.team && team) a.team = team;

        continue;
      }

      sawTotalsRow = true;
      if (!totalsByPlayer.has(player)) totalsByPlayer.set(player, { wins: 0, losses: 0 });
      const t = totalsByPlayer.get(player);
      t.wins += wins;
      t.losses += losses;
    }

    if (!sawTotalsRow) {
      for (const [player, ym] of yearsByPlayer.entries()) {
        let w = 0, l = 0;
        for (const a of ym.values()) { w += a.wins; l += a.losses; }
        totalsByPlayer.set(player, { wins: w, losses: l });
      }
    }

    return { totalsByPlayer, yearsByPlayer };
  }

  function applySort(rows) {
    const sortCol = pr.sort.col || pr.defaultSort.col;
    const sortDir = pr.sort.dir || pr.defaultSort.dir;
    const dirMul = sortDir === "asc" ? 1 : -1;

    return rows.slice().sort((a, b) => {
      const primary = cmp(a[sortCol], b[sortCol]) * dirMul;
      if (primary !== 0) return primary;
      return String(a.player).localeCompare(String(b.player));
    });
  }

  function updateSortIndicators() {
    document.getElementById("prSortPlayer").textContent = sortIndicator(pr.sort, "player");
    document.getElementById("prSortWins").textContent = sortIndicator(pr.sort, "wins");
    document.getElementById("prSortLosses").textContent = sortIndicator(pr.sort, "losses");
    document.getElementById("prSortPct").textContent = sortIndicator(pr.sort, "pct");
  }

  function render() {
    const { totalsByPlayer, yearsByPlayer } = buildAggregates();

    let players;

    if (pr.selectedYear === "All") {
      players = Array.from(totalsByPlayer.entries()).map(([player, t]) => {
        const denom = t.wins + t.losses;
        const pct = denom > 0 ? t.wins / denom : 0;
        return { player, wins: t.wins, losses: t.losses, pct };
      });
    } else {
      const y = Number(pr.selectedYear);
      players = Array.from(yearsByPlayer.entries()).map(([player, ym]) => {
        const a = ym.get(y);
        const wins = a ? a.wins : 0;
        const losses = a ? a.losses : 0;
        const denom = wins + losses;
        const pct = denom > 0 ? wins / denom : 0;
        return { player, wins, losses, pct };
      });
    }


    players = players.filter((p) => p.wins + p.losses > 0);
    players = applySort(players);

    updateSortIndicators();
    renderStatus(players.length);

    const html = [];

    for (const p of players) {
      const isExpanded = pr.expandedPlayers.has(p.player);
      const chevron = isExpanded ? "▾" : "▸";

      html.push(`
        <tr class="player-row" data-rowtype="player" data-player="${escapeHtml(p.player)}">
          <td title="${escapeHtml(p.player)}"><span class="chev">${chevron}</span>${escapeHtml(p.player)}</td>
          <td class="center">${p.wins}</td>
          <td class="center">${p.losses}</td>
          <td class="num">${(p.pct * 100).toFixed(1)}%</td>
        </tr>
      `);

      if (isExpanded) {
        const ym = yearsByPlayer.get(p.player) || new Map();
        const years = 
          pr.selectedYear === "All"
            ? Array.from(ym.keys()).sort((a, b) => b - a)
            : [Number(pr.selectedYear)];

        for (const y of years) {
          const a = ym.get(y);
          if (!a) continue;
          const denom = a.wins + a.losses;
          if (denom <= 0) continue;
          const pct = a.wins / denom;

          const teamSuffix = a.team ? ` - ${a.team}` : "";
          const label = `${y}${teamSuffix}`;

          html.push(`
            <tr class="year-row">
              <td title="${escapeHtml(label)}">${escapeHtml(label)}</td>
              <td class="center">${a.wins}</td>
              <td class="center">${a.losses}</td>
              <td class="num">${(pct * 100).toFixed(1)}%</td>
            </tr>
          `);
        }
      }
    }

    tbodyEl.innerHTML = html.join("");
  }

  tbodyEl.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr || tr.dataset.rowtype !== "player") return;

    const player = tr.dataset.player;
    if (!player) return;

    if (pr.expandedPlayers.has(player)) pr.expandedPlayers.delete(player);
    else pr.expandedPlayers.add(player);

    render();
  });

  thead.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-col]");
    if (!th) return;
    triToggleSort(pr.sort, th.dataset.col);
    pr.expandedPlayers.clear();
    render();
  });

  loadData();
}

/***********************
 * VIEW: PLAYER MATCH HISTORY
 ***********************/
function renderPlayerMatchHistory() {
  const pmh = state.pmh;
  viewControlsEl.innerHTML = "";

  viewBodyEl.innerHTML = `
    <div class="tablewrap">
      <table class="table" aria-label="Player match history table">
        <colgroup>
          <col style="width: 35%" />
          <col style="width: 10%" />
          <col style="width: 11%" />
          <col style="width: 10%" />
          <col style="width: 9%" />
          <col style="width: 9%" />
          <col style="width: 16%" />
        </colgroup>
        <thead>
          <tr>
            <th class="sortable" data-col="player">Player<span class="sort-ind" id="pmhSortPlayer"></span></th>
            <th class="num sortable" data-col="matches">M<span class="sort-ind" id="pmhSortMatches"></span></th>
            <th class="num sortable" data-col="points">Pts<span class="sort-ind" id="pmhSortPoints"></span></th>
            <th class="num sortable" data-col="wins">W<span class="sort-ind" id="pmhSortW"></span></th>
            <th class="num sortable" data-col="losses">L<span class="sort-ind" id="pmhSortL"></span></th>
            <th class="num sortable" data-col="halved">H<span class="sort-ind" id="pmhSortH"></span></th>
            <th class="num sortable" data-col="pct">Pt%<span class="sort-ind" id="pmhSortPct"></span></th>
          </tr>
        </thead>
        <tbody id="tbodyPMH"></tbody>
      </table>
    </div>

    <p class="hint">Tap a player row to expand yearly stats. Tap again to collapse.</p>
  `;

  const tbodyEl = document.getElementById("tbodyPMH");
  const thead = viewBodyEl.querySelector("thead");

  function renderStatus(playersCount) {
    const years = ["All", ...pmh.availableYears.slice().sort((a, b) => b - a).map(String)];
    const formats = ["Both", "Fourball", "Singles"];

    const yearLabel = pmh.selectedYear === "All" ? "All" : String(pmh.selectedYear);
    const formatLabel = pmh.currentFormat;

    setStatusHTML(`
      <div class="meta">
        <span class="meta-btn">
          Year: <strong>${escapeHtml(yearLabel)}</strong>
          <select class="chip-select" id="pmhYearSelect" aria-label="Year filter">
            ${years.map(y => `<option value="${escapeHtml(y)}"${y===yearLabel?" selected":""}>${escapeHtml(y)}</option>`).join("")}
          </select>
        </span>

        <span class="meta-btn">
          Format: <strong>${escapeHtml(formatLabel)}</strong>
          <select class="chip-select" id="pmhFormatSelect" aria-label="Format filter">
            ${formats.map(f => `<option value="${escapeHtml(f)}"${f===formatLabel?" selected":""}>${escapeHtml(f)}</option>`).join("")}
          </select>
        </span>

        <span class="sep">•</span>
        <span>Players: ${playersCount}</span>
      </div>
    `);

    document.getElementById("pmhYearSelect").addEventListener("change", (e) => {
      pmh.selectedYear = e.target.value === "All" ? "All" : Number(e.target.value);
      pmh.expandedPlayers.clear();
      render();
    });

    document.getElementById("pmhFormatSelect").addEventListener("change", (e) => {
      pmh.currentFormat = e.target.value;
      pmh.expandedPlayers.clear();
      render();
    });
  }

  function computePointsFromResult(result) {
    if (result === "Win") return 1;
    if (result === "Halved") return 0.5;
    return 0;
  }

  function extractYear(rawRow) {
    const y = Number(String(pick(rawRow, "Year", "year")).trim());
    return Number.isFinite(y) ? y : null;
  }

  async function loadData() {
    setStatusHTML(`<div class="meta"><span>Loading data…</span></div>`);
    tbodyEl.innerHTML = "";
    // If we already have data cached in state, just re-render immediately
    if (pmh.allRows && pmh.allRows.length) {
      render();
      return;
    }

        try {
          await ensureMatchLogLoaded();

          const rawRows = await getMasterMatchLogRaw();

          // Build pmh.allRows from master match log; accept different header casings
          // and derive a human-friendly "result" if it's not explicitly present.
          pmh.allRows = rawRows
            .filter((r) => {
              // Must have player + format and at least one of: explicit result OR w/l/h/points
              const hasPlayer = !!pick(r, "Player", "player");
              const hasFormat = !!pick(r, "Format", "format");
              const hasResultCols = !!pick(r, "Result", "result") ||
                                    pick(r, "w", "W") !== "" ||
                                    pick(r, "l", "L") !== "" ||
                                    pick(r, "h", "H") !== "" ||
                                    pick(r, "Points", "points") !== "";
              return hasPlayer && hasFormat && hasResultCols;
            })
            .map((r) => {
              // Normalized access helpers
              const player = String(pick(r, "Player", "player")).trim();
              const format = String(pick(r, "Format", "format")).trim();

              // numeric W/L/H if present
              const w = Number.isFinite(Number(pick(r, "w", "W"))) ? Number(pick(r, "w", "W")) : 0;
              const l = Number.isFinite(Number(pick(r, "l", "L"))) ? Number(pick(r, "l", "L")) : 0;
              const h = Number.isFinite(Number(pick(r, "h", "H"))) ? Number(pick(r, "h", "H")) : 0;

              // points might be "" / null / number
              const pointsRaw = pick(r, "Points", "points");
              const pointsVal = pointsRaw === "" || pointsRaw === null ? null : Number(pointsRaw);
              const points = Number.isFinite(pointsVal) ? pointsVal : null;

              // Result precedence:
              // 1) explicit Result column if present
              // 2) derive from w/l/h
              // 3) fallback to points sign (positive -> Win, 0 -> Halved, negative -> Loss)
              let result = pick(r, "Result", "result") || "";
              if (!result) {
                if (w > 0) result = "Win";
                else if (l > 0) result = "Loss";
                else if (h > 0) result = "Halved";
                else if (points != null) {
                  if (points > 0) result = "Win";
                  else if (points === 0) result = "Halved";
                  else result = "Loss";
                } else {
                  result = "";
                }
              }

              // Final points value: prefer explicit points if numeric; otherwise,
              // if we have a derived result but no points, compute standard points.
              let finalPoints = null;
              if (Number.isFinite(points)) finalPoints = points;
              else if (result === "Win") finalPoints = 1;
              else if (result === "Halved") finalPoints = 0.5;
              else if (result === "Loss") finalPoints = 0;

              return {
                player,
                format,
                result,
                points: finalPoints,
                year: extractYear(r),
              };
            });

      const yearSet = new Set(pmh.allRows.map((r) => r.year).filter((y) => Number.isFinite(y)));
      pmh.availableYears = Array.from(yearSet);

      render();
    } catch (e) {
      console.error(e);
      setStatusHTML(`<div class="meta"><span>Failed to load data.</span></div>`);
    }
  }

  function passesFormat(r) {
    return pmh.currentFormat === "Both"
      ? r.format === "Fourball" || r.format === "Singles"
      : r.format === pmh.currentFormat;
  }

  function passesYear(r) {
    if (pmh.selectedYear === "All") return true;
    return r.year === Number(pmh.selectedYear);
  }

  function aggInit() {
    return { wins: 0, losses: 0, halved: 0, points: 0 };
  }

  function aggAdd(agg, row) {
    if (row.result === "Win") agg.wins += 1;
    else if (row.result === "Loss") agg.losses += 1;
    else if (row.result === "Halved") agg.halved += 1;

    const pts = row.points != null ? row.points : computePointsFromResult(row.result);
    agg.points += pts;
  }

  function finalizeAgg(agg) {
    const matches = agg.wins + agg.losses + agg.halved;
    const pct = matches > 0 ? agg.points / matches : 0;
    return { ...agg, matches, pct };
  }

  function applySort(rows) {
    const sortCol = pmh.sort.col || pmh.defaultSort.col;
    const sortDir = pmh.sort.dir || pmh.defaultSort.dir;
    const dirMul = sortDir === "asc" ? 1 : -1;

    return rows.slice().sort((a, b) => {
      const primary = cmp(a[sortCol], b[sortCol]) * dirMul;
      if (primary !== 0) return primary;
      return String(a.player).localeCompare(String(b.player));
    });
  }

  function updateSortIndicators() {
    document.getElementById("pmhSortPlayer").textContent = sortIndicator(pmh.sort, "player");
    document.getElementById("pmhSortMatches").textContent = sortIndicator(pmh.sort, "matches");
    document.getElementById("pmhSortPoints").textContent = sortIndicator(pmh.sort, "points");
    document.getElementById("pmhSortW").textContent = sortIndicator(pmh.sort, "wins");
    document.getElementById("pmhSortL").textContent = sortIndicator(pmh.sort, "losses");
    document.getElementById("pmhSortH").textContent = sortIndicator(pmh.sort, "halved");
    document.getElementById("pmhSortPct").textContent = sortIndicator(pmh.sort, "pct");
  }

  function render() {
    const filtered = pmh.allRows.filter((r) => passesFormat(r) && passesYear(r));

    const playerAgg = new Map();
    const playerYearAgg = new Map();

    for (const r of filtered) {
      if (!playerAgg.has(r.player)) playerAgg.set(r.player, aggInit());
      aggAdd(playerAgg.get(r.player), r);

      if (!playerYearAgg.has(r.player)) playerYearAgg.set(r.player, new Map());
      const ym = playerYearAgg.get(r.player);

      const y = r.year;
      if (!Number.isFinite(y)) continue;
      if (!ym.has(y)) ym.set(y, aggInit());
      aggAdd(ym.get(y), r);
    }

    let players = Array.from(playerAgg.entries()).map(([player, agg]) => {
      const f = finalizeAgg(agg);
      return {
        player,
        matches: f.matches,
        points: f.points,
        wins: f.wins,
        losses: f.losses,
        halved: f.halved,
        pct: f.pct,
      };
    });

    players = players.filter((p) => p.matches > 0);
    players = applySort(players);

    updateSortIndicators();
    renderStatus(players.length);

    const html = [];

    for (const p of players) {
      const isExpanded = pmh.expandedPlayers.has(p.player);
      const chevron = isExpanded ? "▾" : "▸";

      html.push(`
        <tr class="player-row" data-rowtype="player" data-player="${escapeHtml(p.player)}">
          <td title="${escapeHtml(p.player)}"><span class="chev">${chevron}</span>${escapeHtml(p.player)}</td>
          <td class="num">${p.matches}</td>
          <td class="num">${p.points.toFixed(1)}</td>
          <td class="num">${p.wins}</td>
          <td class="num">${p.losses}</td>
          <td class="num">${p.halved}</td>
          <td class="num">${(p.pct * 100).toFixed(1)}%</td>
        </tr>
      `);

      if (isExpanded) {
        const ymap = playerYearAgg.get(p.player) || new Map();
        const years = Array.from(ymap.keys()).sort((a, b) => b - a);

        for (const y of years) {
          const yrAgg = finalizeAgg(ymap.get(y));
          if (yrAgg.matches <= 0) continue;

          const team = getTeamFromMatchLog(p.player, y);
          const label = team ? `${y} - ${team}` : `${y}`;

          html.push(`
            <tr class="year-row">
              <td title="${escapeHtml(label)}">${escapeHtml(label)}</td>
              <td class="num">${yrAgg.matches}</td>
              <td class="num">${yrAgg.points.toFixed(1)}</td>
              <td class="num">${yrAgg.wins}</td>
              <td class="num">${yrAgg.losses}</td>
              <td class="num">${yrAgg.halved}</td>
              <td class="num">${(yrAgg.pct * 100).toFixed(1)}%</td>
            </tr>
          `);
        }
      }
    }

    tbodyEl.innerHTML = html.join("");
  }

  tbodyEl.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr || tr.dataset.rowtype !== "player") return;

    const player = tr.dataset.player;
    if (!player) return;

    if (pmh.expandedPlayers.has(player)) pmh.expandedPlayers.delete(player);
    else pmh.expandedPlayers.add(player);

    render();
  });

  thead.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-col]");
    if (!th) return;
    triToggleSort(pmh.sort, th.dataset.col);
    pmh.expandedPlayers.clear();
    render();
  });

  loadData();
}

/***********************
 * VIEW: LOGOS AND COURSE MAPS
 ***********************/
function renderLogosAndMaps() {
  const lm = state.lm;

  viewControlsEl.innerHTML = "";

  // Pick which list to show
  const files = lm.mode === "logos" ? LOGO_FILES : COURSE_FILES;

  // Guard: if arrays are empty, show a helpful message
  if (!files || files.length === 0) {
    setStatusHTML(`
      <div class="meta">
        <span>Add filenames to <strong>${lm.mode === "logos" ? "LOGO_FILES" : "COURSE_FILES"}</strong> in app.js.</span>
      </div>
    `);

    viewBodyEl.innerHTML = `
      <div class="hint">
        Your <strong>/img</strong> folder can’t be read automatically on a static site (GitHub Pages),
        so we keep an explicit list of image filenames in <strong>app.js</strong>.<br/><br/>
        Add a few filenames first to test, then paste the rest.
      </div>
    `;
    return;
  }

  // Ensure index is in range (e.g., after switching modes)
  lm.index = Math.max(0, Math.min(lm.index, files.length - 1));

  // Small helper to show a nice label from the filename
  function parseFilename(name) {
    // "Logo01 - 2002 - TPC Star Pass.jpg"
    // "Course01 - 2013 - Torrey Pines.jpg"
    const m = String(name).match(/^(Logo|Course)\d+\s*-\s*(\d{4})\s*-\s*(.+)\.(jpg|jpeg|png)$/i);
    if (!m) return { year: "", title: name };
    return { year: m[2], title: m[3] };
  }

  // STATUS LINE: show only count
  setStatusHTML("");

  // Build slides
  const slidesHtml = files
    .map((f) => {
      const src = `img/${encodeURI(f)}`;
      const p = parseFilename(f);
      const alt = `${p.year} - ${p.title}`;
      return `
        <div class="slide">
          <img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" />
        </div>
      `;
    })
    .join("");

  const info = parseFilename(files[lm.index]);

  viewBodyEl.innerHTML = `
    <div class="gallery-top">
      <div class="segmented" role="tablist" aria-label="Gallery mode">
        <button class="seg-btn ${lm.mode === "logos" ? "is-active" : ""}" id="btnLogos" type="button">Logos</button>
        <button class="seg-btn ${lm.mode === "courses" ? "is-active" : ""}" id="btnCourses" type="button">Course Maps</button>
      </div>

      <div class="gallery-counter" id="galleryCounter">
        ${lm.mode === "logos" ? "Logos" : "Course Maps"}: ${lm.index + 1} / ${files.length}
      </div>
    </div>

    <div class="carousel" id="carousel" aria-label="Swipeable image gallery">
      ${slidesHtml}
    </div>

    <div class="gallery-caption" id="galleryCaption">
      <div class="caption-year" id="capYear">${escapeHtml(info.year || "")}</div>
      <div class="caption-sub" id="capTitle">${escapeHtml(info.title || "")}</div>
    </div>

    <div class="thumbstrip" id="thumbstrip" aria-label="Thumbnails">
      ${files
        .map((f, i) => {
          const src = `img/${encodeURI(f)}`;
          const active = i === lm.index ? "is-active" : "";
          return `
            <button class="thumb ${active}" type="button" data-idx="${i}" aria-label="Go to image ${i + 1}">
              <img src="${src}" alt="" loading="lazy" />
            </button>
          `;
        })
        .join("")}
    </div>
  `;

  const btnLogos = document.getElementById("btnLogos");
  const counterEl = document.getElementById("galleryCounter");
  const capYearEl = document.getElementById("capYear");
  const capTitleEl = document.getElementById("capTitle");
  const thumbstrip = document.getElementById("thumbstrip");
  const thumbs = thumbstrip.querySelectorAll(".thumb");
  const btnCourses = document.getElementById("btnCourses");
  const carousel = document.getElementById("carousel");

  btnLogos.addEventListener("click", () => {
    lm.mode = "logos";
    lm.index = 0;
    renderLogosAndMaps();
  });

  btnCourses.addEventListener("click", () => {
    lm.mode = "courses";
    lm.index = 0;
    renderLogosAndMaps();
  });

  // Scroll to the current index
  requestAnimationFrame(() => {
    const slideWidth = carousel.clientWidth; // each slide is 100% width
    carousel.scrollLeft = lm.index * (slideWidth + 12); // 12px gap from CSS
  });

  // Update index as user swipes
  let raf = null;
  carousel.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const slideWidth = carousel.clientWidth + 12; // width + gap
      const idx = Math.round(carousel.scrollLeft / slideWidth);
      const clamped = Math.max(0, Math.min(idx, files.length - 1));

      if (clamped !== lm.index) {
        lm.index = clamped;
        // Update top-right counter (instead of the status line)
        counterEl.textContent = `${lm.mode === "logos" ? "Logos" : "Course Maps"}: ${lm.index + 1} / ${files.length}`;

        // Update the 2-line caption under the image
        const p = parseFilename(files[lm.index]);
        capYearEl.textContent = p.year || "";
        capTitleEl.textContent = p.title || "";

        // Update which thumbnail is highlighted
        thumbs.forEach((t) => t.classList.remove("is-active"));
        const activeThumb = thumbstrip.querySelector(`.thumb[data-idx="${lm.index}"]`);
        if (activeThumb) activeThumb.classList.add("is-active");

        // Keep active thumb visible
        if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }

    });
  });
  thumbstrip.addEventListener("click", (e) => {
    const btn = e.target.closest(".thumb[data-idx]");
    if (!btn) return;

    const idx = Number(btn.dataset.idx);
    if (!Number.isFinite(idx)) return;

    lm.index = Math.max(0, Math.min(idx, files.length - 1));

    const slideWidth = carousel.clientWidth + 12; // 12px gap
    carousel.scrollTo({ left: lm.index * slideWidth, behavior: "smooth" });
  });
}

/***********************
 * VIEW: TEAM RESULTS
 ***********************/
function renderTeamResults() {
  const tr = state.tr;

  // No changes to topbar or global layout; we only fill status + body.
  viewControlsEl.innerHTML = ""; // keep controls hidden per your CSS

  viewBodyEl.innerHTML = `
    <div class="team-summary">
      <div class="team-pills">
        <div class="team-pill pill-cali" id="caliWinsPill">Cali Wins: --</div>
        <div class="team-pill pill-tex" id="texWinsPill">Tex-Mex Wins: --</div>
      </div>

      <div class="tablewrap">
        <table class="table" aria-label="Team results table">
          <colgroup>
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <thead>
            <tr>
              <th>Year</th>
              <th class="center">CA</th>
              <th class="center">TX</th>
              <th class="trip-right">Trip</th>
            </tr>
          </thead>
          <tbody id="tbodyTR"></tbody>
        </table>
      </div>

      <p class="hint">Tap a year row to expand details. Tap again to collapse.</p>
    </div>
  `;

  const tbodyEl = document.getElementById("tbodyTR");
  const caliWinsPill = document.getElementById("caliWinsPill");
  const texWinsPill = document.getElementById("texWinsPill");

  async function loadTeamResults() {
    if (!CSV.masterTeamResults) {
      setStatusHTML(`<div class="meta"><span>Master Team Results CSV URL is missing.</span></div>`);
      tbodyEl.innerHTML = "";
      return;
    }

    setStatusHTML(`<div class="meta"><span>Loading Team Results…</span></div>`);
    tbodyEl.innerHTML = "";

    try {
      const parsedRows = await getMasterTeamResultsRaw();

      // Expect columns: Year, Trip, Location, Winning Team, Cali Points, Tex-Mex Points
      tr.rows = parsedRows
        .map((r) => {
          const year = Number(String(r.Year ?? "").trim());
          if (!Number.isFinite(year)) return null;

          const trip = String(r.Trip ?? "").trim();
          const winningTeam = String(r["Winning Team"] ?? r.WinningTeam ?? "").trim();
          const caliPts = toNumber(r["Cali Points"] ?? r.CaliPoints ?? r.Cali);
          const texPts = toNumber(r["Tex-Mex Points"] ?? r["Tex-Mex"] ?? r.TexMexPoints ?? r.TexMex);

          return { year, trip, winningTeam, caliPts, texPts };
        })
        .filter(Boolean);

      // Sort by year descending
      tr.rows.sort((a, b) => b.year - a.year);

      // Wins count (by year)
      const caliWins = tr.rows.filter((r) => r.winningTeam === "Cali").length;
      const texWins = tr.rows.filter((r) => r.winningTeam === "Tex-Mex").length;

      caliWinsPill.textContent = `Cali Wins: ${caliWins}`;
      texWinsPill.textContent = `Tex-Mex Wins: ${texWins}`;

      // Tournament count in the small status line
      setStatusHTML(`<div class="meta"><span>Tournaments: ${tr.rows.length}</span></div>`);

      renderTable();
    } catch (e) {
      console.error(e);
      setStatusHTML(`<div class="meta"><span>Failed to load Team Results. Check the published CSV and headers.</span></div>`);
    }
  }

  function renderTable() {
    const parts = [];

    for (const r of tr.rows) {
      const isExpanded = tr.expandedYears.has(r.year);
      const chev = isExpanded ? "▾" : "▸";

      const caliWinCellClass = r.caliPts > r.texPts ? "win-cali" : "";
      const texWinCellClass  = r.texPts > r.caliPts ? "win-tex"  : "";

      parts.push(`
        <tr class="player-row" data-rowtype="year" data-year="${r.year}">
          <td><span class="chev">${chev}</span>${r.year}</td>
          <td class="center ${caliWinCellClass}">${r.caliPts.toFixed(1)}</td>
          <td class="center ${texWinCellClass}">${r.texPts.toFixed(1)}</td>
          <td class="trip-right" title="${escapeHtml(r.trip)}">${escapeHtml(r.trip)}</td>
        </tr>
      `);

      if (isExpanded) {
        parts.push(renderExpandedYear(r.year));
      }
    }

    tbodyEl.innerHTML = parts.join("");
  }

  function renderExpandedYear(year) {
    // We render extra rows directly in the same table to keep column widths identical
    const bucket = cache.matchLogFull.master;
    const yearRows = bucket.byYear.get(year) || [];

    // Group 1: Points by Round (Round desc)
    // key = `${round}|${format}`
    const byRound = new Map();
    for (const r of yearRows) {
      if (!Number.isFinite(r.round) || !r.format) continue;
      const key = `${r.round}|${r.format}`;
      if (!byRound.has(key)) byRound.set(key, { round: r.round, format: r.format, cali: 0, tex: 0 });

      const obj = byRound.get(key);

      // Singles: sum points. Fourball: sum(points)/2 (because 2 players per team per match)
      const div = r.format === "Fourball" ? 2 : 1;
      if (r.team === "Cali") obj.cali += r.points / div;
      if (r.team === "Tex-Mex") obj.tex += r.points / div;
    }

    const roundRows = Array.from(byRound.values()).sort((a, b) => b.round - a.round);

    // Group 2: Points and Record by Player
    // key = `${team}|${player}`
    const byPlayer = new Map();
    for (const r of yearRows) {
      if (!r.player || !r.team) continue;
      const key = `${r.team}|${r.player}`;
      if (!byPlayer.has(key)) byPlayer.set(key, { team: r.team, player: r.player, points: 0, w: 0, l: 0, h: 0 });

      const obj = byPlayer.get(key);
      obj.points += r.points;
      if (r.result === "Win") obj.w += 1;
      else if (r.result === "Loss") obj.l += 1;
      else if (r.result === "Halved") obj.h += 1;
    }

    const playerRows = Array.from(byPlayer.values()).sort((a, b) => {
      const t = String(a.team).localeCompare(String(b.team)); // Cali then Tex-Mex
      if (t !== 0) return t;
      return b.points - a.points; // points desc
    });

    const out = [];

    // Section header row (muted)
    out.push(`
      <tr class="year-row">
        <td colspan="4"><strong>Points by Round</strong></td>
      </tr>
    `);

    for (const rr of roundRows) {
      const label = `Rnd ${rr.round} - ${rr.format}`;
      out.push(`
        <tr class="year-row">
          <td title="${escapeHtml(label)}">${escapeHtml(label)}</td>
          <td class="center">${rr.cali.toFixed(1)}</td>
          <td class="center">${rr.tex.toFixed(1)}</td>
          <td class="center"></td>
        </tr>
      `);
    }

    out.push(`
      <tr class="year-row">
        <td colspan="4" style="padding-top: 10px;"><strong>Points and Record by Player</strong></td>
      </tr>
    `);

    for (const pr of playerRows) {
      const teamAbbr = pr.team === "Cali" ? "CA" : (pr.team === "Tex-Mex" ? "TX" : pr.team);
      const label = `${teamAbbr} - ${pr.player}`;
      const record = `${pr.w}-${pr.l}-${pr.h}`;

      out.push(`
        <tr class="year-row">
          <td title="${escapeHtml(label)}">${escapeHtml(label)}</td>
          <td class="center">${pr.team === "Cali" ? pr.points.toFixed(1) : ""}</td>
          <td class="center">${pr.team === "Tex-Mex" ? pr.points.toFixed(1) : ""}</td>
          <td class="center">${escapeHtml(record)}</td>
        </tr>
      `);
    }

    return out.join("");
  }

  // Expand/collapse click
  tbodyEl.addEventListener("click", async (e) => {
    const row = e.target.closest("tr[data-rowtype='year']");
    if (!row) return;

    const year = Number(row.dataset.year);
    if (!Number.isFinite(year)) return;

    // Load match log (full) on first expansion
    if (!cache.matchLogFull?.master?.loaded) {
      setStatusHTML(`<div class="meta"><span>Loading year details…</span></div>`);
      try {
        await ensureMatchLogFullLoaded("master");
      } catch (err) {
        console.error(err);
        setStatusHTML(`<div class="meta"><span>Could not load year drilldown. Check Master Match Log publish link.</span></div>`);
        return;
      }
      // Restore status line after load
      setStatusHTML(`<div class="meta"><span>Tournaments: ${tr.rows.length}</span></div>`);
    }

    if (tr.expandedYears.has(year)) tr.expandedYears.delete(year);
    else tr.expandedYears.add(year);

    renderTable();
  });

  // Initial load
  loadTeamResults();
}

/***********************
 * VIEW: SCOREBOARD
 ***********************/
function renderScoreboard(sourceKey = "master") {
  const sb = sourceKey === "current" ? state.csb : state.sb;
 
  const bucket = cache.matchLogFull[sourceKey];

  viewControlsEl.innerHTML = "";

  viewBodyEl.innerHTML = `
    <div class="team-summary">
      <div class="tablewrap">
        <table class="table" aria-label="Scoreboard table">
          <colgroup>
            <col style="width: 35%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
          </colgroup>
          <thead>
            <tr>
              <th>Round/Player</th>
              <th class="center">CA</th>
              <th class="center">TX</th>
              <th class="trip-right">Course</th>
            </tr>
          </thead>
          <tbody id="tbodySB"></tbody>
        </table>
      </div>
    </div>

    <p class="hint">Tap a round row to expand. Tap again to collapse.</p>
  `;

  const tbodyEl = document.getElementById("tbodySB");

  function setMetaLine(year, trip) {
    const years = sb.availableYears.slice().sort((a, b) => b - a);
    const yearLabel = String(year);

    setStatusHTML(`
      <div class="meta">
        <span class="meta-btn">
          Year: <strong>${escapeHtml(yearLabel)}</strong>
          <select class="chip-select" id="sbYearSelect" aria-label="Year filter">
            ${years
              .map((y) => `<option value="${y}"${String(y) === yearLabel ? " selected" : ""}>${y}</option>`)
              .join("")}
          </select>
        </span>

        <span>Trip: <strong>${escapeHtml(trip || "")}</strong></span>
      </div>
    `);

    document.getElementById("sbYearSelect").addEventListener("change", (e) => {
      sb.selectedYear = Number(e.target.value);
      sb.expandedKeys.clear();
      render();
    });
  }

  function sumTeamPoints(rows, team) {
    let total = 0;
    for (const r of rows) {
      if (r.team !== team) continue;
      const div = r.format === "Fourball" ? 2 : 1;
      total += (r.points || 0) / div;
    }
    return total;
  }

  function buildRoundGroups(yearRows) {
    // key = `${round}|${format}`
    const groups = new Map();

    for (const r of yearRows) {
      if (!Number.isFinite(r.round) || !r.format) continue;
      const key = `${r.round}|${r.format}`;

      if (!groups.has(key)) {
        groups.set(key, {
          key,
          round: r.round,
          format: r.format,
          course: r.course || "",
          caliPts: 0,
          texPts: 0,
        });
      }
      const g = groups.get(key);

      // course: keep first non-empty
      if (!g.course && r.course) g.course = r.course;

      // points: Singles sum; Fourball sum/2 (per your earlier logic)
      const div = r.format === "Fourball" ? 2 : 1;
      if (r.team === "Cali") g.caliPts += (r.points || 0) / div;
      if (r.team === "Tex-Mex") g.texPts += (r.points || 0) / div;
    }

    // round desc
    return Array.from(groups.values()).sort((a, b) => b.round - a.round);
  }

  function buildMatchRowsForRound(yearRows, round, format) {
    // Only rows for this round/format
    const subset = yearRows.filter((r) => r.round === round && r.format === format);

    // ✅ Group by Match_ID (preferred). Fallback to round|format|match if Match_ID missing.
    const byMatchId = new Map();
    for (const r of subset) {
      const key =
        (r.matchId && String(r.matchId).trim()) ||
        `${r.round}|${r.format}|${String(r.match ?? "").trim()}`;

      if (!byMatchId.has(key)) byMatchId.set(key, []);
      byMatchId.get(key).push(r);
    }

    // Sort match groups by Match (numeric) when available; else by Match_ID string.
    const matchKeys = Array.from(byMatchId.keys()).sort((a, b) => {
      const ra = byMatchId.get(a)?.[0];
      const rb = byMatchId.get(b)?.[0];
      const ma = Number(ra?.match);
      const mb = Number(rb?.match);
      if (Number.isFinite(ma) && Number.isFinite(mb)) return ma - mb;
      return String(a).localeCompare(String(b));
    });

    // Helpers for optional strokes display
    function leftLabel(player, strokes) {
      const s = String(strokes ?? "").trim();
      return s ? `${player} (${s})` : player;
    }
    function rightLabel(player, strokes) {
      const s = String(strokes ?? "").trim();
      return s ? `(${s}) ${player}` : player;
    }

    const out = [];

    for (const key of matchKeys) {
      const rows = byMatchId.get(key) || [];

      const cali = rows.filter((r) => r.team === "Cali");
      const tex = rows.filter((r) => r.team === "Tex-Mex");

      // Stable ordering inside a match so it doesn’t “jump” between renders
      cali.sort((a, b) => String(a.player).localeCompare(String(b.player)));
      tex.sort((a, b) => String(a.player).localeCompare(String(b.player)));

      // ---- Singles (1v1) ----
      if (format === "Singles") {
        const c = cali[0] || { player: "", result: "", strokes: "" };
        const t = tex[0] || { player: "", result: "", strokes: "" };

        const cWinClass = c.result === "Win" ? "win-cali" : "";
        const tWinClass = t.result === "Win" ? "win-tex" : "";

        const cName = leftLabel(String(c.player || ""), c.strokes);
        const tName = rightLabel(String(t.player || ""), t.strokes);

        out.push(`
          <tr class="year-row">
            <td title="${escapeHtml(cName)}">${escapeHtml(cName)}</td>
            <td class="center ${cWinClass}">${escapeHtml(c.result || "")}</td>
            <td class="center ${tWinClass}">${escapeHtml(t.result || "")}</td>
            <td class="trip-right" title="${escapeHtml(tName)}">${escapeHtml(tName)}</td>
          </tr>
        `);

        continue;
      }

      // ---- Fourball (2v2) w/ merged team result cells (Option B) ----
      // We expect exactly 2 Cali + 2 Tex rows in a well-formed match.
      const badCounts = !(cali.length === 2 && tex.length === 2);

      // Determine the team-level results (should match within each team)
      const caliRes1 = String(cali[0]?.result || "");
      const caliRes2 = String(cali[1]?.result || "");
      const texRes1 = String(tex[0]?.result || "");
      const texRes2 = String(tex[1]?.result || "");

      const caliMismatch = cali.length === 2 && caliRes1 !== caliRes2;
      const texMismatch = tex.length === 2 && texRes1 !== texRes2;

      const hasError = badCounts || caliMismatch || texMismatch;

      const mergedCaliText = hasError ? "ERROR" : caliRes1;
      const mergedTexText = hasError ? "ERROR" : texRes1;

      // Color rules:
      // - If ERROR: orange (cell-error)
      // - Else: blue only if result == Win
      const caliCellClass = hasError
        ? "cell-error"
        : (mergedCaliText === "Win" ? "win-cali" : "");

      const texCellClass = hasError
        ? "cell-error"
        : (mergedTexText === "Win" ? "win-tex" : "");

      // Render exactly 2 player rows (even if data is malformed, render what we have)
      for (let i = 0; i < 2; i++) {
        const c = cali[i] || { player: "", strokes: "" };
        const t = tex[i] || { player: "", strokes: "" };

        const cName = leftLabel(String(c.player || ""), c.strokes);
        const tName = rightLabel(String(t.player || ""), t.strokes);

        if (i === 0) {
          // First row: includes the merged result cells with rowspan=2
          out.push(`
            <tr class="year-row">
              <td title="${escapeHtml(cName)}">${escapeHtml(cName)}</td>
              <td class="center ${caliCellClass}" rowspan="2">${escapeHtml(mergedCaliText)}</td>
              <td class="center ${texCellClass}" rowspan="2">${escapeHtml(mergedTexText)}</td>
              <td class="trip-right" title="${escapeHtml(tName)}">${escapeHtml(tName)}</td>
            </tr>
          `);
        } else {
          // Second row: players only, no CA/TX cells (since they are merged above)
          out.push(`
            <tr class="year-row">
              <td title="${escapeHtml(cName)}">${escapeHtml(cName)}</td>
              <td class="trip-right" title="${escapeHtml(tName)}">${escapeHtml(tName)}</td>
            </tr>
          `);
        }
      }
    }

    return out.join("");
  }

  async function init() {
    // Ensure full log is loaded (same loader Team Results uses)
    try {
      await ensureMatchLogFullLoaded(sourceKey);
    } catch (e) {
      console.error(e);
      setStatusHTML(`<div class="meta"><span>Failed to load Master Match Log.</span></div>`);
      return;
    }

    // Available years (no "All")
    const years = Array.from(bucket.byYear.keys()).filter((y) => Number.isFinite(y));
    years.sort((a, b) => b - a);
    sb.availableYears = years;

    // Default year = highest
    if (!Number.isFinite(sb.selectedYear)) sb.selectedYear = years[0];

    render();
  }

  function render() {
    const year = sb.selectedYear;
    const yearRows = bucket.byYear.get(year) || [];

    // Trip: take first non-empty trip
    const trip = (yearRows.find((r) => r.trip)?.trip) || "";

    setMetaLine(year, trip);

    // Top pills row (just like Team Results)
    const caliTotal = sumTeamPoints(yearRows, "Cali");
    const texTotal = sumTeamPoints(yearRows, "Tex-Mex");

    // Insert pills ABOVE the table (without changing global layout)
    // We reuse the same .team-pills and .team-pill styles you already have.
    const pillsHtml = `
      <div class="team-pills" style="margin-bottom: 10px;">
        <div class="team-pill pill-cali">Cali Points: ${caliTotal.toFixed(1)}</div>
        <div class="team-pill pill-tex">Tex-Mex Points: ${texTotal.toFixed(1)}</div>
      </div>
    `;

    // Put pills above tablewrap
    const summary = viewBodyEl.querySelector(".team-summary");
    const existing = summary.querySelector(".team-pills");
    if (existing) existing.remove();
    summary.insertAdjacentHTML("afterbegin", pillsHtml);

    const rounds = buildRoundGroups(yearRows);

    const html = [];
    for (const g of rounds) {
      const isExpanded = sb.expandedKeys.has(g.key);
      const chev = isExpanded ? "▾" : "▸";

      const label = `Rnd ${g.round} - ${g.format}`;

      html.push(`
        <tr class="player-row" data-rowtype="round" data-key="${escapeHtml(g.key)}">
          <td title="${escapeHtml(label)}"><span class="chev">${chev}</span>${escapeHtml(label)}</td>
          <td class="center sb-cali">${g.caliPts.toFixed(1)}</td>
          <td class="center sb-tex">${g.texPts.toFixed(1)}</td>
          <td class="trip-right" title="${escapeHtml(g.course)}">${escapeHtml(g.course)}</td>
        </tr>
      `);

      if (isExpanded) {
        html.push(buildMatchRowsForRound(yearRows, g.round, g.format));
      }
    }

    tbodyEl.innerHTML = html.join("");
  }

  // Expand/collapse
  tbodyEl.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-rowtype='round']");
    if (!row) return;

    const key = row.dataset.key;
    if (!key) return;

    if (sb.expandedKeys.has(key)) sb.expandedKeys.delete(key);
    else sb.expandedKeys.add(key);

    render();
  });

  init();
}

/***********************
 * Head-to-Head Dominance (Singles only)
 ***********************/
async function ensureH2HLoaded() {
  const h2h = state.h2h;
  if (h2h.rows.length) return;

  const raw = await getMasterMatchLogRaw();

  // Normalize raw match log rows into H2H-friendly objects
  const normalized = raw
    .filter((r) => r.Player && r.Year && String(r.Format || "").trim())
    .map((r) => {
      const year = Number(String(r.Year).trim());
      const player = String(r.Player || "").trim();

      const match = Number(String(r.Match || "").trim());
      const round = Number(String(r.Round || "").trim());
      const matchId = String(
        r.Match_ID || r.MatchId || `${year}-${round}-${match}`
      ).trim();

      const format = String(r.Format || "").trim();
      const team = String(r.Team || "").trim();
      const partner = String(r.Partner || "").trim();
      const opponent = String(r.Opponent || "").trim();

      const w = toNumber(r.W);
      const l = toNumber(r.L);
      const h = toNumber(r.H);
      const points = toNumber(r.Points);
      const ptsdiff = toNumber(r.Pts_Diff);

      return {
        year,
        player,
        opponent,
        partner,
        team,
        format,
        w,
        l,
        h,
        points,
        ptsdiff,
        matchId,
      };
    })
    .filter((r) => Number.isFinite(r.year) && r.player);

  // Use normalized data from here forward
  raw.length = 0;
  raw.push(...normalized);

  // Derive Opponent from Match_ID if missing
  const byMatch = new Map();
  for (const r of raw) {
    if (!byMatch.has(r.matchId)) byMatch.set(r.matchId, []);
    byMatch.get(r.matchId).push(r);
  }
  for (const arr of byMatch.values()) {
  // Only derive missing opponent for Singles-style matches (2 rows)
  if (arr.length !== 2) continue;

  for (const r of arr) {
    if (r.opponent) continue;
    const other = arr.find((x) => x !== r && x.player);
    if (other) r.opponent = other.player;
  }
}

  h2h.availableYears = Array.from(new Set(raw.map((r) => r.year))).sort((a, b) => b - a);
  h2h.rows = raw;
}

function ptsDiffClass(val) {
  if (!Number.isFinite(val)) return "";
  if (val >= 3) return "ptsdiff-pos-strong";
  if (val > 0) return "ptsdiff-pos";
  if (val <= -3) return "ptsdiff-neg-strong";
  if (val < 0) return "ptsdiff-neg";
  return "";
}

function fmtPtsDiff(v) {
  const n = toNumber(v);
  if (n === null) return "";
  return n > 0 ? `+${fmtInt(n)}` : `${fmtInt(n)}`;
}

function renderHeadToHeadDominance() {
  const h2h = state.h2h;
  viewControlsEl.innerHTML = "";

  viewBodyEl.innerHTML = `
    <div class="tablewrap">
      <table class="table" aria-label="Head-to-head dominance table">
        <colgroup>
          <col style="width: 39%" />
          <col style="width: 10%" />
          <col style="width: 9%" />
          <col style="width: 9%" />
          <col style="width: 15%" />
          <col style="width: 18%" />
        </colgroup>
        <thead>
          <tr>
            <th class="sortable" data-col="player">Player<span class="sort-ind" id="h2hSortPlayer"></span></th>
            <th class="center sortable" data-col="w">W<span class="sort-ind" id="h2hSortW"></span></th>
            <th class="center sortable" data-col="l">L<span class="sort-ind" id="h2hSortL"></span></th>
            <th class="center sortable" data-col="h">H<span class="sort-ind" id="h2hSortH"></span></th>
            <th class="center sortable" data-col="ptspct">Pt%<span class="sort-ind" id="h2hSortPtsPct"></span></th>
            <th class="center sortable" data-col="ptsdiff">PtDiff<span class="sort-ind" id="h2hSortPts"></span></th>
          </tr>
        </thead>
        <tbody id="tbodyH2H"></tbody>
      </table>
    </div>

    <p class="hint">Tap a player row to expand. Tap again to collapse.</p>
  `;

  const tbodyEl = document.getElementById("tbodyH2H");
  const thead = viewBodyEl.querySelector("thead");

  function renderStatus(playersCount) {
    const years = ["All", ...h2h.availableYears.map(String)];
    const yearLabel = h2h.selectedYear === "All" ? "All" : String(h2h.selectedYear);

    const modes = [
      { value: "singles_opp", label: "Singles vs Opponent" },
      { value: "fourball_opp", label: "Fourball vs Opponent" },
      { value: "fourball_partner", label: "Fourball with Partner" },
    ];

    const modeObj = modes.find(m => m.value === h2h.mode) || modes[0];

    setStatusHTML(`
      <div class="meta">
        <span class="meta-btn">
          Year: <strong>${escapeHtml(yearLabel)}</strong>
          <select class="chip-select" id="h2hYearSelect" aria-label="Year filter">
            ${years.map(y => `<option value="${escapeHtml(y)}"${y===yearLabel?" selected":""}>${escapeHtml(y)}</option>`).join("")}
          </select>
        </span>

        <span class="meta-btn">
          Mode: <strong>${escapeHtml(modeObj.label)}</strong>
          <select class="chip-select" id="h2hModeSelect" aria-label="Mode filter">
            ${modes.map(m => `<option value="${escapeHtml(m.value)}"${m.value===h2h.mode?" selected":""}>${escapeHtml(m.label)}</option>`).join("")}
          </select>
        </span>

      </div>
    `);

    const sel = document.getElementById("h2hYearSelect");
    sel?.addEventListener("change", () => {
      h2h.selectedYear = sel.value === "All" ? "All" : Number(sel.value);
      h2h.expandedPlayers.clear();
      h2h.sort = { col: null, dir: null };
      render();
    });

    document.getElementById("h2hModeSelect")?.addEventListener("change", (e) => {
      h2h.mode = e.target.value;
      h2h.expandedPlayers.clear();
      h2h.sort = { col: null, dir: null }; // optional, matches how you reset on year change
      render();
    });
  }

  function aggregateCollapsed() {
    const yearFilter = h2h.selectedYear;
    const mode = h2h.mode || "singles_opp";

    // Filter year first
    let rows = yearFilter === "All" ? h2h.rows : h2h.rows.filter((r) => r.year === yearFilter);

    // Mode-specific format filter
    if (mode === "singles_opp") {
      rows = rows.filter((r) => String(r.format).toLowerCase() === "singles");
    } else {
      rows = rows.filter((r) => String(r.format).toLowerCase() === "fourball");
    }

    const byPlayer = new Map();

    function ensurePlayer(playerName) {
      if (!byPlayer.has(playerName)) {
        byPlayer.set(playerName, {
          player: playerName,
          w: 0, l: 0, h: 0,
          points: 0,
          ptsdiff: 0,
          opp: new Map(), // key => opponent OR partner label
        });
      }
      return byPlayer.get(playerName);
    }

    function ensureOpp(pObj, keyLabel) {
      if (!pObj.opp.has(keyLabel)) {
        pObj.opp.set(keyLabel, { opp: keyLabel, w: 0, l: 0, h: 0, points: 0, ptsdiff: 0 });
      }
      return pObj.opp.get(keyLabel);
    }

    function addPct(obj) {
      const denom = (obj.w || 0) + (obj.l || 0) + (obj.h || 0);
      obj.ptspct = denom > 0 ? (obj.points || 0) / denom : 0;
    }

    // ----- Mode 1: Singles vs Opponent (your original logic) -----
    if (mode === "singles_opp") {
      for (const r of rows) {
        const p = ensurePlayer(r.player);
        p.w += r.w || 0;
        p.l += r.l || 0;
        p.h += r.h || 0;
        p.points += r.points || 0;
        p.ptsdiff += r.ptsdiff || 0;

        if (r.opponent) {
          const o = ensureOpp(p, r.opponent);
          o.w += r.w || 0;
          o.l += r.l || 0;
          o.h += r.h || 0;
          o.points += r.points || 0;
          o.ptsdiff += r.ptsdiff || 0;
        }
      }

      const out = Array.from(byPlayer.values());
      for (const p of out) {
        addPct(p);
        for (const o of p.opp.values()) addPct(o);
      }
      return out;
    }

    // For fourball modes we need grouping by Match_ID
    const byMatch = new Map();
    for (const r of rows) {
      const key = r.matchId || "";
      if (!key) continue;
      if (!byMatch.has(key)) byMatch.set(key, []);
      byMatch.get(key).push(r);
    }

    // ----- Mode 2: Fourball vs Opponent -----
    if (mode === "fourball_opp") {
      for (const matchRows of byMatch.values()) {
        const cali = matchRows.filter((x) => x.team === "Cali");
        const tex  = matchRows.filter((x) => x.team === "Tex-Mex");

        // For each row/player, create 2 opponent entries (the two players on other team)
        for (const r of matchRows) {
          const p = ensurePlayer(r.player);

          // collapsed totals (NOT divided)
          p.w += r.w || 0;
          p.l += r.l || 0;
          p.h += r.h || 0;
          p.points += r.points || 0;
          p.ptsdiff += r.ptsdiff || 0;

          const oppList = (r.team === "Cali" ? tex : cali).map((x) => x.player).filter(Boolean);

          for (const oppName of oppList) {
            const o = ensureOpp(p, oppName);

            // IMPORTANT per your decision:
            // W/L/H are NOT divided by 2.
            o.w += r.w || 0;
            o.l += r.l || 0;
            o.h += r.h || 0;
            o.points += r.points || 0;

            // Pts_Diff IS divided by 2 only in this mode’s expanded rows
            o.ptsdiff += (r.ptsdiff || 0) / 2;
          }
        }
      }

      const out = Array.from(byPlayer.values());
      for (const p of out) {
        addPct(p);
        for (const o of p.opp.values()) addPct(o);
      }
      return out;
    }

    // ----- Mode 3: Fourball with Partner -----
    // Use r.partner if present; otherwise derive from the other same-team player in the Match_ID group
    for (const matchRows of byMatch.values()) {
      const cali = matchRows.filter((x) => x.team === "Cali");
      const tex  = matchRows.filter((x) => x.team === "Tex-Mex");

      function derivedPartner(r) {
        const teamRows = r.team === "Cali" ? cali : tex;
        const other = teamRows.find((x) => x.player && x.player !== r.player);
        return other ? other.player : "";
      }

      for (const r of matchRows) {
        const p = ensurePlayer(r.player);

        // collapsed totals
        p.w += r.w || 0;
        p.l += r.l || 0;
        p.h += r.h || 0;
        p.points += r.points || 0;
        p.ptsdiff += r.ptsdiff || 0;

        const partnerName = (r.partner && r.partner.trim()) ? r.partner.trim() : derivedPartner(r);

        if (partnerName) {
          const o = ensureOpp(p, partnerName);
          o.w += r.w || 0;
          o.l += r.l || 0;
          o.h += r.h || 0;
          o.points += r.points || 0;
          o.ptsdiff += r.ptsdiff || 0;
        }
      }
    }

    const out = Array.from(byPlayer.values());
    for (const p of out) {
      addPct(p);
      for (const o of p.opp.values()) addPct(o);
    }
    return out;
  }

  function applyCollapsedSort(rows) {
    const sortCol = h2h.sort.col || h2h.defaultSort.col;
    const sortDir = h2h.sort.dir || h2h.defaultSort.dir;
    const dirMul = sortDir === "asc" ? 1 : -1;

    return rows.slice().sort((a, b) => {
      const primary = cmp(a[sortCol], b[sortCol]) * dirMul;
      if (primary !== 0) return primary;
      return cmp(a.player, b.player);
    });
  }

  function setSortIndicator() {
    const col = h2h.sort.col || h2h.defaultSort.col;
    const dir = h2h.sort.dir || h2h.defaultSort.dir;
    const map = {
      player: "h2hSortPlayer",
      w: "h2hSortW",
      l: "h2hSortL",
      h: "h2hSortH",
      ptspct: "h2hSortPtsPct",
      ptsdiff: "h2hSortPts",
    };
    Object.values(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    const el = document.getElementById(map[col]);
    if (el) el.textContent = dir === "asc" ? " ▲" : " ▼";
  }

  function onHeaderClick(e) {
    const th = e.target.closest("th");
    if (!th?.dataset?.col) return;
    const col = th.dataset.col;

    const defaultCol = h2h.defaultSort.col;
    const defaultDir = h2h.defaultSort.dir;

    if ((h2h.sort.col || defaultCol) !== col) {
      h2h.sort = { col, dir: "desc" };
    } else if ((h2h.sort.dir || defaultDir) === "desc") {
      h2h.sort = { col, dir: "asc" };
    } else if ((h2h.sort.dir || defaultDir) === "asc") {
      h2h.sort = { col: null, dir: null };
    } else {
      h2h.sort = { col, dir: "desc" };
    }

    render();
  }

  thead.addEventListener("click", onHeaderClick);

  async function render() {
    try {
      setStatusHTML("Loading…");
      await ensureH2HLoaded();

      const collapsed = applyCollapsedSort(aggregateCollapsed());
      renderStatus(collapsed.length);
      setSortIndicator();

      const rowsHtml = [];
      for (const p of collapsed) {
        const isOpen = h2h.expandedPlayers.has(p.player);
        const chev = isOpen ? "▾" : "▸";

        rowsHtml.push(`
          <tr class="player-row" data-player="${escapeHtml(p.player)}">
            <td><span class="chev">${chev}</span>${escapeHtml(p.player)}</td>
            <td class="center">${fmtInt(p.w)}</td>
            <td class="center">${fmtInt(p.l)}</td>
            <td class="center">${fmtInt(p.h)}</td>
            <td class="center">${(((p.points || 0) / Math.max(1, (p.w || 0) + (p.l || 0) + (p.h || 0))) * 100).toFixed(1)}%</td>
            <td class="center ${ptsDiffClass(p.ptsdiff)}">${fmtPtsDiff(p.ptsdiff)}</td>
          </tr>
        `);

        if (isOpen) {
          const oppRows = Array.from(p.opp.values())
            .sort((a, b) => cmp(a.ptsdiff, b.ptsdiff) * -1 || cmp(a.opp, b.opp));
          const prefix = (h2h.mode === "fourball_partner") ? "with" : "vs.";

          for (const o of oppRows) {
            rowsHtml.push(`
              <tr class="year-row">
                <td title="${escapeHtml(`${prefix} ${o.opp}`)}">${escapeHtml(`${prefix} ${o.opp}`)}</td>
                <td class="center">${fmtInt(o.w)}</td>
                <td class="center">${fmtInt(o.l)}</td>
                <td class="center">${fmtInt(o.h)}</td>
                <td class="center">${(((o.points || 0) / Math.max(1, (o.w || 0) + (o.l || 0) + (o.h || 0))) * 100).toFixed(1)}%</td>
                <td class="center ${ptsDiffClass(o.ptsdiff)}">${fmtPtsDiff(o.ptsdiff)}</td>
              </tr>
            `);
          }
        }
      }

      tbodyEl.innerHTML = rowsHtml.join("");

      tbodyEl.querySelectorAll("tr.player-row").forEach((tr) => {
        tr.addEventListener("click", () => {
          const player = tr.dataset.player;
          if (!player) return;
          if (h2h.expandedPlayers.has(player)) h2h.expandedPlayers.delete(player);
          else h2h.expandedPlayers.add(player);
          render();
        });
      });
    } catch (err) {
      console.error(err);
      setStatusHTML(`<span style="color:#ffb4b4">Error loading Head-to-Head data.</span>`);
      tbodyEl.innerHTML = "";
    }
  }

  render();
}

/***********************
 * AI Bundles (Step 2)
 *
 * Goal: Build compact, LLM-friendly "bundles" that are derived from the
 * same data already used by the app (normalized match log rows).
 *
 * Conventions:
 * - Use plain, human terms in headers: "Point %", "Points Differential", etc.
 * - Percentages are strings like "32.4%".
 * - Fourball TEAM aggregation (team totals, round totals, match totals) divides by 2.
 *   Player-level stats DO NOT divide by 2.
 ***********************/

/***************
 * Markdown table helper
 ***************/
function mdTable(headers, rows) {
  const esc = (v) => String(v ?? "").replaceAll("|", "\\|");
  const head = `| ${headers.map(esc).join(" | ")} |`;
  const sep  = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = (rows || []).map(r => `| ${r.map(esc).join(" | ")} |`).join("\n");
  return [head, sep, body].filter(Boolean).join("\n");
}

/***************
 * Formatting helpers (LLM-friendly)
 ***************/
function fmtPct01(p) {
  const x = Number(p);
  if (!Number.isFinite(x)) return "";
  return `${(x * 100).toFixed(1)}%`;
}
function fmtNum(n, digits = 1) {
  const x = Number(n);
  if (!Number.isFinite(x)) return "";
  return x.toFixed(digits);
}

/***************
 * Normalized sources
 ***************/
async function getMasterNormalizedMatchRows() {
  // ensureMatchLogFullLoaded("master") normalizes header casing + data types
  await ensureMatchLogFullLoaded("master");
  return cache.matchLogFull.master.rows;
}

async function getTeamResultsNormalized() {
  const raw = await getMasterTeamResultsRaw();
  return (raw || [])
    .map(r => ({
      year: Number(String(r.Year ?? "").trim()),
      trip: String(r.Trip ?? "").trim(),
      location: String(r.Location ?? "").trim(),
      winningTeam: String(r["Winning Team"] ?? r.WinningTeam ?? "").trim(),
      caliPoints: toNumber(r["Cali Points"] ?? r.CaliPoints ?? r.Cali),
      texPoints:  toNumber(r["Tex-Mex Points"] ?? r["Tex-Mex"] ?? r.TexMexPoints ?? r.TexMex),
    }))
    .filter(r => Number.isFinite(r.year))
    .sort((a,b) => b.year - a.year);
}

/***********************
 * AI PROMPT URLS
 * Keyed by "SCENARIO|Style". Fetched from published Google Docs on first use
 * and cached in memory — edit the docs without touching the code.
 * The YEAR placeholder in YEAR_TRIP_SUMMARY prompts is replaced at runtime.
 ***********************/
const PROMPT_URLS = {
  "YEAR_TRIP_SUMMARY|SportsCenter":   "https://docs.google.com/document/d/e/2PACX-1vRYKFf7iwT8Noux-5eIyu2jKrckVOPAy3hK0ozK0rrFR1PIS0Sb8OoLAc5GmbC8eMQBfGfFbA4tip2Q/pub",
  "YEAR_TRIP_SUMMARY|Locker-Room":    "https://docs.google.com/document/d/e/2PACX-1vQ0DP-twP1vvzM6UCXHc-_AZoLgt2J_JuT6v55GcoC39CvEQS600ZOAgR7ihhk8H0tpd2e7pyLJlcCd/pub",
  "PLAYER_PROFILE|SportsCenter":      "https://docs.google.com/document/d/e/2PACX-1vQPDZWQV_PM1y6nG_TGFV8r1bZHdzlenSjvoCt2mB4II1__M2cK_uCm4J30WYqXy6iFXU-gzCcE_fje/pub",
  "PLAYER_PROFILE|Locker-Room":       "https://docs.google.com/document/d/e/2PACX-1vRonL9axnSByuY8KX6zuHuqkfMGkyWd4XodHzrq1vOmJlo-vpbRYw-yqdJjERqqaX8Mot8BjncF-XhC/pub",
  "SINGLES_PREDICTION|SportsCenter":  "https://docs.google.com/document/d/e/2PACX-1vTbg_vztH5-U-ywtwXnmfppicpfpp3XMooAX5qAaTr9a5hZJZ0PclwdNgTqR6lPaoVBqjuMGYeAbh24/pub",
  "SINGLES_PREDICTION|Locker-Room":   "https://docs.google.com/document/d/e/2PACX-1vSMknHqIkhXHKurGrZngdRdGmYrhnt0JHHU2kGtqhmwwEIRnJ1rZj4Sza9lPFWEnb-tKGMVU2xhdWT2/pub",
  "FOURBALL_PREDICTION|SportsCenter": "https://docs.google.com/document/d/e/2PACX-1vSwfX1jAbsw39AnwHrNJL9sVY6M5Rj0j88e3Xv5fK-7yMUwVj-nqgVv_Ketx7S74Ex_Rc4_qBnKcvE1/pub",
  "FOURBALL_PREDICTION|Locker-Room":  "https://docs.google.com/document/d/e/2PACX-1vSOIrRHSvRFmKboPdqUXjxR_jxauok-tJfodBMx3AODIqaTlwXRJ4o3F2LtEkT0mkC-mxduFU9grcZy/pub",
};

const _promptCache = {};

async function loadPrompt(key) {
  if (_promptCache[key]) return _promptCache[key];
  const url = PROMPT_URLS[key];
  if (!url) return "";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch prompt (${res.status})`);
  const html = await res.text();
  // Google Docs published HTML uses h1-h6 for section headings and li for bullets.
  // Use DOMParser to isolate the doc body, then convert block elements to newlines.
  const doc = new DOMParser().parseFromString(html, "text/html");
  const content = doc.querySelector(".doc-content") || doc.body;
  const text = content.innerHTML
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  _promptCache[key] = text;
  return text;
}

/***************
 * Bundle entrypoint
 ***************/
async function buildAIBundle({ scenario, style, selections }) {
  const base = {
    version: "ai-bundle-v2",
    scenario,
    style,
    inputs: selections,
    generatedAtISO: new Date().toISOString(),
    tables: [],
    facts: {},
    rarityFacts: [],
  };

  if (scenario === "YEAR_TRIP_SUMMARY") return buildBundleYearTripSummary(base);
  if (scenario === "PLAYER_PROFILE") return buildBundlePlayerProfile(base);
  if (scenario === "SINGLES_PREDICTION") return buildBundleSinglesPrediction(base);
  if (scenario === "FOURBALL_PREDICTION") return buildBundleFourballPrediction(base);

  throw new Error(`Unknown scenario: ${scenario}`);
}

/******************************************************************
 * Shared aggregation helpers
 ******************************************************************/
function computePointsFromResult(result) {
  if (result === "Win") return 1;
  if (result === "Halved") return 0.5;
  return 0;
}

function rowPoints(r) {
  const ptsRaw = Number(r.points ?? r.Points);
  if (Number.isFinite(ptsRaw)) return ptsRaw;
  const res = String(r.result ?? r.Result ?? "").trim();
  return computePointsFromResult(res);
}

function rowPtsDiff(r) {
  const pd = Number(r.ptsdiff ?? r.Pts_Diff ?? r.PtsDiff);
  return Number.isFinite(pd) ? pd : 0;
}

function rowW(r) { const x = Number(r.w ?? r.W); return Number.isFinite(x) ? x : 0; }
function rowL(r) { const x = Number(r.l ?? r.L); return Number.isFinite(x) ? x : 0; }
function rowH(r) { const x = Number(r.h ?? r.H); return Number.isFinite(x) ? x : 0; }

function aggInit() {
  return { matches: 0, wins: 0, losses: 0, halved: 0, points: 0, ptsDiff: 0 };
}

function aggAdd(agg, r) {
  agg.matches += 1;
  agg.wins += rowW(r);
  agg.losses += rowL(r);
  agg.halved += rowH(r);
  agg.points += rowPoints(r);
  agg.ptsDiff += rowPtsDiff(r);
}

function aggFinalize(agg) {
  const pct = agg.matches ? (agg.points / agg.matches) : 0;
  return { ...agg, pointPct01: pct };
}

/** Competition ranks (ties share rank; next rank jumps) */
function buildCompetitionRanks(items, valueGetter) {
  // Competition ranking (a.k.a. "1224" ranking): ties share the same rank, next rank jumps by tie size.
  // Returns Map(playerName -> { rank, total, percentile })
  const sorted = items.slice().sort((a, b) => (valueGetter(b) - valueGetter(a)));
  const total = sorted.length;

  const percentileFromRank = (rank) => {
    if (!total || total <= 1 || rank == null) return 100;
    return Math.round(((total - rank) / (total - 1)) * 1000) / 10; // 1 decimal
  };

  const out = new Map();
  let i = 0;
  while (i < sorted.length) {
    const v = valueGetter(sorted[i]);
    let j = i;
    while (j < sorted.length && valueGetter(sorted[j]) === v) j++;

    const rank = i + 1;
    const percentile = percentileFromRank(rank);

    for (let k = i; k < j; k++) {
      out.set(sorted[k].player, { rank, total, percentile });
    }
    i = j;
  }
  return out;
}

/******************************************************************
 * Player Profile bundle
 ******************************************************************/
async function buildBundlePlayerProfile(base) {
  const playerName = String(base.inputs?.player || "").trim();
  if (!playerName) {
    base.facts = { Error: "No player supplied in inputs." };
    return base;
  }

  const masterRows = await getMasterNormalizedMatchRows();   // normalized match log (all years)
  const teamRows   = await getTeamResultsNormalized();       // per-year trip/location/winner/points

  // ---- Collect this player's rows (All / Singles / Fourball) ----
  const playerRows = masterRows.filter(r => String(r.player || "").trim() === playerName);
  if (!playerRows.length) {
    base.facts = { Error: `Player "${playerName}" not found in Master Match Log.` };
    return base;
  }

  const singlesRows  = playerRows.filter(r => String(r.format || "").trim() === "Singles");
  const fourballRows = playerRows.filter(r => String(r.format || "").trim() === "Fourball");

  // ---- Aggregate helpers (use shared aggInit/aggAdd/aggFinalize) ----
  function aggregate(rows) {
    const agg = aggInit();
    for (const r of rows) aggAdd(agg, r);
    return aggFinalize(agg);
  }

  // ---- Year-by-year service record ----
  const yearMap = new Map(); // year -> rows
  for (const r of playerRows) {
    const y = Number(r.year);
    if (!Number.isFinite(y)) continue;
    if (!yearMap.has(y)) yearMap.set(y, []);
    yearMap.get(y).push(r);
  }
  const yearsDesc = Array.from(yearMap.keys()).sort((a,b) => b - a);

  const serviceRecordRows = yearsDesc.map(y => {
    const rowsY = yearMap.get(y) || [];
    const aggY = aggregate(rowsY);

    const teamRow = teamRows.find(tr => tr.year === y);
    const trip = teamRow ? teamRow.trip : "";
    const winningTeam = teamRow ? teamRow.winningTeam : "";
    const team = String(rowsY[0]?.team || "").trim();

    return {
      year: y,
      trip,
      team,
      winningTeam,
      matches: aggY.matches,
      record: `${aggY.wins}-${aggY.losses}-${aggY.halved}`,
      points: aggY.points,
      pointPct01: aggY.pointPct01,
      ptsDiff: aggY.ptsDiff,
    };
  });

  const yearsParticipating = serviceRecordRows.length;
  const yearsOnWinningTeam = serviceRecordRows.filter(r => r.team && r.winningTeam && r.team === r.winningTeam).length;

  // ---- Format split (All / Singles / Fourball) ----
  const aggAll      = aggregate(playerRows);
  const aggSingles  = aggregate(singlesRows);
  const aggFourball = aggregate(fourballRows);

  const formatSplitRows = [
    { format: "All",      agg: aggAll },
    { format: "Singles",  agg: aggSingles },
    { format: "Fourball", agg: aggFourball },
  ].map(x => ({
    format: x.format,
    matches: x.agg.matches,
    record: `${x.agg.wins}-${x.agg.losses}-${x.agg.halved}`,
    points: x.agg.points,
    pointPct01: x.agg.pointPct01,
    ptsDiff: x.agg.ptsDiff,
  }));

  // ---- Point % by round (All years). Exclude Round 5. Only "All Point %". ----
  const roundAgg = new Map(); // round -> agg
  for (const r of playerRows) {
    const roundNum = Number(r.round);
    if (!Number.isFinite(roundNum) || roundNum === 5) continue;
    if (!roundAgg.has(roundNum)) roundAgg.set(roundNum, aggInit());
    aggAdd(roundAgg.get(roundNum), r);
  }
  const roundPctRows = Array.from(roundAgg.entries())
    .map(([round, agg]) => ({ round, pct01: aggFinalize(agg).pointPct01 }))
    .sort((a,b) => a.round - b.round);

  // ---- Singles vs Opponent (Opponent exists in data) ----
  const singlesOppMap = new Map(); // opponent -> rows
  for (const r of singlesRows) {
    const opp = String(r.opponent || "").trim();
    if (!opp) continue;
    if (!singlesOppMap.has(opp)) singlesOppMap.set(opp, []);
    singlesOppMap.get(opp).push(r);
  }

  const singlesVsOppRows = Array.from(singlesOppMap.entries()).map(([opponent, rowsO]) => {
    const a = aggregate(rowsO);
    return {
      opponent,
      matches: a.matches,
      record: `${a.wins}-${a.losses}-${a.halved}`,
      points: a.points,
      pointPct01: a.pointPct01,
      ptsDiff: a.ptsDiff,
    };
  }).sort((a,b) => b.ptsDiff - a.ptsDiff || b.matches - a.matches);

  // Nemesis / Patsy (Singles only) – tie-aware list
  const nemesisList = singlesVsOppRows.length
    ? (() => {
        const minVal = Math.min(...singlesVsOppRows.map(o => o.ptsDiff));
        return singlesVsOppRows.filter(o => o.ptsDiff === minVal);
      })()
    : [];
  const patsyList = singlesVsOppRows.length
    ? (() => {
        const maxVal = Math.max(...singlesVsOppRows.map(o => o.ptsDiff));
        return singlesVsOppRows.filter(o => o.ptsDiff === maxVal);
      })()
    : [];

  // ---- Fourball with Partner (Partner exists in data) ----
  const partnerMap = new Map(); // partner -> rows
  for (const r of fourballRows) {
    const partner = String(r.partner || "").trim();
    if (!partner) continue;
    if (!partnerMap.has(partner)) partnerMap.set(partner, []);
    partnerMap.get(partner).push(r);
  }

  const fourballWithPartnerRows = Array.from(partnerMap.entries()).map(([partner, rowsP]) => {
    const a = aggregate(rowsP);
    return {
      partner,
      matches: a.matches,
      record: `${a.wins}-${a.losses}-${a.halved}`,
      points: a.points,
      pointPct01: a.pointPct01,
      ptsDiff: a.ptsDiff,
    };
  }).sort((a,b) => b.ptsDiff - a.ptsDiff || b.matches - a.matches);

  // ---- Fourball vs Opponents (compute opponent list via Match_ID + Team) ----
  // In Fourball, each match has 4 rows (2 per team) sharing matchId.
  // We build match groups, find the two opposing players, then assign that opponent pair to each player row.
  const fourballByMatch = new Map(); // matchId -> rows
  for (const r of fourballRows) {
    const mid = String(r.matchId || "").trim();
    if (!mid) continue;
    if (!fourballByMatch.has(mid)) fourballByMatch.set(mid, []);
    fourballByMatch.get(mid).push(r);
  }

  const fourballOppMap = new Map(); // "Opp1 & Opp2" -> rows
  for (const [mid, grpSelf] of fourballByMatch.entries()) {
    // Need full match group (all 4 players) from masterRows
    const full = masterRows.filter(r => String(r.matchId || "").trim() === mid);
    if (full.length < 4) continue;

    const myTeam = String(grpSelf[0]?.team || "").trim();
    const oppPlayers = full
      .filter(r => String(r.team || "").trim() && String(r.team || "").trim() !== myTeam)
      .map(r => String(r.player || "").trim())
      .filter(Boolean);

    // Make a stable label: sorted unique opponent names joined with " + "
    const uniq = Array.from(new Set(oppPlayers)).sort((a,b) => a.localeCompare(b));
    if (!uniq.length) continue;
    const label = uniq.join(" + ");

    if (!fourballOppMap.has(label)) fourballOppMap.set(label, []);
    // Add THIS player's two rows for this match (grpSelf). In the log, player appears once per match; but safe.
    for (const r of grpSelf) fourballOppMap.get(label).push(r);
  }

  const fourballVsOppRows = Array.from(fourballOppMap.entries()).map(([opponents, rowsO]) => {
    const a = aggregate(rowsO);
    return {
      opponents,
      matches: a.matches,
      record: `${a.wins}-${a.losses}-${a.halved}`,
      points: a.points,
      pointPct01: a.pointPct01,
      ptsDiff: a.ptsDiff,
    };
  }).sort((a,b) => b.ptsDiff - a.ptsDiff || b.matches - a.matches);

  // ---- Best / Worst year(s) by Point % (tie-aware) ----
  const bestYears = [];
  const worstYears = [];
  if (serviceRecordRows.length) {
    const maxPct = Math.max(...serviceRecordRows.map(r => r.pointPct01));
    const minPct = Math.min(...serviceRecordRows.map(r => r.pointPct01));
    for (const r of serviceRecordRows) {
      if (r.pointPct01 === maxPct) bestYears.push({ Year: r.year, Trip: r.trip, "Point %": fmtPct01(r.pointPct01) });
      if (r.pointPct01 === minPct) worstYears.push({ Year: r.year, Trip: r.trip, "Point %": fmtPct01(r.pointPct01) });
    }
  }

  // ---- MVP / Not-So MVP counts (tie-aware per year; based on YEAR point %) ----
  // Build per-player-per-year point% for ALL players so we can:
  //  1) mark MVP/NotSo in service record table
  //  2) count MVPs and NotSo MVPs for the selected player
  const allByPlayerYear = new Map(); // player -> year -> aggFinal
  for (const r of masterRows) {
    const p = String(r.player || "").trim();
    const y = Number(r.year);
    if (!p || !Number.isFinite(y)) continue;
    if (!allByPlayerYear.has(p)) allByPlayerYear.set(p, new Map());
    const ymap = allByPlayerYear.get(p);
    if (!ymap.has(y)) ymap.set(y, aggInit());
    aggAdd(ymap.get(y), r);
  }
  // finalize to store pointPct01 for each (player, year)
  for (const [, ymap] of allByPlayerYear.entries()) {
    for (const [y, agg] of ymap.entries()) {
      ymap.set(y, aggFinalize(agg));
    }
  }

  const mvpYears = [];
  const notSoYears = [];
  // Per year min/max across players present
  const yearsAll = Array.from(new Set(teamRows.map(t => t.year))).sort((a,b) => a - b);
  for (const y of yearsAll) {
    // collect pcts for players who played that year
    const pcts = [];
    for (const [p, ymap] of allByPlayerYear.entries()) {
      const a = ymap.get(y);
      if (a && a.matches > 0) pcts.push({ player: p, pct: a.pointPct01 });
    }
    if (!pcts.length) continue;
    const maxPct = Math.max(...pcts.map(x => x.pct));
    const minPct = Math.min(...pcts.map(x => x.pct));

    if (pcts.find(x => x.player === playerName && x.pct === maxPct)) {
      const tr = teamRows.find(t => t.year === y);
      mvpYears.push({ Year: y, Trip: tr ? tr.trip : "", "Point %": fmtPct01(maxPct) });
    }
    if (pcts.find(x => x.player === playerName && x.pct === minPct)) {
      const tr = teamRows.find(t => t.year === y);
      notSoYears.push({ Year: y, Trip: tr ? tr.trip : "", "Point %": fmtPct01(minPct) });
    }
  }

  const mvpCount = mvpYears.length;
  const notSoCount = notSoYears.length;

  // Add MVP/NotSo flags to service record rows
  const mvpSet = new Set(mvpYears.map(x => x.Year));
  const notSoSet = new Set(notSoYears.map(x => x.Year));
  const serviceRecordRowsWithFlags = serviceRecordRows.map(r => ({
    ...r,
    mvp: mvpSet.has(r.year) ? "Yes" : "No",
    notSo: notSoSet.has(r.year) ? "Yes" : "No",
  }));

  // ---- Rankings (Percentile required; ranks by format for key metrics) ----
  // Build career metrics for all players for each format
  function buildAllPlayerMetrics(format) {
    const out = [];
    const players = Array.from(new Set(masterRows.map(r => String(r.player || "").trim()).filter(Boolean)));
    for (const p of players) {
      const rowsP = masterRows.filter(r => String(r.player || "").trim() === p);
      const rowsF =
        format === "All" ? rowsP :
        format === "Singles" ? rowsP.filter(r => String(r.format || "").trim() === "Singles") :
        rowsP.filter(r => String(r.format || "").trim() === "Fourball");
      const a = aggregate(rowsF);
      out.push({
        player: p,
        pointPct01: a.pointPct01,
        ptsDiff: a.ptsDiff,
        points: a.points,
        matches: a.matches,
      });
    }
    return out;
  }

  const metricsAll      = buildAllPlayerMetrics("All");
  const metricsSingles  = buildAllPlayerMetrics("Singles");
  const metricsFourball = buildAllPlayerMetrics("Fourball");

  const rankMaps = {
    All: {
      pointPct: buildCompetitionRanks(metricsAll, x => x.pointPct01),
      ptsDiff:  buildCompetitionRanks(metricsAll, x => x.ptsDiff),
      points:   buildCompetitionRanks(metricsAll, x => x.points),
      matches:  buildCompetitionRanks(metricsAll, x => x.matches),
    },
    Singles: {
      pointPct: buildCompetitionRanks(metricsSingles, x => x.pointPct01),
      ptsDiff:  buildCompetitionRanks(metricsSingles, x => x.ptsDiff),
      points:   buildCompetitionRanks(metricsSingles, x => x.points),
      matches:  buildCompetitionRanks(metricsSingles, x => x.matches),
    },
    Fourball: {
      pointPct: buildCompetitionRanks(metricsFourball, x => x.pointPct01),
      ptsDiff:  buildCompetitionRanks(metricsFourball, x => x.ptsDiff),
      points:   buildCompetitionRanks(metricsFourball, x => x.points),
      matches:  buildCompetitionRanks(metricsFourball, x => x.matches),
    },
  };

  function getRankRow(formatLabel, metricLabel, map) {
    const entry = map.get(playerName);
    if (!entry) return [formatLabel, metricLabel, "", "", ""];
    return [formatLabel, metricLabel, String(entry.rank), String(entry.total), `${entry.percentile}%`];
  }

  const ranksRows = [
    ...[
      ["All", "Point %",        rankMaps.All.pointPct],
      ["All", "Points Differential", rankMaps.All.ptsDiff],
      ["All", "Points",         rankMaps.All.points],
      ["All", "Matches",        rankMaps.All.matches],
    ].map(([fmt, label, map]) => getRankRow(fmt, label, map)),
    ...[
      ["Singles", "Point %",        rankMaps.Singles.pointPct],
      ["Singles", "Points Differential", rankMaps.Singles.ptsDiff],
      ["Singles", "Points",         rankMaps.Singles.points],
      ["Singles", "Matches",        rankMaps.Singles.matches],
    ].map(([fmt, label, map]) => getRankRow(fmt, label, map)),
    ...[
      ["Fourball", "Point %",        rankMaps.Fourball.pointPct],
      ["Fourball", "Points Differential", rankMaps.Fourball.ptsDiff],
      ["Fourball", "Points",         rankMaps.Fourball.points],
      ["Fourball", "Matches",        rankMaps.Fourball.matches],
    ].map(([fmt, label, map]) => getRankRow(fmt, label, map)),
  ];

  // ---- Rarity facts (Excel v3) ----
  // PerfectYear / ShutoutYear: count how many unique players have ever had >=1 perfect (100%) year or shutout (0%) year.
  // WinStreak: longest W-only streak (across all matches) for this player; plus record streak across all players.
  // MultipleMVPs / MultipleNotSoMVPs: player has MVPCount >=2 or NotSoMVPCount >=2.
  const rarityFacts = [];

  // Count perfect / shutout players across all players (using per-player-year point%)
  let perfectPlayers = 0;
  let shutoutPlayers = 0;
  for (const [, ymap] of allByPlayerYear.entries()) {
    let hasPerfect = false;
    let hasShutout = false;
    for (const [, agg] of ymap.entries()) {
      if (!agg || agg.matches <= 0) continue;
      if (agg.pointPct01 === 1) hasPerfect = true;
      if (agg.pointPct01 === 0) hasShutout = true;
    }
    if (hasPerfect) perfectPlayers += 1;
    if (hasShutout) shutoutPlayers += 1;
  }

  if (serviceRecordRows.some(r => r.pointPct01 === 1)) {
    rarityFacts.push({
      Key: "PerfectYear",
      Text: `${playerName} is 1 of ${perfectPlayers} players with an undefeated year - nothing but wins.`,
    });
  }
  if (serviceRecordRows.some(r => r.pointPct01 === 0)) {
    rarityFacts.push({
      Key: "ShutoutYear",
      Text: `${playerName} has the unfortunate distinction of being 1 of ${shutoutPlayers} players who was completely shutout in a year - nothing but losses.`,
    });
  }

  // Win streaks (Win-only) computed from match results per player
  function winStreakForPlayer(p) {
    const rowsP = masterRows.filter(r => String(r.player || "").trim() === p);
    // Sort deterministically by year, round, match (if available)
    const sorted = rowsP.slice().sort((a,b) =>
      (Number(a.year)-Number(b.year)) ||
      (Number(a.round)-Number(b.round)) ||
      (String(a.matchId).localeCompare(String(b.matchId)))
    );

    let best = 0;
    let cur = 0;
    for (const r of sorted) {
      const w = rowW(r);
      const l = rowL(r);
      const h = rowH(r);
      const isWin = w > 0 && l === 0 && h === 0;
      if (isWin) { cur += 1; best = Math.max(best, cur); }
      else { cur = 0; }
    }
    return best;
  }

  const bestStreak = winStreakForPlayer(playerName);

  // Record streak across all players (needed for "NSRC record is X")
  let recordStreak = 0;
  const allPlayers = Array.from(new Set(masterRows.map(r => String(r.player || "").trim()).filter(Boolean)));
  for (const p of allPlayers) recordStreak = Math.max(recordStreak, winStreakForPlayer(p));

  if (bestStreak > 0) {
    rarityFacts.push({
      Key: "WinStreak",
      Text: `${playerName}'s longest match win streak is ${bestStreak} matches. The NSRC win streak record is ${recordStreak}.`,
    });
  }

  if (mvpCount >= 2) {
    rarityFacts.push({ Key: "MultipleMVPs", Text: `MVP honors go to the highest Point % in a year and getting this more than once is very rare. ${playerName} has been the trip MVP ${mvpCount} times.` });
  }
  if (notSoCount >= 2) {
    rarityFacts.push({ Key: "MultipleNotSoMVPs", Text: `Not-So-MVP honors go to the lowest Point % in a year and getting this more than once is very rare. ${playerName} has unfortunately been the trip Not-So-MVP ${notSoCount} times.` });
  }

  // ---- Tables (Excel v3 order & column names) ----
  base.tables = [
    {
      id: "service_record",
      title: "Service Record",
      markdown: mdTable(
        ["Year","Trip","Team","Winning Team","Matches","Record","Points","Point %","Points Differential","MVP","Not So MVP"],
        serviceRecordRowsWithFlags.map(r => [
          r.year,
          r.trip,
          r.team,
          r.winningTeam,
          r.matches,
          r.record,
          fmtNum(r.points, 2),
          fmtPct01(r.pointPct01),
          fmtNum(r.ptsDiff, 2),
          r.mvp,
          r.notSo,
        ])
      ),
    },
    {
      id: "format_split",
      title: "Format Split",
      markdown: mdTable(
        ["Format","Matches","Record","Points","Point %","Points Differential"],
        formatSplitRows.map(r => [
          r.format,
          r.matches,
          r.record,
          fmtNum(r.points, 2),
          fmtPct01(r.pointPct01),
          fmtNum(r.ptsDiff, 2),
        ])
      ),
    },
    {
      id: "point_percentage_by_round",
      title: "Point Percentage by Round",
      markdown: mdTable(
        ["Round","Point %"],
        roundPctRows.map(r => [r.round, fmtPct01(r.pct01)])
      ),
    },
    {
      id: "singles_vs_opponents",
      title: "Singles vs Opponents",
      markdown: mdTable(
        ["Opponent","Matches","Record","Points","Point %","Points Differential"],
        singlesVsOppRows.map(r => [
          r.opponent,
          r.matches,
          r.record,
          fmtNum(r.points, 2),
          fmtPct01(r.pointPct01),
          fmtNum(r.ptsDiff, 2),
        ])
      ),
    },
    {
      id: "fourball_vs_opponents",
      title: "Fourball vs Opponents",
      markdown: mdTable(
        ["Opponents","Matches","Record","Points","Point %","Points Differential"],
        fourballVsOppRows.map(r => [
          r.opponents,
          r.matches,
          r.record,
          fmtNum(r.points, 2),
          fmtPct01(r.pointPct01),
          fmtNum(r.ptsDiff, 2),
        ])
      ),
    },
    {
      id: "fourball_with_partner",
      title: "Fourball with Partner",
      markdown: mdTable(
        ["Partner","Matches","Record","Points","Point %","Points Differential"],
        fourballWithPartnerRows.map(r => [
          r.partner,
          r.matches,
          r.record,
          fmtNum(r.points, 2),
          fmtPct01(r.pointPct01),
          fmtNum(r.ptsDiff, 2),
        ])
      ),
    },
    {
      id: "ranks",
      title: "Ranks",
      markdown: mdTable(
        ["Format","Metric","Rank","Total","Percentile"],
        ranksRows
      ),
    },
  ];

  // ---- Facts (LLM-ready, consistent terms) ----
  base.facts = {
    Player: playerName,
    "Years Participating": yearsParticipating,
    "Years on Winning Team": yearsOnWinningTeam,
    "Career Matches": aggAll.matches,
    "Career Record": `${aggAll.wins}-${aggAll.losses}-${aggAll.halved}`,
    "Career Points": fmtNum(aggAll.points, 2),
    "Career Point %": fmtPct01(aggAll.pointPct01),
    "Career Points Differential": fmtNum(aggAll.ptsDiff, 2),
    "MVP Count": mvpCount,
    "Not So MVP Count": notSoCount,
    "Best Year(s) by Point %": bestYears,
    "Worst Year(s) by Point %": worstYears,
    "Nemesis (Singles, lowest Points Differential)": nemesisList.map(n => ({
      Opponent: n.opponent,
      Matches: n.matches,
      Record: n.record,
      Points: fmtNum(n.points, 2),
      "Point %": fmtPct01(n.pointPct01),
      "Points Differential": fmtNum(n.ptsDiff, 2),
    })),
    "Patsy (Singles, highest Points Differential)": patsyList.map(p => ({
      Opponent: p.opponent,
      Matches: p.matches,
      Record: p.record,
      Points: fmtNum(p.points, 2),
      "Point %": fmtPct01(p.pointPct01),
      "Points Differential": fmtNum(p.ptsDiff, 2),
    })),
  };

  base.rarityFacts = rarityFacts;

  return base;
}


/******************************************************************
 * Singles Prediction bundle
 ******************************************************************/
async function buildBundleSinglesPrediction(base) {
  const rows = await getMasterNormalizedMatchRows();   // normalized match log rows
  const teamRows = await getTeamResultsNormalized();  // year -> trip/location/winner/points

  const p1 = String(base.inputs?.player1 ?? "").trim();
  const p2 = String(base.inputs?.player2 ?? "").trim();
  if (!p1 || !p2) {
    base.facts = { error: "Both Player 1 and Player 2 are required." };
    return base;
  }

  // ---------- Build Player Profile bundles (reuse existing, then trim tables) ----------
  async function buildTrimmedPlayerProfile(playerName) {
    const tmp = {
      version: base.version,
      scenario: "PLAYER_PROFILE",
      style: base.style,
      inputs: { player: playerName },
      generatedAtISO: base.generatedAtISO,
      tables: [],
      facts: {},
      rarityFacts: [],
    };

    const prof = await buildBundlePlayerProfile(tmp);

    // Remove tables explicitly not needed for Singles Prediction
    const drop = new Set([
      "service_record",
      "point_percentage_by_round",
      "fourball_with_partner",
      "fourball_vs_opponents",
    ]);

    const keptTables = (prof.tables || []).filter(t => !drop.has(t.id));
    return { facts: prof.facts || {}, rarityFacts: prof.rarityFacts || [], tables: keptTables };
  }

  const prof1 = await buildTrimmedPlayerProfile(p1);
  const prof2 = await buildTrimmedPlayerProfile(p2);

  // ---------- Head-to-head (Singles only) ----------
  const norm = (s) => String(s ?? "").trim();

  const singlesRows = rows.filter(r => norm(r.format) === "Singles");

  // For H2H history, use Player1 perspective rows (one row per match)
  const p1vs2 = singlesRows.filter(r => norm(r.player) === p1 && norm(r.opponent) === p2);

  const p1vs2Sorted = p1vs2.slice().sort((a, b) => {
    const ya = Number(a.year), yb = Number(b.year);
    if (ya !== yb) return ya - yb;
    const ra = Number(a.round), rb = Number(b.round);
    if (ra !== rb) return ra - rb;
    return String(a.matchId ?? "").localeCompare(String(b.matchId ?? ""));
  });

  const h2h = (() => {
    let wins1 = 0, wins2 = 0, halved = 0, matches = 0;
    for (const r of p1vs2Sorted) {
      wins1 += rowW(r);
      wins2 += rowL(r);   // from P1 perspective, P1 losses are P2 wins
      halved += rowH(r);
      matches += 1;
    }
    return { matches, player1Wins: wins1, player2Wins: wins2, halvedMatches: halved };
  })();

  const h2hHistoryRows = p1vs2Sorted.map(r => {
    const y = Number(r.year);
    const teamRow = teamRows.find(t => t.year === y);
    const trip = teamRow ? teamRow.trip : (r.trip || "");
    const round = Number(r.round);
    const outcome =
      rowW(r) > 0 ? `${p1} Win` :
      rowL(r) > 0 ? `${p2} Win` :
      "Halved Match";
    return [y, trip, round, outcome];
  });

  const tableH2HHistory = mdTable(
    ["Year", "Trip", "Round", "Outcome"],
    h2hHistoryRows
  );

  // ---------- Prediction (Singles) ----------
  function careerSinglesAgg(playerName) {
    const arr = singlesRows.filter(r => norm(r.player) === playerName);
    const agg = aggInit();
    for (const r of arr) aggAdd(agg, r);
    return aggFinalize(agg);
  }

  const c1 = careerSinglesAgg(p1);
  const c2 = careerSinglesAgg(p2);

  // H2H point % from Player1 perspective rows (one row per match)
  const h2hAgg = (() => {
    const agg = aggInit();
    for (const r of p1vs2Sorted) aggAdd(agg, r);
    return aggFinalize(agg);
  })();

  function h2hWeight(matches) {
    if (matches <= 0) return 0;
    if (matches === 1) return 0.15;
    if (matches === 2) return 0.30;
    if (matches === 3) return 0.45;
    return 0.60; // 4+
  }

  const wH2H = h2hWeight(h2h.matches);
  const wa1 = (h2h.matches ? (h2hAgg.pointPct01 * wH2H) : 0) + (c1.pointPct01 * (1 - wH2H));

  // Compute Player2 H2H point % from Player2 perspective rows (handles halves correctly)
  const p2vs1 = singlesRows.filter(r => norm(r.player) === p2 && norm(r.opponent) === p1);
  const h2hAgg2 = (() => {
    const agg = aggInit();
    for (const r of p2vs1) aggAdd(agg, r);
    return aggFinalize(agg);
  })();

  const wa2 = (h2h.matches ? (h2hAgg2.pointPct01 * wH2H) : 0) + (c2.pointPct01 * (1 - wH2H));

  function log5(pA, pB) {
    const denom = (pA + pB - 2 * pA * pB);
    if (!denom) return 0.5;
    return (pA - pA * pB) / denom;
  }
  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

  // Step 2: raw win probability (WP)
  const wp1 = log5(wa1, wa2);

  // Step 3: calibrated win probability (CWP) guardrails applied to WP
  const cwp1 = clamp(wp1, 0.077, 0.923);
  const cwp2 = 1 - cwp1;

  // Step 4: halved probability based on CWP
  const halved = clamp(0.13 * (1 - (Math.abs(cwp1 - 0.5) * 2)), 0, 0.13);

  // Step 5: final win percentages
  const win1 = (1 - halved) * cwp1;
  const win2 = (1 - halved) * cwp2;

  const predictionRows = [
    ["Career Singles Matches", String(c1.matches), String(c2.matches)],
    ["Career Singles Record", `${c1.wins}-${c1.losses}-${c1.halved}`, `${c2.wins}-${c2.losses}-${c2.halved}`],
    ["Career Singles Point %", fmtPct01(c1.pointPct01), fmtPct01(c2.pointPct01)],
    ["Career Singles Points Differential", fmtNum(c1.ptsDiff, 1), fmtNum(c2.ptsDiff, 1)],
    ["Head-to-Head Singles Matches", String(h2h.matches), String(h2h.matches)],
    ["Head-to-Head Singles Record", `${h2h.player1Wins}-${h2h.player2Wins}-${h2h.halvedMatches}`, `${h2h.player2Wins}-${h2h.player1Wins}-${h2h.halvedMatches}`],
    ["Head-to-Head Singles Point %", fmtPct01(h2hAgg.pointPct01), fmtPct01(h2hAgg2.pointPct01)],
    ["Head-to-Head Singles Points Differential", fmtNum(h2hAgg.ptsDiff, 1), fmtNum(h2hAgg2.ptsDiff, 1)],
    ["Prediction Win", fmtPct01(win1), fmtPct01(win2)],
    ["Prediction Halved", fmtPct01(halved), fmtPct01(halved)],
  ];

  // ---------- Assemble bundle (table order matters) ----------
  base.tables = [
    { id: "head_to_head_match_history", title: "Head-to-head singles match history", markdown: tableH2HHistory },
  ];

  // Player 1 tables (kept tables, in original Player Profile order)
  for (const t of prof1.tables) {
    base.tables.push({ id: `player1_${t.id}`, title: `Player 1 - ${t.title}`, markdown: t.markdown });
  }

  // Player 2 tables
  for (const t of prof2.tables) {
    base.tables.push({ id: `player2_${t.id}`, title: `Player 2 - ${t.title}`, markdown: t.markdown });
  }

  base.facts = {
    Player1: { Player: p1, ...prof1.facts },
    Player2: { Player: p2, ...prof2.facts },
    "Head-to-Head Summary": {
      "Head-to-Head Matches": h2h.matches,
      "Player 1 Wins": h2h.player1Wins,
      "Player 2 Wins": h2h.player2Wins,
      "Halved Matches": h2h.halvedMatches,
    },
    "Match Prediction": {
      "Player 1 Win": fmtPct01(win1),
      "Player 2 Win": fmtPct01(win2),
      "Halved Match": fmtPct01(halved),
    },
  };

  base.rarityFacts = [
    { Scope: "Player1", RarityFacts: prof1.rarityFacts },
    { Scope: "Player2", RarityFacts: prof2.rarityFacts },
  ];

  return base;
}


/******************************************************************
 * Fourball Prediction bundle
 ******************************************************************/
async function buildBundleFourballPrediction(base) {
  // Inputs
  const ca1 = String(base.inputs?.ca1 || "").trim();
  const ca2 = String(base.inputs?.ca2 || "").trim();
  const tx1 = String(base.inputs?.tx1 || "").trim();
  const tx2 = String(base.inputs?.tx2 || "").trim();

  if (!ca1 || !ca2 || !tx1 || !tx2) {
    base.facts = { error: "Fourball Prediction requires ca1, ca2, tx1, tx2 inputs." };
    return base;
  }

  // Pull normalized master rows once
  const masterRows = await getMasterNormalizedMatchRows();

  // Helper: build a player-profile bundle for reuse (format_split + ranks + career facts)
  async function getProfileBundle(playerName) {
    const tmp = {
      version: base.version,
      scenario: "PLAYER_PROFILE",
      style: base.style,
      inputs: { player: playerName },
      generatedAtISO: base.generatedAtISO,
      tables: [],
      facts: {},
      rarityFacts: [],
    };
    return await buildBundlePlayerProfile(tmp);
  }

  const [ppCA1, ppCA2, ppTX1, ppTX2] = await Promise.all([
    getProfileBundle(ca1),
    getProfileBundle(ca2),
    getProfileBundle(tx1),
    getProfileBundle(tx2),
  ]);

  // --- Extract the two reusable tables from Player Profile: format_split + ranks ---
  function pickTable(bundle, id) {
    return (bundle.tables || []).find(t => t.id === id) || null;
  }

  function addPrefixedTable(prefix, bundle, id, title) {
    const t = pickTable(bundle, id);
    base.tables.push({
      id: `${prefix}_${id}`,
      title,
      markdown: t?.markdown || "",
    });
  }

  // --- Career facts extractor (LLM-friendly terms) ---
  // (Uses whatever Player Profile already computed as the single source of truth)
  function pickCareerFacts(bundle) {
    const f = bundle.facts || {};
    const career = f.Career || f.career || {};
    return {
      Player: f.Player || f.player || "",
      "Years Participating": f["Years Participating"] ?? f.yearsParticipating ?? "",
      "Years on Winning Team": f["Years on Winning Team"] ?? f.yearsOnWinningTeam ?? "",
      "Career Matches": career["Career Matches"] ?? career.matches ?? "",
      "Career Record": career["Career Record"] ?? career.record ?? "",
      "Career Points": career["Career Points"] ?? career.points ?? "",
      "Career Point %": career["Career Point %"] ?? career["Point %"] ?? career.pointPct ?? career.pointPercentage ?? "",
      "Career Point Differential": career["Career Point Differential"] ?? career["Points Differential"] ?? career.ptsDiff ?? career.pointsDifferential ?? "",
      "MVP Count": f["MVP Count"] ?? f.mvpCount ?? "",
      "Not So MVP Count": f["Not So MVP Count"] ?? f.notSoMVPCount ?? "",
    };
  }

  const ca1Facts = pickCareerFacts(ppCA1);
  const ca2Facts = pickCareerFacts(ppCA2);
  const tx1Facts = pickCareerFacts(ppTX1);
  const tx2Facts = pickCareerFacts(ppTX2);

  // --- Build selected-only tables (Option 2) ---

  const selected = {
    ca: [ca1, ca2],
    tx: [tx1, tx2],
    all: [ca1, ca2, tx1, tx2],
  };
  const selectedSet = new Set(selected.all);

  // Aggregator that matches your global conventions
  function aggregateRows(rowArray) {
    const agg = aggInit();
    for (const r of rowArray) aggAdd(agg, r);
    return aggFinalize(agg);
  }

  // 1) Singles Match Record vs Selected Players as Opponent (fixed 8 rows)
  const singlesRowsAll = masterRows.filter(r => String(r.format ?? r.Format ?? "").trim() === "Singles");

  function singlesRowFor(player, opponent) {
    const rows = singlesRowsAll.filter(r => {
      const p = String(r.player ?? r.Player ?? "").trim();
      const opp = String(r.opponent ?? r.Opponent ?? "").trim();
      return p === player && opp === opponent;
    });
    const agg = aggregateRows(rows);
    return [
      player,
      opponent,
      agg.matches,
      `${agg.wins}-${agg.losses}-${agg.halved}`,
      fmtNum(agg.points, 2),
      fmtPct01(agg.pointPct01),
      fmtNum(agg.ptsDiff, 2),
    ];
  }

  const singlesSelectedRows = [
    singlesRowFor(ca1, tx1),
    singlesRowFor(ca1, tx2),
    singlesRowFor(ca2, tx1),
    singlesRowFor(ca2, tx2),
    singlesRowFor(tx1, ca1),
    singlesRowFor(tx1, ca2),
    singlesRowFor(tx2, ca1),
    singlesRowFor(tx2, ca2),
  ];

  base.tables.push({
    id: "singles_match_record_selected_players",
    title: "Singles Match Record vs Selected Players as Opponent",
    markdown: mdTable(
      ["Player", "Opponent", "Matches", "Record", "Points", "Point %", "Point Differential"],
      singlesSelectedRows
    ),
  });

  // Pre-index Fourball matches by matchId so we can derive opponent relations (since opponent isn't in sheet for fourball)
  const byMatchId = new Map();
  for (const r of masterRows) {
    const fmt = String(r.format ?? r.Format ?? "").trim();
    if (fmt !== "Fourball") continue;
    const mid = String(r.matchId ?? r.Match_ID ?? r.matchid ?? "").trim();
    if (!mid) continue;
    if (!byMatchId.has(mid)) byMatchId.set(mid, []);
    byMatchId.get(mid).push(r);
  }

  // 2) Fourball Match Record vs Selected Players as Opponent (fixed 8 rows)
  // We build directional aggregates: player vs opponent when they appeared in the same fourball match on opposite teams.
  const fourballVsOppAgg = new Map(); // key "player|opponent" -> agg

  for (const [, matchRows] of byMatchId.entries()) {
    // Partition by team
    const teamMap = new Map(); // teamName -> array of rows
    for (const r of matchRows) {
      const p = String(r.player ?? r.Player ?? "").trim();
      if (!selectedSet.has(p)) continue; // only care about selected players
      const team = String(r.team ?? r.Team ?? "").trim();
      if (!team) continue;
      if (!teamMap.has(team)) teamMap.set(team, []);
      teamMap.get(team).push(r);
    }

    if (teamMap.size < 2) continue;

    const teams = Array.from(teamMap.keys());
    const tA = teams[0];
    const tB = teams[1];

    const sideA = teamMap.get(tA) || [];
    const sideB = teamMap.get(tB) || [];

    // For each selected player row on one side, pair against each selected player row on the other side
    for (const ra of sideA) {
      const pa = String(ra.player ?? ra.Player ?? "").trim();
      for (const rb of sideB) {
        const pb = String(rb.player ?? rb.Player ?? "").trim();
        const key = `${pa}|${pb}`;
        if (!fourballVsOppAgg.has(key)) fourballVsOppAgg.set(key, aggInit());
        aggAdd(fourballVsOppAgg.get(key), ra); // IMPORTANT: use player's row (directional)
      }
    }

    for (const rb of sideB) {
      const pb = String(rb.player ?? rb.Player ?? "").trim();
      for (const ra of sideA) {
        const pa = String(ra.player ?? ra.Player ?? "").trim();
        const key = `${pb}|${pa}`;
        if (!fourballVsOppAgg.has(key)) fourballVsOppAgg.set(key, aggInit());
        aggAdd(fourballVsOppAgg.get(key), rb);
      }
    }
  }

  function fourballVsOppRow(player, opponent) {
    const key = `${player}|${opponent}`;
    const agg = fourballVsOppAgg.has(key) ? aggFinalize(fourballVsOppAgg.get(key)) : aggFinalize(aggInit());
    return [
      player,
      opponent,
      agg.matches,
      `${agg.wins}-${agg.losses}-${agg.halved}`,
      fmtNum(agg.points, 2),
      fmtPct01(agg.pointPct01),
      fmtNum(agg.ptsDiff, 2),
    ];
  }

  const fourballSelectedOppRows = [
    fourballVsOppRow(ca1, tx1),
    fourballVsOppRow(ca1, tx2),
    fourballVsOppRow(ca2, tx1),
    fourballVsOppRow(ca2, tx2),
    fourballVsOppRow(tx1, ca1),
    fourballVsOppRow(tx1, ca2),
    fourballVsOppRow(tx2, ca1),
    fourballVsOppRow(tx2, ca2),
  ];

  // Optional: sort by Points Differential desc (if you want it later, uncomment)
  // fourballSelectedOppRows.sort((a,b) => Number(b[6]) - Number(a[6]));

  base.tables.push({
    id: "fourball_match_record_selected_players",
    title: "Fourball Match Record vs Selected Players as Opponent",
    markdown: mdTable(
      ["Player", "Opponent", "Matches", "Record", "Points", "Point %", "Point Differential"],
      fourballSelectedOppRows
    ),
  });

  // 3) Fourball Match Record with Selected Players as Partner (fixed 2 rows)
  // We aggregate match-level once per match (not per player row), using both partner rows together then divide points by 2.
  const fourballRows = masterRows.filter(r => String(r.format ?? r.Format ?? "").trim() === "Fourball");

  function partnerAgg(partnerA, partnerB) {
    const agg = { matches: 0, wins: 0, losses: 0, halved: 0, points: 0, ptsDiff: 0 };

    // Group candidate matches by matchId where both partners appear on same team
    const map = new Map(); // matchId -> rows
    for (const r of fourballRows) {
      const p = String(r.player ?? r.Player ?? "").trim();
      if (p !== partnerA && p !== partnerB) continue;

      const mid = String(r.matchId ?? r.Match_ID ?? r.matchid ?? "").trim();
      if (!mid) continue;
      if (!map.has(mid)) map.set(mid, []);
      map.get(mid).push(r);
    }

    for (const [, arr] of map.entries()) {
      if (arr.length < 2) continue;

      // ensure same team
      const t1 = String(arr[0].team ?? arr[0].Team ?? "").trim();
      const t2 = String(arr[1].team ?? arr[1].Team ?? "").trim();
      if (!t1 || t1 !== t2) continue;

      // match-level W/L/H are duplicated per player row; take from the first
      agg.matches += 1;
      agg.wins += rowW(arr[0]);
      agg.losses += rowL(arr[0]);
      agg.halved += rowH(arr[0]);

      // Points are duplicated (sum both then divide by 2)
      const pts = (rowPoints(arr[0]) + rowPoints(arr[1])) / 2;
      agg.points += pts;

      // ptsDiff duplicated; take first (don’t double)
      agg.ptsDiff += rowPtsDiff(arr[0]);
    }

    const pct = agg.matches ? (agg.points / agg.matches) : 0;
    return { ...agg, pointPct01: pct };
  }

  const caPair = partnerAgg(ca1, ca2);
  const txPair = partnerAgg(tx1, tx2);

  const partnerRows = [
    [`${ca1} and ${ca2}`, caPair.matches, `${caPair.wins}-${caPair.losses}-${caPair.halved}`, fmtNum(caPair.points, 2), fmtPct01(caPair.pointPct01), fmtNum(caPair.ptsDiff, 2)],
    [`${tx1} and ${tx2}`, txPair.matches, `${txPair.wins}-${txPair.losses}-${txPair.halved}`, fmtNum(txPair.points, 2), fmtPct01(txPair.pointPct01), fmtNum(txPair.ptsDiff, 2)],
  ];

  base.tables.push({
    id: "fourball_partner_record_selected_players",
    title: "Fourball Match Record with Selected Players as Partner",
    markdown: mdTable(
      ["Partner", "Matches", "Record", "Points", "Point %", "Point Differential"],
      partnerRows
    ),
  });

  // --- Add the reused Player Profile tables in the exact order you requested ---
  addPrefixedTable("CA1", ppCA1, "format_split", `${ca1} Format Splits`);
  addPrefixedTable("CA1", ppCA1, "ranks", `${ca1} Ranks`);

  addPrefixedTable("CA2", ppCA2, "format_split", `${ca2} Format Splits`);
  addPrefixedTable("CA2", ppCA2, "ranks", `${ca2} Ranks`);

  addPrefixedTable("TX1", ppTX1, "format_split", `${tx1} Format Splits`);
  addPrefixedTable("TX1", ppTX1, "ranks", `${tx1} Ranks`);

  addPrefixedTable("TX2", ppTX2, "format_split", `${tx2} Format Splits`);
  addPrefixedTable("TX2", ppTX2, "ranks", `${tx2} Ranks`);

  // --- Prediction math (Fourball) ---
  // Player WA = 60% career singles Point% + 40% career fourball Point%
  // Team WA = 65% stronger + 35% weaker
  // Log5 -> Team WP
  // Halved% = 13% * (1 - (ABS(WP - 0.5) * 2))
  // Win% = (1 - Halved%) * WP  (and counterpart)

  function careerPointPctByFormat(playerName, formatName) {
    const filtered =
      formatName === "Singles"
        ? masterRows.filter(r => String(r.format ?? r.Format ?? "").trim() === "Singles" && String(r.player ?? r.Player ?? "").trim() === playerName)
        : masterRows.filter(r => String(r.format ?? r.Format ?? "").trim() === "Fourball" && String(r.player ?? r.Player ?? "").trim() === playerName);

    const agg = aggregateRows(filtered);
    // If player has no matches in this format, treat as neutral 50%
    return agg.matches ? agg.pointPct01 : 0.5;
  }

  function playerWA(playerName) {
    const s = careerPointPctByFormat(playerName, "Singles");
    const f = careerPointPctByFormat(playerName, "Fourball");
    return (0.6 * s) + (0.4 * f);
  }

  function log5(pA, pB) {
    const denom = (pA + pB - 2 * pA * pB);
    if (!denom) return 0.5;
    return (pA - pA * pB) / denom;
  }

  function halvedPctFromWP(wp) {
    return 0.13 * (1 - (Math.abs(wp - 0.5) * 2));
  }

  const caWA1 = playerWA(ca1);
  const caWA2 = playerWA(ca2);
  const txWA1 = playerWA(tx1);
  const txWA2 = playerWA(tx2);

  const caliStronger = Math.max(caWA1, caWA2);
  const caliWeaker = Math.min(caWA1, caWA2);
  const texStronger = Math.max(txWA1, txWA2);
  const texWeaker = Math.min(txWA1, txWA2);

  const caliTeamWA = (0.65 * caliStronger) + (0.35 * caliWeaker);
  const texTeamWA = (0.65 * texStronger) + (0.35 * texWeaker);

  const caliWP = log5(caliTeamWA, texTeamWA);
  const texWP = 1 - caliWP;

  const halved = halvedPctFromWP(caliWP);
  const caliWin = (1 - halved) * caliWP;
  const texWin = (1 - halved) * texWP;

  // --- Facts ---
  base.facts = {
    CA1: ca1Facts,
    CA2: ca2Facts,
    TX1: tx1Facts,
    TX2: tx2Facts,
    "Match Prediction": {
      "Cali Win": fmtPct01(caliWin),
      "Tex-Mex Win": fmtPct01(texWin),
      "Halved Match": fmtPct01(halved),
    },
  };

  return base;
}

/******************************************************************
 * Year / Trip Summary bundle (NEW)
 ******************************************************************/
async function buildBundleYearTripSummary(base) {
  const rows = await getMasterNormalizedMatchRows();
  const teamRows = await getTeamResultsNormalized();

  const year = Number(base.inputs?.year);
  if (!Number.isFinite(year)) {
    base.facts = { error: "Year is required." };
    return base;
  }

  const yrTeam = teamRows.find(t => t.year === year);
  if (!yrTeam) {
    base.facts = { error: `Year ${year} not found in Master Team Results.` };
    return base;
  }

  const trip = yrTeam.trip;
  const location = yrTeam.location;
  const winningTeam = yrTeam.winningTeam;
  const caliPoints = yrTeam.caliPoints;
  const texPoints = yrTeam.texPoints;
  const margin = Math.abs(caliPoints - texPoints);

// Additional context
const tournamentCount = teamRows.filter(t => t.year <= year).length;
const histRows = teamRows.filter(t => t.year < year);
const historicalCaliWins = histRows.filter(t => String(t.winningTeam).toLowerCase().includes("cali")).length;
const historicalTexMexWins = histRows.filter(t => String(t.winningTeam).toLowerCase().includes("tex")).length;
const priorYearWinningTeam = (teamRows.find(t => t.year === year - 1) || {}).winningTeam || "";
const totalCaliWinsThroughYear = teamRows.filter(t => t.year <= year && String(t.winningTeam).toLowerCase().includes("cali")).length;
const totalTexMexWinsThroughYear = teamRows.filter(t => t.year <= year && String(t.winningTeam).toLowerCase().includes("tex")).length;


  const thisYearRows = rows.filter(r => Number(r.year) === year);
  const priorRows = rows.filter(r => Number(r.year) < year);

  // ---- Team totals + historical margins
  const histMargins = teamRows
    .filter(t => t.year < year)
    .map(t => ({
      year: t.year,
      trip: t.trip || "",
      winner: t.winningTeam,
      cali: t.caliPoints,
      tex: t.texPoints,
      margin: Math.abs(t.caliPoints - t.texPoints),
    }))
    .sort((a,b) => b.year - a.year);

  const histMarginTable = mdTable(
    ["Year", "Trip", "Winning Team", "Cali Points", "Tex-Mex Points", "Margin"],
    histMargins.map(h => [h.year, h.trip, h.winner, fmtNum(h.cali,1), fmtNum(h.tex,1), fmtNum(h.margin,1)])
  );


  // ---- Round summary (TEAM totals) (divide fourball by 2 at match level)
  function teamRoundTotals(yrRows) {
    const perRound = new Map(); // round -> { cali, tex }

    for (const r of (yrRows || [])) {
      const round = Number(r.round);
      if (!Number.isFinite(round)) continue;

      const team = String(r.team || "").trim();
      const format = String(r.format || "").trim();
      const ptsRaw = rowPoints(r);

      // IMPORTANT: Fourball has 4 player-rows per match; divide at row-level
      const pts = (format === "Fourball") ? (ptsRaw * 0.5) : ptsRaw;

      if (!perRound.has(round)) perRound.set(round, { cali: 0, tex: 0 });
      const v = perRound.get(round);

      if (team === "Cali") v.cali += pts;
      else if (team === "Tex-Mex") v.tex += pts;
    }

    const out = Array.from(perRound.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([round, v]) => ({
        round,
        cali: v.cali,
        tex: v.tex,
        margin: v.cali - v.tex,
      }));

    return out;
  }

  const roundTotals = teamRoundTotals(thisYearRows);
  
// Course by round (first non-empty)
const courseByRound = new Map();
for (const r of thisYearRows) {
  const rd = Number(r.round);
  if (!Number.isFinite(rd)) continue;
  const c = String(r.course || "").trim();
  if (c && !courseByRound.has(rd)) courseByRound.set(rd, c);
}

// Build enhanced round summary with cumulative + lead
let cumCali = 0;
let cumTex = 0;
const roundSummaryRows = (roundTotals || []).map((rr) => {
  // NOTE: teamRoundTotals() returns { round, cali, tex, margin }
  const cali = Number(rr.cali) || 0;
  const tex  = Number(rr.tex)  || 0;

  cumCali += cali;
  cumTex  += tex;

  const leadingTeam =
    cumCali === cumTex ? "Tied" : (cumCali > cumTex ? "Cali" : "Tex-Mex");

  const lead = Math.abs(cumCali - cumTex);

  const fmtSet = new Set(
    thisYearRows
      .filter(r => Number(r.round) === rr.round)
      .map(r => String(r.format || "").trim())
      .filter(Boolean)
  );
  const formatLabel = fmtSet.size ? Array.from(fmtSet).join("/") : "";

  return [
    rr.round,
    formatLabel,
    courseByRound.get(rr.round) || "",
    fmtNum(cali, 1),
    fmtNum(tex, 1),
    fmtNum(cumCali, 1),
    fmtNum(cumTex, 1),
    leadingTeam,
    fmtNum(lead, 1),
  ];
});

const roundTable = mdTable(
  ["Round","Format","Course","Cali Round Points","Tex-Mex Round Points","Cali Cumulative Round Points","Tex-Mex Cumulative Round Points","Leading Team","Lead"],
  roundSummaryRows
);

// ---- Match Details (one row per match)
function getMatchId(r) {
  return String(r.matchId ?? r.matchid ?? r.Match_ID ?? r.MatchId ?? "").trim();
}

const matchMap = new Map(); // matchId -> { round, format, caliPlayers[], texPlayers[], caliPtsRaw, texPtsRaw }

for (const r of thisYearRows) {
  const id = getMatchId(r);
  if (!id) continue;

  const roundNum = Number(r.round);
  const format = String(r.format || "").trim();
  const team = String(r.team || "").trim();
  const player = String(r.player || "").trim();
  const pts = rowPoints(r);

  if (!matchMap.has(id)) {
    matchMap.set(id, { matchId: id, round: roundNum, format, caliPlayers: [], texPlayers: [], caliPtsRaw: 0, texPtsRaw: 0 });
  }

  const m = matchMap.get(id);

  if (Number.isFinite(roundNum)) m.round = roundNum;
  if (format) m.format = format;

  if (team === "Cali") {
    m.caliPtsRaw += pts;
    if (player && !m.caliPlayers.includes(player)) m.caliPlayers.push(player);
  } else if (team === "Tex-Mex") {
    m.texPtsRaw += pts;
    if (player && !m.texPlayers.includes(player)) m.texPlayers.push(player);
  }
}

const matchDetailRows = Array.from(matchMap.values())
  .sort((a, b) => (Number(a.round) - Number(b.round)) || a.matchId.localeCompare(b.matchId))
  .map(m => {
    // Divide fourball totals by 2 at match level
    const caliPts = (m.format === "Fourball") ? (m.caliPtsRaw / 2) : m.caliPtsRaw;
    const texPts  = (m.format === "Fourball") ? (m.texPtsRaw / 2)  : m.texPtsRaw;

    let result = "Halved";
    if (caliPts > texPts) result = "Cali Win";
    else if (texPts > caliPts) result = "Tex-Mex Win";

    return [
      m.round,
      m.format,
      m.matchId,
      m.caliPlayers[0] || "",
      m.caliPlayers[1] || "",
      m.texPlayers[0] || "",
      m.texPlayers[1] || "",
      result,
    ];
  });

const matchDetailsTable = mdTable(
  ["Round","Format","Match ID","Cali Player 1","Cali Player 2","Tex-Mex Player 1","Tex-Mex Player 2","Match Result"],
  matchDetailRows
);

// ---- Years participating (count distinct years <= selected year)
const yearsByPlayer = new Map(); // player -> Set(year)

for (const r of rows) {
  const y = Number(r.year);
  if (!Number.isFinite(y) || y > year) continue;

  const p = String(r.player ?? "").trim();
  if (!p) continue;

  if (!yearsByPlayer.has(p)) yearsByPlayer.set(p, new Set());
  yearsByPlayer.get(p).add(y);
}

// ---- Participant Contribution (per player; no fourball divide)
const playerAgg = new Map(); // player -> agg
const playerTeam = new Map(); // player -> team (from rows)
for (const r of thisYearRows) {
  const p = String(r.player ?? "").trim();
  if (!p) continue;
  if (!playerAgg.has(p)) playerAgg.set(p, aggInit());
  aggAdd(playerAgg.get(p), r);
  if (!playerTeam.has(p)) playerTeam.set(p, String(r.team ?? "").trim());
}
const contribRows = Array.from(playerAgg.entries()).map(([player, agg]) => {
  const f = aggFinalize(agg);
  return {
    player,
    team: playerTeam.get(player) || "",
    yearsParticipating: yearsByPlayer.has(player) ? yearsByPlayer.get(player).size : 0,
    matches: f.matches,
    record: `${f.wins}-${f.losses}-${f.halved}`,
    points: f.points,
    pointPct01: f.pointPct01,
  };
}).sort((a,b) => (b.pointPct01 - a.pointPct01) || (b.points - a.points) || a.player.localeCompare(b.player));

// MVP / Not So MVP for selected year (ties)
const maxPct = Math.max(...contribRows.map(x => x.pointPct01));
const minPct = Math.min(...contribRows.map(x => x.pointPct01));
const mvps = contribRows.filter(x => x.pointPct01 === maxPct).map(x => x.player);
const nots = contribRows.filter(x => x.pointPct01 === minPct).map(x => x.player);

const contribTable = mdTable(
  ["Player", "Team", "Years Participating", "Record", "Points", "Point %"],
  contribRows.map(p => [p.player, p.team, p.yearsParticipating, p.record, fmtNum(p.points,1), fmtPct01(p.pointPct01)])
);

// ---- Notable matches / upset candidates
// Utilities to compute career-to-date singles pt% / ptsdiff, and h2h history, using prior years only
function careerSinglesPctBefore(player) {
  const pr = priorRows.filter(r => String(r.player).trim() === player && String(r.format).trim() === "Singles");
  const a = aggFinalize(pr.reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  return a.pointPct01;
}
function careerSinglesPtsDiffBefore(player) {
  const pr = priorRows.filter(r => String(r.player).trim() === player && String(r.format).trim() === "Singles");
  const a = aggFinalize(pr.reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  return a.ptsDiff;
}
function priorH2HSingles(a, b) {
  const pr = priorRows.filter(r => String(r.format).trim() === "Singles" &&
    ((String(r.player).trim() === a && String(r.opponent ?? "").trim() === b) ||
      (String(r.player).trim() === b && String(r.opponent ?? "").trim() === a)));
  const aAgg = aggFinalize(pr.filter(r => String(r.player).trim() === a).reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  const bAgg = aggFinalize(pr.filter(r => String(r.player).trim() === b).reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  return { matches: aAgg.matches, aAgg, bAgg };
}

// Get singles matches in selected year as pairs by matchId
const singlesByMatch = new Map();
for (const r of thisYearRows) {
  if (String(r.format).trim() !== "Singles") continue;
  const id = String(r.matchId ?? "").trim();
  if (!id) continue;
  if (!singlesByMatch.has(id)) singlesByMatch.set(id, []);
  singlesByMatch.get(id).push(r);
}

const singlesMatches = [];
for (const [id, mr] of singlesByMatch.entries()) {
  if (mr.length < 2) continue;
  const a = mr[0];
  const b = mr[1];
  singlesMatches.push({
    matchId: id,
    round: Number(a.round),
    playerA: String(a.player).trim(),
    playerB: String(b.player).trim(),
    teamA: String(a.team).trim(),
    teamB: String(b.team).trim(),
    resultA: String(a.result ?? "").trim(),
    resultB: String(b.result ?? "").trim(),
    pointsA: rowPoints(a),
    pointsB: rowPoints(b),
    ptsDiffA: rowPtsDiff(a),
    ptsDiffB: rowPtsDiff(b),
  });
}

function winnerOf(m) {
  // winner is the one with Points==1 (or higher)
  if (m.pointsA > m.pointsB) return { player: m.playerA, opponent: m.playerB, team: m.teamA, round: m.round };
  if (m.pointsB > m.pointsA) return { player: m.playerB, opponent: m.playerA, team: m.teamB, round: m.round };
  return null; // halved
}

// Candidate 1: largest career-to-date singles point% variance where lower pct wins
let cand1 = null;
for (const m of singlesMatches) {
  const w = winnerOf(m);
  if (!w) continue;
  const pctW = careerSinglesPctBefore(w.player);
  const pctL = careerSinglesPctBefore(w.opponent);
  const variance = Math.abs(pctW - pctL);
  const lowerWins = pctW < pctL;
  if (!lowerWins) continue;
  if (!cand1 || variance > cand1.variance) cand1 = { ...w, variance, pctW, pctL, matchId: m.matchId };
}

// Candidate 2: lowest career-to-date singles points differential player wins
// Find global min among players who have prior singles rows
const priorSinglesPlayers = Array.from(new Set(priorRows.filter(r => String(r.format).trim()==="Singles").map(r => String(r.player).trim()).filter(Boolean)));
let minPD = null;
for (const p of priorSinglesPlayers) {
  const pd = careerSinglesPtsDiffBefore(p);
  if (minPD == null || pd < minPD) minPD = pd;
}
const minPDPlayers = minPD == null ? [] : priorSinglesPlayers.filter(p => careerSinglesPtsDiffBefore(p) === minPD);

let cand2 = null;
for (const m of singlesMatches) {
  const w = winnerOf(m);
  if (!w) continue;
  if (!minPDPlayers.includes(w.player)) continue;
  cand2 = { ...w, careerSinglesPtsDiff: minPD, matchId: m.matchId };
  break;
}

// Candidate 3: winner had never won vs opponent before (requires >=1 prior match)
let cand3 = null;
for (const m of singlesMatches) {
  const w = winnerOf(m);
  if (!w) continue;
  const h = priorH2HSingles(w.player, w.opponent);
  if (h.matches < 1) continue;
  // wins are from aAgg.wins
  if (h.aAgg.wins === 0) {
    cand3 = { ...w, priorH2HMatches: h.matches, matchId: m.matchId };
    break;
  }
}

// Candidate 4: winner had lowest predicted win% based on prior years
function h2hWeightFromMatches(n) {
  if (n >= 4) return 0.60;
  if (n === 3) return 0.45;
  if (n === 2) return 0.30;
  if (n === 1) return 0.15;
  return 0.00;
}
function log5(pA, pB) {
  const denom = (pA + pB - (2 * pA * pB));
  if (!denom) return 0.5;
  return (pA - (pA * pB)) / denom;
}
function clamp(x, mn, mx) { return Math.min(mx, Math.max(mn, x)); }

let cand4 = null;
for (const m of singlesMatches) {
  const w = winnerOf(m);
  if (!w) continue;

  const h = priorH2HSingles(w.player, w.opponent);
  const wgt = h2hWeightFromMatches(h.matches);

  const cW = careerSinglesPctBefore(w.player);
  const cL = careerSinglesPctBefore(w.opponent);

  // compute H2H point % prior (directional)
  const hAggW = aggFinalize(priorRows.filter(r => String(r.format).trim()==="Singles" && String(r.player).trim()===w.player && String(r.opponent ?? "").trim()===w.opponent).reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  const hAggL = aggFinalize(priorRows.filter(r => String(r.format).trim()==="Singles" && String(r.player).trim()===w.opponent && String(r.opponent ?? "").trim()===w.player).reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  const hPctW = hAggW.matches ? hAggW.pointPct01 : 0;
  const hPctL = hAggL.matches ? hAggL.pointPct01 : 0;

  const waW = (wgt * hPctW) + ((1 - wgt) * cW);
  const waL = (wgt * hPctL) + ((1 - wgt) * cL);

  const wpW = log5(waW, waL);
  const cwpW = clamp(wpW, 0.077, 0.923);
  const halved = 0.13 * (1 - (Math.abs(cwpW - 0.5) * 2));
  const winW = (1 - halved) * cwpW;

  if (!cand4 || winW < cand4.winProb) cand4 = { ...w, winProb: winW, matchId: m.matchId };
}

// Candidate 5: fourball match where winning team had lowest predicted win%
// Build fourball matches in selected year by matchId, with the 4 players
const fourballByMatch = new Map();
for (const r of thisYearRows) {
  if (String(r.format).trim() !== "Fourball") continue;
  const id = String(r.matchId ?? "").trim();
  if (!id) continue;
  if (!fourballByMatch.has(id)) fourballByMatch.set(id, []);
  fourballByMatch.get(id).push(r);
}

// Career format pct before selected year (for WA)
function careerFormatPctBefore(player, format) {
  const pr = priorRows.filter(r => String(r.player).trim() === player && String(r.format).trim() === format);
  const a = aggFinalize(pr.reduce((acc, rr) => (aggAdd(acc, rr), acc), aggInit()));
  return a.pointPct01;
}
function playerWA_Before(player) {
  const s = careerFormatPctBefore(player, "Singles");
  const f = careerFormatPctBefore(player, "Fourball");
  return (0.60 * s) + (0.40 * f);
}
function teamWA_Before(pA, pB) {
  const waA = playerWA_Before(pA);
  const waB = playerWA_Before(pB);
  const strong = Math.max(waA, waB);
  const weak = Math.min(waA, waB);
  return (0.65 * strong) + (0.35 * weak);
}

let cand5 = null;
for (const [id, mr] of fourballByMatch.entries()) {
  if (mr.length < 4) continue;

  // Determine teams & players
  const caliPlayers = mr.filter(r => String(r.team).trim()==="Cali").map(r => String(r.player).trim()).filter(Boolean);
  const texPlayers = mr.filter(r => String(r.team).trim()==="Tex-Mex").map(r => String(r.player).trim()).filter(Boolean);
  if (caliPlayers.length !== 2 || texPlayers.length !== 2) continue;

  // Determine winning team from points (match-level; divide by2)
  const caliPts = mr.filter(r => String(r.team).trim()==="Cali").reduce((s,r) => s + rowPoints(r), 0) / 2;
  const texPts2 = mr.filter(r => String(r.team).trim()==="Tex-Mex").reduce((s,r) => s + rowPoints(r), 0) / 2;

  let winTeam = null;
  if (caliPts > texPts2) winTeam = "Cali";
  else if (texPts2 > caliPts) winTeam = "Tex-Mex";
  else continue; // halved

  const waC = teamWA_Before(caliPlayers[0], caliPlayers[1]);
  const waT = teamWA_Before(texPlayers[0], texPlayers[1]);

  const wpC = log5(waC, waT);
  const wpT = log5(waT, waC);
  const cwpC = clamp(wpC, 0.077, 0.923);
  const cwpT = clamp(wpT, 0.077, 0.923);
  const halved = 0.13 * (1 - (Math.abs(cwpC - 0.5) * 2));
  const winC = (1 - halved) * cwpC;
  const winT = (1 - halved) * cwpT;

  const winProb = winTeam === "Cali" ? winC : winT;

  if (!cand5 || winProb < cand5.winProb) {
    cand5 = {
      matchId: id,
      round: Number(mr[0].round),
      winTeam,
      caliPlayers,
      texPlayers,
      winProb,
    };
  }
}

const notable = [];
if (cand1) notable.push({
  Scenario: "Upset Candidate 1",
  Round: cand1.round,
  Summary: `${cand1.player} (career singles ${fmtPct01(cand1.pctW)}) beat ${cand1.opponent} (career singles ${fmtPct01(cand1.pctL)})`,
  Evidence: `Match_ID ${cand1.matchId}; variance ${fmtPct01(cand1.variance)}`,
});
if (cand2) notable.push({
  Scenario: "Upset Candidate 2",
  Round: cand2.round,
  Summary: `${cand2.player} (lowest prior career singles Points Differential: ${fmtNum(cand2.careerSinglesPtsDiff,1)}) won vs ${cand2.opponent}`,
  Evidence: `Match_ID ${cand2.matchId}`,
});
if (cand3) notable.push({
  Scenario: "Upset Candidate 3",
  Round: cand3.round,
  Summary: `${cand3.player} won vs ${cand3.opponent} after being 0-for-${cand3.priorH2HMatches} in prior singles H2H`,
  Evidence: `Match_ID ${cand3.matchId}`,
});
if (cand4) notable.push({
  Scenario: "Upset Candidate 4",
  Round: cand4.round,
  Summary: `${cand4.player} won vs ${cand4.opponent} despite lowest predicted win% (${fmtPct01(cand4.winProb)})`,
  Evidence: `Match_ID ${cand4.matchId}`,
});
if (cand5) notable.push({
  Scenario: "Upset Candidate 5",
  Round: cand5.round,
  Summary: `${cand5.winTeam} won a fourball despite lowest predicted win% (${fmtPct01(cand5.winProb)})`,
  Evidence: `Match_ID ${cand5.matchId}; Cali: ${cand5.caliPlayers.join(" + ")} vs Tex-Mex: ${cand5.texPlayers.join(" + ")}`,
});

const notableTable = mdTable(
  ["Scenario", "Round", "Summary", "Evidence"],
  notable.map(n => [n.Scenario, n.Round, n.Summary, n.Evidence])
);

// ---- Rarity facts (year-level)
const rarityFacts = [];

// Largest and smallest margins (prior years only)
const histAll = teamRows.filter(t => t.year < year);
if (histAll.length) {
  const sorted = histAll.map(t => ({ year: t.year, margin: Math.abs(t.caliPoints - t.texPoints), winner: t.winningTeam }))
                        .sort((a,b) => b.margin - a.margin);
  const largest = sorted[0];
  const smallest = sorted.slice().sort((a,b) => a.margin - b.margin)[0];
  rarityFacts.push({ Key: "LargestMarginBeforeYear", Text: `Largest margin before ${year}: ${largest.margin.toFixed(1)} points (${largest.winner}, ${largest.year}).` });
}

// Largest comeback (winning team faced biggest deficit at any round subtotal) before selected year
function maxDeficitForWinningTeam(y) {
  const t = teamRows.find(tr => tr.year === y);
  if (!t) return null;
  const thisYearRows = rows.filter(r => Number(r.year) === y);
  const perRound = teamRoundTotals(thisYearRows);
  // cumulative
  let cum = 0;
  let minCum = 0;
  let minRound = null;
  for (const rr of perRound) {
    cum += rr.margin; // Cali - Tex
    if (cum < minCum) { minCum = cum; minRound = rr.round; }
  }
  // if winner is Cali, deficit is minCum (most negative); else deficit is maxCum (most positive from Tex perspective)
  if (t.winningTeam === "Cali") return { deficit: minCum, round: minRound, year: y };
  // Tex-Mex winner: compute max positive cum (meaning Cali ahead) as deficit for Tex
  let cum2=0, maxCum=0, maxRound=null;
  for (const rr of perRound) {
    cum2 += rr.margin;
    if (cum2 > maxCum) { maxCum=cum2; maxRound=rr.round; }
  }
  return { deficit: maxCum, round: maxRound, year: y };
}
const comeback = histAll.map(t => maxDeficitForWinningTeam(t.year)).filter(Boolean);
if (comeback.length) {
  // winner deficit magnitude (positive means against winner)
  const sorted = comeback.sort((a,b) => Math.abs(b.deficit) - Math.abs(a.deficit));
  const best = sorted[0];
  rarityFacts.push({ Key: "LargestComebackBeforeYear", Text: `Largest comeback before ${year}: winning team overcame a ${Math.abs(best.deficit).toFixed(1)}-point deficit (Round ${best.round}, ${best.year}).` });
}

base.tables = [
  {
    id: "year_summary",
    title: "Year summary",
    markdown: mdTable(
      ["Year", "Trip", "Location", "Winning Team", "Cali Points", "Tex-Mex Points", "Margin"],
      [[year, trip, location, winningTeam, fmtNum(caliPoints,1), fmtNum(texPoints,1), fmtNum(margin,1)]]
    ),
  },
  { id: "round_summary", title: "Round summary", markdown: roundTable },
  { id: "match_details", title: "Match details", markdown: matchDetailsTable },
  { id: "notable_matches", title: "Notable matches (upset candidates)", markdown: notableTable },
  { id: "participant_contribution", title: "Participant contribution", markdown: contribTable },
  { id: "historical_margins", title: "Historical margins before selected year", markdown: histMarginTable },
];

base.facts = {
  Year: year,
  Trip: trip,
  Location: location,
  WinningTeam: winningTeam,
  FinalScore: { Cali: fmtNum(caliPoints,1), "Tex-Mex": fmtNum(texPoints,1) },
  Margin: fmtNum(margin,1),
  MVPs: mvps,
  NotSoMVPs: nots,
  TotalCaliWins: totalCaliWinsThroughYear,
  TotalTexMexWins: totalTexMexWinsThroughYear,
  tournamentCount: tournamentCount,
  priorYearWinningTeam: priorYearWinningTeam,
  HistoricalCaliWins: historicalCaliWins,
  historicalTexMexWins: historicalTexMexWins,
};

base.rarityFacts = rarityFacts;

return base;
}

/***********************
 * AI client-side rate limiter (UI speed bump only)
 * NOTE: Real per-IP limiting must be done server-side (Vercel API).
 ***********************/
/*function aiClientRateLimitCheck({
  maxPerMinute = 3,
  maxPerDay = 50,           // set to null/0 to disable daily cap
  storageKey = "ai_rate_limit_v1"
} = {}) {
  const now = Date.now();
  const ONE_MIN = 60 * 1000;
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let data;
  try {
    data = JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    data = {};
  }

  const minuteHits = Array.isArray(data.minuteHits) ? data.minuteHits : [];
  const dayHits = Array.isArray(data.dayHits) ? data.dayHits : [];

  // prune old hits
  const minuteHitsPruned = minuteHits.filter(ts => (now - ts) < ONE_MIN);
  const dayHitsPruned = dayHits.filter(ts => (now - ts) < ONE_DAY);

  // checks
  if (minuteHitsPruned.length >= maxPerMinute) {
    const oldest = minuteHitsPruned[0];
    const retryMs = Math.max(0, ONE_MIN - (now - oldest));
    return { ok: false, reason: "minute", retryMs };
  }

  if (maxPerDay && dayHitsPruned.length >= maxPerDay) {
    const oldest = dayHitsPruned[0];
    const retryMs = Math.max(0, ONE_DAY - (now - oldest));
    return { ok: false, reason: "day", retryMs };
  }

  // record this hit
  minuteHitsPruned.push(now);
  dayHitsPruned.push(now);

  const newData = { minuteHits: minuteHitsPruned, dayHits: dayHitsPruned };
  try {
    localStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {
    // if storage is blocked, fail open (don’t break the app)
  }

  return { ok: true, reason: null, retryMs: 0 };
}

function msToHuman(ms) {
  const s = Math.ceil(ms / 1000);
  if (s <= 60) return `${s}s`;
  const m = Math.ceil(s / 60);
  return `${m}m`;
}*/


/***********************
 * VIEW: AI Analysis and Predictions (UI only for now)
 ***********************/
async function renderAIAnalysis() {
  const ai = state.ai;

  // Load data we need for dropdown options (these should already be cached/fast in your app)
  let teamRows = [];
  let matchRows = [];
  try {
    teamRows = await getMasterTeamResultsRaw();
  } catch (e) {
    console.warn("AI view: could not load MasterTeamResults", e);
  }
  try {
    matchRows = await getMasterMatchLogRaw();
  } catch (e) {
    console.warn("AI view: could not load MasterMatchLog", e);
  }

  // Build Year options from Master Team Results (preferred since it has Trip per year)
  const years = Array.from(
    new Set(
      (teamRows || [])
        .map((r) => Number(String(r.Year ?? "").trim()))
        .filter((y) => Number.isFinite(y))
    )
  ).sort((a, b) => b - a);

  const maxYear = years.length ? years[0] : null;

  // Initialize default year (max year) the first time this view is visited
  if (ai.year == null && maxYear != null) ai.year = maxYear;

  // Resolve Trip from Team Results for selected year
  let tripForYear = "All";
  if (ai.year != null) {
    const yr = Number(ai.year);
    const row = (teamRows || []).find((r) => Number(String(r.Year ?? "").trim()) === yr);
    if (row && row.Trip != null) {
      const t = String(row.Trip).trim();
      tripForYear = t || "All";
    } else {
      tripForYear = "All";
    }
  }
  ai.trip = ai.year == null ? "All" : tripForYear;

  // Build player list from Master Match Log (supports both raw and normalized keys)
  const allPlayers = Array.from(
    new Set(
      (matchRows || [])
        .map((r) => String((r.Player ?? r.player) ?? "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  // Reasonable defaults so dropdowns aren’t blank (all players for every selector)
  if (!ai.player && allPlayers.length) ai.player = allPlayers[0];

  if (!ai.player1 && allPlayers.length) ai.player1 = allPlayers[0];
  if (!ai.player2 && allPlayers.length) ai.player2 = allPlayers[Math.min(1, allPlayers.length - 1)];

  if (!ai.ca1 && allPlayers.length) ai.ca1 = allPlayers[0];
  if (!ai.ca2 && allPlayers.length) ai.ca2 = allPlayers[Math.min(1, allPlayers.length - 1)];

  if (!ai.tx1 && allPlayers.length) ai.tx1 = allPlayers[0];
  if (!ai.tx2 && allPlayers.length) ai.tx2 = allPlayers[Math.min(1, allPlayers.length - 1)];

  const scenarioOptions = ["Year/Trip Summary", "Player Profile", "Singles Prediction", "Fourball Prediction"];
  const styleOptions = ["SportsCenter", "Locker-Room"];

  // Helper to render your “pill + select” pattern
  const pillSelect = (id, label, value, options) => {
    return `
      <span class="meta-btn">
        ${escapeHtml(label)} <strong>${escapeHtml(value)}</strong>
        <select class="chip-select" id="${escapeHtml(id)}" aria-label="${escapeHtml(label)}">
          ${options
            .map((opt) => {
              const v = String(opt);
              const selected = v === String(value) ? " selected" : "";
              return `<option value="${escapeHtml(v)}"${selected}>${escapeHtml(v)}</option>`;
            })
            .join("")}
        </select>
      </span>
    `;
  };

  // Row 1: Scenario
  const row1 = `
    <div class="meta">
      ${pillSelect("aiScenarioSelect", "Scenario:", ai.scenario, scenarioOptions)}
    </div>
  `;

  // Row 2: Scenario-dependent pills
  let row2Inner = "";
  if (ai.scenario === "Year/Trip Summary") {
    const yearLabel = ai.year == null ? "—" : String(ai.year);
    row2Inner = `
      ${pillSelect("aiYearSelect", "Year:", yearLabel, years.map(String))}
      <span class="meta-btn">
        Trip: <strong>${escapeHtml(ai.trip || "All")}</strong>
      </span>
    `;
  } else if (ai.scenario === "Player Profile") {
    row2Inner = pillSelect("aiPlayerSelect", "Player:", ai.player || "—", allPlayers);
  } else if (ai.scenario === "Singles Prediction") {
    row2Inner = `
      ${pillSelect("aiP1Select", "Player 1:", ai.player1 || "—", allPlayers)}
      ${pillSelect("aiP2Select", "Player 2:", ai.player2 || "—", allPlayers)}
    `;
  } else if (ai.scenario === "Fourball Prediction") {
    row2Inner = `
      ${pillSelect("aiCA1Select", "Cali Player 1:", ai.ca1 || "—", allPlayers)}
      ${pillSelect("aiCA2Select", "Cali Player 2:", ai.ca2 || "—", allPlayers)}
      ${pillSelect("aiTX1Select", "Tex-Mex Player 1:", ai.tx1 || "—", allPlayers)}
      ${pillSelect("aiTX2Select", "Tex-Mex Player 2:", ai.tx2 || "—", allPlayers)}
    `;
  }

  const row2 = `<div class="meta">${row2Inner}</div>`;

  // Row 3: Style (left) + Generate and Clear (right)
  // Inline flex wrapper so you don’t need CSS changes.
  const row3 = `
    <div class="meta" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
      <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        ${pillSelect("aiStyleSelect", "Style:", ai.style, styleOptions)}
      </div>

      <div style="display:flex; align-items:center; gap:10px;">
        <button class="btn" id="aiGenerateBtn" type="button">Generate</button>
        <button class="btn" id="aiCopyBtn" type="button">Copy</button>
        <button class="btn" id="aiClearBtn" type="button">Clear</button>
      </div>
    </div>
  `;


  // Put the controls into the same place as other view filters
    // Put the controls into the same place as other view filters (STATUS line)
  viewControlsEl.innerHTML = ""; // controls row is hidden in CSS

  setStatusHTML(`
    <div class="meta-stack">
      ${row1}
      ${row2}
      ${row3}
    </div>
  `);

  // Body (response box placeholder)
  viewBodyEl.innerHTML = `
    <div class="tablewrap">
      <div style="border:1px solid rgba(255,255,255,0.25); border-radius:12px; min-height:320px; padding:14px;">
        <div id="aiOutput" style="white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 12px; overflow:auto; max-height: 60vh;">Actually generating responses is still under construction. For now, clicking Generate creates the prompt and data for you to copy / paste into your preferred AI LLM. For best results, Gemini or Grok are recommended.</div>
      </div>
    </div>
  `;


  // --- Wire up events (UI only) ---
  const rerender = () => renderAIAnalysis();

  document.getElementById("aiScenarioSelect").addEventListener("change", (e) => {
    ai.scenario = e.target.value;

    // Keep defaults consistent with your requirements
    if (ai.scenario === "Year/Trip Summary" && (ai.year == null) && maxYear != null) ai.year = maxYear;

    rerender();
  });

  // Year changes only exist in Year/Trip Summary scenario
  const yearEl = document.getElementById("aiYearSelect");
  if (yearEl) {
    yearEl.addEventListener("change", (e) => {
      ai.year = Number(e.target.value);
      rerender(); // updates Trip render
    });
  }

  const playerEl = document.getElementById("aiPlayerSelect");
  if (playerEl) playerEl.addEventListener("change", (e) => { ai.player = e.target.value; rerender(); });

  const p1El = document.getElementById("aiP1Select");
  if (p1El) p1El.addEventListener("change", (e) => { ai.player1 = e.target.value; rerender(); });

  const p2El = document.getElementById("aiP2Select");
  if (p2El) p2El.addEventListener("change", (e) => { ai.player2 = e.target.value; rerender(); });

  const ca1El = document.getElementById("aiCA1Select");
  if (ca1El) ca1El.addEventListener("change", (e) => { ai.ca1 = e.target.value; rerender(); });

  const ca2El = document.getElementById("aiCA2Select");
  if (ca2El) ca2El.addEventListener("change", (e) => { ai.ca2 = e.target.value; rerender(); });

  const tx1El = document.getElementById("aiTX1Select");
  if (tx1El) tx1El.addEventListener("change", (e) => { ai.tx1 = e.target.value; rerender(); });

  const tx2El = document.getElementById("aiTX2Select");
  if (tx2El) tx2El.addEventListener("change", (e) => { ai.tx2 = e.target.value; rerender(); });

  document.getElementById("aiStyleSelect").addEventListener("change", (e) => {
    ai.style = e.target.value;
    rerender();
  });

  document.getElementById("aiClearBtn").addEventListener("click", () => {
    const out = document.getElementById("aiOutput");
    if (out) out.textContent = "";
  });

  document.getElementById("aiCopyBtn").addEventListener("click", () => {
    const out = document.getElementById("aiOutput");
    const btn = document.getElementById("aiCopyBtn");
    if (!out || !out.textContent.trim()) return;
    navigator.clipboard.writeText(out.textContent).then(() => {
      if (btn) {
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 2000);
      }
    }).catch(() => {
      if (btn) {
        btn.textContent = "Copy failed — select text manually";
        setTimeout(() => { btn.textContent = "Copy"; }, 2500);
      }
    });
  });

  document.getElementById("aiGenerateBtn").addEventListener("click", async () => {
    const out = document.getElementById("aiOutput");
    if (!out) return;

    // --- Client-side rate limit (UI speed bump) ---
    /*const limit = aiClientRateLimitCheck({
      maxPerMinute: 3,
      maxPerDay: 50, // set to 0 or null to disable daily cap
    });

    if (!limit.ok) {
      const wait = msToHuman(limit.retryMs);
      if (limit.reason === "minute") {
        out.textContent = `Rate limit: 3 requests per minute. Try again in ${wait}.`;
      } else {
        out.textContent = `Daily limit reached (50/day). Try again in ${wait}.`;
      }
      return;
    }*/

    out.textContent = "Building bundle…";

    // Map UI labels to your canonical scenario ids
    const scenarioMap = {
      "Year/Trip Summary": "YEAR_TRIP_SUMMARY",
      "Player Profile": "PLAYER_PROFILE",
      "Singles Prediction": "SINGLES_PREDICTION",
      "Fourball Prediction": "FOURBALL_PREDICTION",
    };

    const scenario = scenarioMap[ai.scenario] || "PLAYER_PROFILE";

    const selections =
      scenario === "YEAR_TRIP_SUMMARY" ? { year: Number(ai.year) } :
      scenario === "PLAYER_PROFILE" ? { player: ai.player } :
      scenario === "SINGLES_PREDICTION" ? { player1: ai.player1, player2: ai.player2 } :
      { ca1: ai.ca1, ca2: ai.ca2, tx1: ai.tx1, tx2: ai.tx2 };

    try {
      const bundle = await buildAIBundle({ scenario, style: ai.style, selections });
      const promptKey = `${scenario}|${ai.style}`;
      out.textContent = "Fetching prompt\u2026";
      let promptText = await loadPrompt(promptKey);
      if (scenario === "YEAR_TRIP_SUMMARY") {
        promptText = promptText.replace(/\bYEAR\b/g, String(selections.year));
      }
      out.textContent = promptText + "\n\n---\n\nDATA:\n" + JSON.stringify(bundle, null, 2);
    } catch (e) {
      console.error(e);
      out.textContent = `Bundle build failed: ${e.message || e}`;
    }
  });
}

/***********************
 * PATCH #4: Background warm-up (prefetch derived indexes)
 ***********************/
/***********************
 * Intro video toggle
 * (set false to disable instantly)
 ***********************/
const ENABLE_INTRO_VIDEO = true;
const INTRO_MAX_WAIT_MS = 7500; // safety: never block longer than this

let _prefetchStarted = false;

async function warmupMasterData() {
  // Load master CSVs in parallel (browser cache allowed)
  await Promise.all([
    getMasterTeamResultsRaw(),
    getMasterPlayerResultsRaw(),
    getMasterMatchLogRaw(),
  ]);

  // Build derived indexes used across views
  await ensureMatchLogLoaded();
  await ensureMatchLogFullLoaded("master");
  await ensureH2HLoaded();
}


function schedulePrefetch() {
  if (_prefetchStarted) return;
  _prefetchStarted = true;

  const run = async () => {
    try {
      await warmupMasterData();
    } catch (e) {
      console.warn("Prefetch/warm-up failed:", e);
    }
  };

  // Run when the browser is idle (or after a short delay)
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => run(), { timeout: 2000 });
  } else {
    setTimeout(() => run(), 250);
  }
}

/***********************
 * INIT
 ***********************/
function initApp() {
  buildDrawer();
  setRoute(currentRoute);     // default view (Team Results) uses currentRoute
  schedulePrefetch();         // background warm-up for instant navigation later
}

function initWithIntro() {
  const overlay = document.getElementById("introOverlay");
  const video = document.getElementById("introVideo");
  // ensure overlay starts hidden until we activate it
  overlay.classList.remove("is-active");

  // Easy ON/OFF switch
  if (!ENABLE_INTRO_VIDEO || !overlay || !video) {
    initApp();
    return;
  }

  overlay.classList.add("is-active");

  let videoDone = false;
  let warmDone = false;
  let timedOut = false;

  const maybeProceed = () => {
    // Proceed when video finished AND warm-up finished,
    // OR if safety timeout triggers.
    if ((videoDone && warmDone) || timedOut) {
      overlay.classList.remove("is-active");
      initApp();
    }
  };

  // Start warm-up immediately (TRUE concurrent loading)
  warmupMasterData()
    .catch((e) => console.warn("Warmup failed:", e))
    .finally(() => {
      warmDone = true;
      maybeProceed();
    });

  // Video events
  const finishVideo = () => {
    videoDone = true;
    maybeProceed();
  };

  video.addEventListener("ended", finishVideo, { once: true });
  video.addEventListener("error", finishVideo, { once: true });

  // Autoplay attempt (muted + playsinline helps on iOS)
  video.play().catch(() => {
    // If autoplay is blocked, just treat as "done"
    finishVideo();
  });

  // Safety timeout: never get stuck here
  setTimeout(() => {
    timedOut = true;
    maybeProceed();
  }, INTRO_MAX_WAIT_MS);
}

initWithIntro();
