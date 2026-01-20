/* Latest file as of 1.19.2026 at 605pm */

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
  { id: "genai-analysis", title: "GenAI Analysis and Predictions" },
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
      View under construction.
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
