/***********************
 * CONFIG: CSV URLS
 ***********************/
const CSV = {
  masterMatchLog:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHJf5JjoRNkO4wkTzgq_Uf4Wcye3HOghJ3HePez8gfnaeASLGvHqrsECYRQGSVfANqcxqL59KgkmL/pub?gid=0&single=true&output=csv",

  masterPlayerResults:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHJf5JjoRNkO4wkTzgq_Uf4Wcye3HOghJ3HePez8gfnaeASLGvHqrsECYRQGSVfANqcxqL59KgkmL/pub?gid=1256859448&single=true&output=csv",

  masterTeamResults: "",
};

/***********************
 * IMAGES (static lists)
 ***********************/
const LOGO_FILES = [
  "Logo23 - 2025 - Sand Valley.jpg",
  "Logo22 - 2024 - St. George.jpg",
  "Logo21 - 2023 - Payne's Valley.jpg",
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
  "Course24 - 2023 - Payne's Valley.jpg",
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
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const drawerNav = document.getElementById("drawerNav");

/***********************
 * ROUTER / NAV
 ***********************/
const VIEWS = [
  { id: "team-results", title: "Team Results" },
  { id: "player-results", title: "Player Results" },
  { id: "tournament-view", title: "Tournament View" },
  { id: "player-match-history", title: "Player Match History" },
  { id: "player-bios", title: "Player Bios" },
  { id: "nemesis", title: "Player Dominance vs Nemesis" },
  { id: "logos-maps", title: "Logos and Course Maps" },
  { id: "current-scoreboard", title: "Current Year Scoreboard" },
];

let currentRoute = "player-match-history";

/***********************
 * Shared caches
 ***********************/
const cache = {
  matchLogLoaded: false,
  matchLogPromise: null,
  matchLogRows: [],
  teamByPlayerYear: new Map(), // from match log
};

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
    expandedPlayers: new Set(),
    selectedTrip: "All",
    availableTrips: [],
    sort: { col: null, dir: null },
    defaultSort: { col: "wins", dir: "desc" },
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
  buildDrawer();

  viewControlsEl.innerHTML = "";
  viewBodyEl.innerHTML = "";
  setStatusHTML("");

  const view = VIEWS.find((v) => v.id === routeId);
  viewTitleEl.textContent = view ? view.title : "NSRC";

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
    viewSort.dir = "asc";
    return;
  }
  if (viewSort.dir === "asc") {
    viewSort.dir = "desc";
    return;
  }
  viewSort.col = null;
  viewSort.dir = null;
}

function sortIndicator(viewSort, col) {
  if (viewSort.col !== col) return "";
  return viewSort.dir === "asc" ? "▲" : "▼";
}

/***********************
 * Match log team index (PMH uses this)
 ***********************/
function ensureMatchLogLoaded() {
  if (cache.matchLogLoaded) return Promise.resolve(cache.matchLogRows);
  if (cache.matchLogPromise) return cache.matchLogPromise;

  cache.matchLogPromise = (async () => {
    const res = await fetch(CSV.masterMatchLog, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (val) => (typeof val === "string" ? val.trim() : val),
    });

    if (parsed.errors?.length) throw new Error("CSV parse error");

    cache.matchLogRows = parsed.data
      .filter((r) => r.Player && r.Year)
      .map((r) => ({
        player: r.Player,
        year: Number(String(r.Year).trim()),
        team: (r.Team || "").trim(),
      }))
      .filter((r) => Number.isFinite(r.year));

    buildTeamByPlayerYearIndex(cache.matchLogRows);

    cache.matchLogLoaded = true;
    return cache.matchLogRows;
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
    const trips = ["All", ...pr.availableTrips];
    const tripLabel = pr.selectedTrip;

    setStatusHTML(`
      <div class="meta">
        <span class="meta-btn">
          Trip: <strong>${escapeHtml(tripLabel)}</strong>
          <select class="chip-select" id="prTripSelect" aria-label="Trip filter">
            ${trips.map(t => `<option value="${escapeHtml(t)}"${t===tripLabel?" selected":""}>${escapeHtml(t)}</option>`).join("")}
          </select>
        </span>
        <span class="sep">•</span>
        <span>Players: ${playersCount}</span>
      </div>
    `);

    document.getElementById("prTripSelect").addEventListener("change", (e) => {
      pr.selectedTrip = e.target.value;
      pr.expandedPlayers.clear();
      render();
    });
  }

  async function loadData() {
    setStatusHTML(`<div class="meta"><span>Loading Player Results…</span></div>`);
    tbodyEl.innerHTML = "";

    const res = await fetch(CSV.masterPlayerResults, { cache: "no-store" });
    if (!res.ok) {
      setStatusHTML(`<div class="meta"><span>Failed to load Player Results.</span></div>`);
      return;
    }
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (val) => (typeof val === "string" ? val.trim() : val),
    });

    if (parsed.errors?.length) {
      console.error(parsed.errors);
      setStatusHTML(`<div class="meta"><span>Failed to parse Player Results.</span></div>`);
      return;
    }

    pr.rows = parsed.data;
    pr.expandedPlayers.clear();

    // Trips (A→Z)
    const sample = pr.rows[0] || {};
    const tripCol = pickFirstColumn(sample, COLS.trip);
    if (tripCol) {
      const tripSet = new Set(
        pr.rows
          .map((r) => String(r[tripCol] ?? "").trim())
          .filter((t) => t && t.toLowerCase() !== "total" && t.toLowerCase() !== "all")
      );
      pr.availableTrips = Array.from(tripSet).sort((a, b) => String(a).localeCompare(String(b)));
    } else {
      pr.availableTrips = [];
    }

    // Keep selection valid
    if (pr.selectedTrip !== "All" && !pr.availableTrips.includes(pr.selectedTrip)) {
      pr.selectedTrip = "All";
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

      if (tripCol && pr.selectedTrip !== "All") {
        const trip = String(r[tripCol] ?? "").trim();
        if (trip !== pr.selectedTrip) continue;
      }

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

    let players = Array.from(totalsByPlayer.entries()).map(([player, t]) => {
      const denom = t.wins + t.losses;
      const pct = denom > 0 ? t.wins / denom : 0;
      return { player, wins: t.wins, losses: t.losses, pct };
    });

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
        const years = Array.from(ym.keys()).sort((a, b) => b - a);

        for (const y of years) {
          const a = ym.get(y);
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
            <th class="num sortable" data-col="pct">Pts%<span class="sort-ind" id="pmhSortPct"></span></th>
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
    const y = Number(String(rawRow.Year ?? "").trim());
    return Number.isFinite(y) ? y : null;
  }

  async function loadData() {
    setStatusHTML(`<div class="meta"><span>Loading data…</span></div>`);
    tbodyEl.innerHTML = "";

    try {
      await ensureMatchLogLoaded();

      const res = await fetch(CSV.masterMatchLog, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
        transform: (val) => (typeof val === "string" ? val.trim() : val),
      });

      if (parsed.errors?.length) throw new Error("CSV parse error");

      pmh.allRows = parsed.data
        .filter((r) => r.Player && r.Format && r.Result)
        .map((r) => {
          const points = r.Points === "" || r.Points == null ? null : Number(r.Points);
          return {
            player: r.Player,
            format: r.Format,
            result: r.Result,
            points: Number.isFinite(points) ? points : null,
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
 * INIT
 ***********************/
buildDrawer();
setRoute(currentRoute);
