const USERNAME = "crazyzhang277";
const API_ROOT = "https://api.github.com";
const UNGH_ROOT = "https://ungh.cc";
const JSDELIVR_ROOT = "https://cdn.jsdelivr.net/gh";
const SNAPSHOT_URL = "./data/github-snapshot.json";
const READMES_SNAPSHOT_URL = "./data/readmes.json";
const CACHE_KEY = "signal-archive:cache:v2";
const BOOKMARKS_KEY = "signal-archive:bookmarks:v1";
const THEME_KEY = "signal-archive:theme";

const API_HEADERS = {
  Accept: "application/vnd.github+json",
};

const icons = {
  arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>',
  external: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>',
  star: '<svg class="icon icon-star" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>',
  fork: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M6 8.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M12 12.5v3" /></svg>',
  bookmark: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4V4Z" /></svg>',
};

const fallbackUser = {
  login: USERNAME,
  name: "Zhang Zihao",
  avatar_url: "https://avatars.githubusercontent.com/u/238443114?v=4",
  html_url: "https://github.com/crazyzhang277",
  public_repos: 12,
  followers: 0,
  following: 2,
};

const fallbackRepos = [
  {
    name: "github-trending",
    description: "实时展示 GitHub Trending 项目的现代化 Web 应用",
    html_url: "https://github.com/crazyzhang277/github-trending",
    default_branch: "master",
    homepage: "",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-11-19T01:31:44Z",
    updated_at: "2026-10-18T07:15:35Z",
    fork: false,
    archived: false,
  },
  {
    name: "short-drama-bgm",
    description: "本地短剧批量配背景音乐桌面工具（Electron）",
    html_url: "https://github.com/crazyzhang277/short-drama-bgm",
    default_branch: "main",
    homepage: "",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-11-18T11:48:35Z",
    updated_at: "2026-11-12T03:34:53Z",
    fork: false,
    archived: false,
  },
  {
    name: "zihao-personal-station",
    description: "Zhang Zihao personal geek station",
    html_url: "https://github.com/crazyzhang277/zihao-personal-station",
    default_branch: "main",
    homepage: "",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-11-01T10:13:54Z",
    updated_at: "2026-11-01T10:13:58Z",
    fork: false,
    archived: false,
  },
  {
    name: "short-drama-renamer",
    description: "Batch renamer for short-drama videos — native Win32 GUI, single exe",
    html_url: "https://github.com/crazyzhang277/short-drama-renamer",
    default_branch: "main",
    homepage: "",
    language: "C++",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["batch-rename", "cpp", "gui", "renamer", "short-drama", "single-exe", "video-tools", "win32", "windows"],
    pushed_at: "2026-10-29T13:28:56Z",
    updated_at: "2026-10-29T13:28:59Z",
    fork: false,
    archived: false,
  },
  {
    name: "MusicMP3",
    description: "一键将加密的音乐格式转换成mp3格式。",
    html_url: "https://github.com/crazyzhang277/MusicMP3",
    default_branch: "master",
    homepage: "",
    language: "C++",
    stargazers_count: 1,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-09-10T12:02:51Z",
    updated_at: "2026-09-10T12:03:38Z",
    fork: false,
    archived: false,
  },
  {
    name: "codex-antigravity-bridge",
    description: "Let Codex supervise Google Antigravity agents through MCP with scoped tasks, plan-driven workflows, and parallel Git worktrees.",
    html_url: "https://github.com/crazyzhang277/codex-antigravity-bridge",
    default_branch: "main",
    homepage: "",
    language: "Python",
    stargazers_count: 7,
    forks_count: 3,
    topics: ["agy", "ai-agent", "antigravity", "codex", "coding-agent", "developer-tools", "git-worktree", "mcp", "multi-agent", "python"],
    pushed_at: "2026-08-09T08:50:08Z",
    updated_at: "2026-10-29T05:21:31Z",
    fork: false,
    archived: false,
  },
  {
    name: "clash-verge-sub-sync",
    description: "Clash Verge 订阅配置同步辅助脚本",
    html_url: "https://github.com/crazyzhang277/clash-verge-sub-sync",
    default_branch: "main",
    homepage: "",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-08-14T15:02:59Z",
    updated_at: "2026-08-14T15:06:42Z",
    fork: false,
    archived: false,
  },
  {
    name: "my-food-web",
    description: "美食展示与交互网页实验项目",
    html_url: "https://github.com/crazyzhang277/my-food-web",
    default_branch: "main",
    homepage: "",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-08-12T16:06:43Z",
    updated_at: "2026-08-12T16:07:32Z",
    fork: false,
    archived: false,
  },
  {
    name: "zhangzihao-resume",
    description: "Personal resume website",
    html_url: "https://github.com/crazyzhang277/zhangzihao-resume",
    default_branch: "main",
    homepage: "https://zhangzihao-resume.pages.dev/",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-08-12T05:50:10Z",
    updated_at: "2026-08-12T05:51:15Z",
    fork: false,
    archived: false,
  },
  {
    name: "zhangzihao-signal-archive",
    description: "Zhang Zihao 实时 GitHub 开源项目档案与信号索引站点",
    html_url: "https://github.com/crazyzhang277/zhangzihao-signal-archive",
    default_branch: "master",
    homepage: "https://crazyzhang277.github.io/zhangzihao-signal-archive/",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-08-08T12:18:19Z",
    updated_at: "2026-08-08T12:18:26Z",
    fork: false,
    archived: false,
  },
  {
    name: "520-Prank-Review",
    description: "520-Prank-Review",
    html_url: "https://github.com/crazyzhang277/520-Prank-Review",
    default_branch: "main",
    homepage: "https://crazyzhang277.github.io/520-Prank-Review/",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-07-27T06:45:38Z",
    updated_at: "2026-07-27T06:49:22Z",
    fork: false,
    archived: false,
  },
  {
    name: "SnapBatchPro",
    description: "一个简单的批量提取视频帧工具",
    html_url: "https://github.com/crazyzhang277/SnapBatchPro",
    default_branch: "master",
    homepage: "",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-07-22T09:46:20Z",
    updated_at: "2026-07-22T09:47:52Z",
    fork: false,
    archived: false,
  },
];

const languageColors = {
  TypeScript: "#3178c6",
  Python: "#c84b31",
  JavaScript: "#d49b27",
  "C++": "#b23a6f",
  HTML: "#1d5b57",
  CSS: "#5b5ea6",
  default: "#6b7280",
};

const state = {
  user: fallbackUser,
  repos: fallbackRepos.map((repo) => ({ ...repo })),
  events: [],
  filter: "All",
  query: "",
  sort: "recent",
  starredOnly: false,
  demoOnly: false,
  savedOnly: false,
  timelineMode: "events",
  bookmarks: loadBookmarks(),
  sourceLabel: "SNAPSHOT",
  detailRepo: null,
  starPolling: null,
  toastTimer: null,
  readmeCache: new Map(),
  snapshotReadmes: null,
  snapshotReadmesPromise: null,
  githubApiBlockedUntil: 0,
};

const elements = {
  syncNowButton: document.querySelector("#syncNowButton"),
  syncStatus: document.querySelector("#syncStatus"),
  themeToggle: document.querySelector("#themeToggle"),
  jumpStarredButton: document.querySelector("#jumpStarredButton"),
  profileAvatar: document.querySelector("#profileAvatar"),
  profileName: document.querySelector("#profileName"),
  lastSync: document.querySelector("#lastSync"),
  topRepoName: document.querySelector("#topRepoName"),
  topRepoStars: document.querySelector("#topRepoStars"),
  topRepoDesc: document.querySelector("#topRepoDesc"),
  heroLangBar: document.querySelector("#heroLangBar"),
  primaryLanguageSummary: document.querySelector("#primaryLanguageSummary"),
  dataSourceLabel: document.querySelector("#dataSourceLabel"),
  openTopRepoButton: document.querySelector("#openTopRepoButton"),
  repoCount: document.querySelector("#repoCount"),
  totalStarsCount: document.querySelector("#totalStarsCount"),
  totalForksCount: document.querySelector("#totalForksCount"),
  languageCount: document.querySelector("#languageCount"),
  topicCount: document.querySelector("#topicCount"),
  latestUpdate: document.querySelector("#latestUpdate"),
  featuredGrid: document.querySelector("#featuredGrid"),
  filterList: document.querySelector("#filterList"),
  toggleStarredOnly: document.querySelector("#toggleStarredOnly"),
  toggleDemoOnly: document.querySelector("#toggleDemoOnly"),
  toggleSavedOnly: document.querySelector("#toggleSavedOnly"),
  savedCountBadge: document.querySelector("#savedCountBadge"),
  projectSearch: document.querySelector("#projectSearch"),
  clearSearch: document.querySelector("#clearSearch"),
  projectSort: document.querySelector("#projectSort"),
  activeSummary: document.querySelector("#activeSummary"),
  projectGrid: document.querySelector("#projectGrid"),
  emptyState: document.querySelector("#emptyState"),
  resetFiltersButton: document.querySelector("#resetFiltersButton"),
  languageBreakdown: document.querySelector("#languageBreakdown"),
  topicCloud: document.querySelector("#topicCloud"),
  timelineModeEvents: document.querySelector("#timelineModeEvents"),
  timelineModeRepos: document.querySelector("#timelineModeRepos"),
  timeline: document.querySelector("#timeline"),
  currentYear: document.querySelector("#currentYear"),
  projectDialog: document.querySelector("#projectDialog"),
  dialogBranch: document.querySelector("#dialogBranch"),
  dialogLicense: document.querySelector("#dialogLicense"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogBookmarkButton: document.querySelector("#dialogBookmarkButton"),
  dialogShareButton: document.querySelector("#dialogShareButton"),
  closeDialog: document.querySelector("#closeDialog"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogMeta: document.querySelector("#dialogMeta"),
  dialogTags: document.querySelector("#dialogTags"),
  dialogStarCount: document.querySelector("#dialogStarCount"),
  dialogForkCount: document.querySelector("#dialogForkCount"),
  dialogStarStatus: document.querySelector("#dialogStarStatus"),
  refreshStars: document.querySelector("#refreshStars"),
  starRepoAction: document.querySelector("#starRepoAction"),
  dialogCloneCommand: document.querySelector("#dialogCloneCommand"),
  copyCloneButton: document.querySelector("#copyCloneButton"),
  dialogActions: document.querySelector("#dialogActions"),
  readmeState: document.querySelector("#readmeState"),
  readmeContent: document.querySelector("#readmeContent"),
  toast: document.querySelector("#toast"),
};

document.documentElement.classList.add("js-ready");

function loadBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    const list = JSON.parse(raw || "[]");
    return new Set(Array.isArray(list) ? list : []);
  } catch (error) {
    return new Set();
  }
}

function saveBookmarks() {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...state.bookmarks]));
  } catch (error) {
    // Ignore storage quota errors in restricted browsing modes.
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function formatDate(value) {
  if (!value) return "未知时间";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知时间";
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function formatYear(value) {
  if (!value) return "2026";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "2026" : String(date.getFullYear());
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);
}

function parseStarCount(value) {
  const match = String(value ?? "").trim().toLowerCase().replace(/,/g, "").match(/^(\d+(?:\.\d+)?)\s*([km])?$/);
  if (!match) return NaN;
  return Number(match[1]) * ({ k: 1000, m: 1000000 }[match[2]] || 1);
}

function formatCheckTime() {
  return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
}

function getLanguageColor(language) {
  return languageColors[language] || languageColors.default;
}

function getLanguageCounts(repos) {
  const counts = new Map();
  repos.forEach((repo) => {
    const lang = repo.language || "Other";
    counts.set(lang, (counts.get(lang) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function getTopicCounts(repos) {
  const counts = new Map();
  repos.forEach((repo) => {
    (repo.topics || []).forEach((topic) => {
      counts.set(topic, (counts.get(topic) || 0) + 1);
    });
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function sortRepos(repos, mode) {
  const copy = [...repos];
  if (mode === "stars") {
    return copy.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || (b.forks_count || 0) - (a.forks_count || 0));
  }
  if (mode === "forks") {
    return copy.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0) || (b.stargazers_count || 0) - (a.stargazers_count || 0));
  }
  if (mode === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy.sort((a, b) => {
    const aTime = new Date(a.pushed_at || a.updated_at || 0).getTime();
    const bTime = new Date(b.pushed_at || b.updated_at || 0).getTime();
    return bTime - aTime;
  });
}

function getFeaturedRepos() {
  return sortRepos(state.repos, "recent")
    .map((repo) => ({
      repo,
      score:
        (repo.stargazers_count || 0) * 5 +
        (repo.forks_count || 0) * 3 +
        (repo.homepage ? 4 : 0) +
        (repo.description ? 2 : 0) +
        Math.min((repo.topics || []).length, 4) +
        (repo.archived ? -4 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.repo);
}

function getTopStarredRepo() {
  return sortRepos(state.repos, "stars")[0] || state.repos[0] || null;
}

function projectTitle(name) {
  return String(name || "").replace(/[-_]+/g, " ");
}

function projectTags(repo, limit = 4) {
  const tags = (repo.topics || []).length ? repo.topics : [repo.language || "Repository"];
  return tags
    .slice(0, limit)
    .map((tag) => '<span class="project-tag">' + escapeHtml(tag) + "</span>")
    .join("");
}

function projectCard(repo, index, featured) {
  const language = repo.language || "Mixed";
  const cardClass = featured ? "featured-card" : "project-card";
  const description = repo.description || "暂无公开描述，点击卡片查看 README 文档与最新状态。";
  const stars = Number(repo.stargazers_count) || 0;
  const forks = Number(repo.forks_count) || 0;
  const isSaved = state.bookmarks.has(repo.name);
  const starClass = stars > 0 ? "project-signal has-stars" : "project-signal";
  const demoLink = repo.homepage
    ? '<a class="project-link" href="' + escapeHtml(repo.homepage) + '" target="_blank" rel="noreferrer">演示 ' + icons.external + "</a>"
    : "";

  return (
    '<article class="' + cardClass + '" data-reveal style="--delay:' + Math.min(index * 45, 220) + 'ms">' +
    '<button class="card-hit-area" type="button" data-repo="' + escapeHtml(repo.name) + '" aria-label="打开项目详情：' + escapeHtml(repo.name) + '"></button>' +
    '<div class="project-card-body">' +
    '<div class="project-card-top">' +
    '<span class="language-label"><span class="language-dot" style="background:' + getLanguageColor(repo.language) + '"></span>' + escapeHtml(language) + "</span>" +
    '<div class="card-top-right">' +
    '<span class="' + starClass + '" data-star-count="' + escapeHtml(repo.name) + '" title="实时 GitHub Star 数">' +
    icons.star +
    ' <span data-star-value>' + escapeHtml(formatNumber(stars)) + "</span></span>" +
    '<button class="bookmark-btn' + (isSaved ? " is-saved" : "") + '" type="button" data-bookmark="' + escapeHtml(repo.name) + '" aria-label="' + (isSaved ? "取消本地收藏" : "本地收藏该项目") + '" title="' + (isSaved ? "取消收藏" : "本地收藏") + '">' +
    icons.bookmark +
    "</button>" +
    "</div>" +
    "</div>" +
    "<h3>" + escapeHtml(projectTitle(repo.name)) + "</h3>" +
    '<p class="project-description">' + escapeHtml(description) + "</p>" +
    '<div class="project-tags">' + projectTags(repo, featured ? 3 : 4) + "</div>" +
    '<div class="project-footer">' +
    '<div class="project-metrics">' +
    "<span>" + escapeHtml(formatDate(repo.pushed_at || repo.updated_at)) + "</span>" +
    (forks > 0 ? '<span class="language-label">' + icons.fork + " " + escapeHtml(formatNumber(forks)) + "</span>" : "") +
    "</div>" +
    '<div class="project-footer-links">' +
    demoLink +
    '<button class="card-detail" type="button" data-repo="' + escapeHtml(repo.name) + '">详情 ' + icons.arrow + "</button>" +
    '<a class="project-link" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">GitHub ' + icons.external + "</a>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function renderTotalsAndHero() {
  const totalStars = state.repos.reduce((sum, repo) => sum + (Number(repo.stargazers_count) || 0), 0);
  const totalForks = state.repos.reduce((sum, repo) => sum + (Number(repo.forks_count) || 0), 0);
  const langCounts = getLanguageCounts(state.repos.filter((repo) => repo.language));
  const topicCounts = getTopicCounts(state.repos);
  const recentRepo = sortRepos(state.repos, "recent")[0];
  const topRepo = getTopStarredRepo();

  elements.repoCount.textContent = state.repos.length;
  elements.totalStarsCount.textContent = formatNumber(totalStars);
  elements.totalForksCount.textContent = formatNumber(totalForks);
  elements.languageCount.textContent = langCounts.length;
  elements.topicCount.textContent = topicCounts.length;
  elements.latestUpdate.textContent = formatYear(recentRepo?.pushed_at || recentRepo?.updated_at);
  elements.profileAvatar.src = state.user.avatar_url || fallbackUser.avatar_url;
  elements.profileName.textContent = state.user.name || "Zhang Zihao";
  elements.savedCountBadge.textContent = state.bookmarks.size;

  if (topRepo) {
    elements.topRepoName.textContent = topRepo.name;
    elements.topRepoStars.querySelector("span").textContent = formatNumber(topRepo.stargazers_count || 0);
    elements.topRepoDesc.textContent = topRepo.description || "点击查看该项目详情与 README 文档。";
    elements.openTopRepoButton.onclick = () => openProjectDialog(topRepo);
  }

  const totalWithLang = langCounts.reduce((sum, [, count]) => sum + count, 0) || 1;
  elements.heroLangBar.innerHTML = langCounts
    .map(([lang, count]) => {
      const pct = ((count / totalWithLang) * 100).toFixed(1);
      return '<span style="width:' + pct + "%;background:" + getLanguageColor(lang) + '" title="' + escapeHtml(lang) + ": " + count + '"></span>';
    })
    .join("");
  elements.primaryLanguageSummary.textContent = langCounts.slice(0, 3).map(([lang]) => lang).join(" · ") || "Mixed";
  elements.dataSourceLabel.textContent = "SOURCE: " + state.sourceLabel;
}

function renderFilters() {
  const langCounts = getLanguageCounts(state.repos.filter((repo) => repo.language));
  const filters = [["All", state.repos.length], ...langCounts];
  elements.filterList.innerHTML = filters
    .map(([filter, count]) => {
      const label = filter === "All" ? "全部" : filter;
      return (
        '<button class="filter-button' + (state.filter === filter ? " is-active" : "") + '" type="button" data-filter="' + escapeHtml(filter) + '">' +
        escapeHtml(label) +
        ' <span class="filter-count">' + count + "</span></button>"
      );
    })
    .join("");
}

function renderFeatured() {
  elements.featuredGrid.innerHTML = getFeaturedRepos().map((repo, index) => projectCard(repo, index, true)).join("");
}

function getVisibleRepos() {
  const query = state.query.trim().toLowerCase();
  const filtered = state.repos.filter((repo) => {
    if (state.filter !== "All" && repo.language !== state.filter) return false;
    if (state.starredOnly && !(Number(repo.stargazers_count) > 0)) return false;
    if (state.demoOnly && !repo.homepage) return false;
    if (state.savedOnly && !state.bookmarks.has(repo.name)) return false;
    if (!query) return true;
    const haystack = [repo.name, repo.description, repo.language, ...(repo.topics || [])].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(query);
  });
  return sortRepos(filtered, state.sort);
}

function renderProjects() {
  const visible = getVisibleRepos();
  elements.projectGrid.innerHTML = visible.map((repo, index) => projectCard(repo, index, false)).join("");
  elements.emptyState.hidden = visible.length > 0;
  elements.clearSearch.hidden = !state.query.length;

  const activeFilters = [];
  if (state.filter !== "All") activeFilters.push("语言: " + state.filter);
  if (state.starredOnly) activeFilters.push("仅看有 Star");
  if (state.demoOnly) activeFilters.push("仅看在线演示");
  if (state.savedOnly) activeFilters.push("仅看我的收藏");
  if (state.query.trim()) activeFilters.push('关键词: "' + state.query.trim() + '"');

  const summaryText = "当前显示 " + visible.length + " / " + state.repos.length + " 个仓库";
  elements.activeSummary.innerHTML =
    "<span>" + escapeHtml(summaryText) + (activeFilters.length ? " · " + escapeHtml(activeFilters.join(" · ")) : "") + "</span>" +
    (activeFilters.length ? '<button class="text-action" id="inlineResetButton" type="button">清除筛选</button>' : "");

  const inlineReset = document.querySelector("#inlineResetButton");
  if (inlineReset) inlineReset.addEventListener("click", resetAllFilters);
}

function renderStackSection() {
  const langCounts = getLanguageCounts(state.repos.filter((repo) => repo.language));
  const maxLang = langCounts[0]?.[1] || 1;
  elements.languageBreakdown.innerHTML = langCounts
    .map(([lang, count]) => {
      const width = Math.max(10, Math.round((count / maxLang) * 100));
      return (
        '<button class="lang-row" type="button" data-jump-lang="' + escapeHtml(lang) + '">' +
        '<span class="lang-row-name"><span class="language-dot" style="background:' + getLanguageColor(lang) + '"></span>' + escapeHtml(lang) + "</span>" +
        '<span class="lang-row-track"><span class="lang-row-fill" style="width:' + width + "%;background:" + getLanguageColor(lang) + '"></span></span>' +
        '<span class="lang-row-count">' + count + " 个</span>" +
        "</button>"
      );
    })
    .join("");

  const topics = getTopicCounts(state.repos);
  elements.topicCloud.innerHTML = topics.length
    ? topics
        .map(
          ([topic, count]) =>
            '<button class="topic-pill" type="button" data-jump-topic="' + escapeHtml(topic) + '">#' + escapeHtml(topic) + "<span>" + count + "</span></button>"
        )
        .join("")
    : '<p class="section-desc">暂无公开 Topic 标签。</p>';
}

function formatEventDescription(event) {
  const repoFullName = String(event.repo?.name || event.repo || "").trim();
  const [repoOwner = "", repoNameOnly = ""] = repoFullName.split("/");
  const repoShort = repoNameOnly || repoFullName;
  const isOwnRepo = repoOwner
    ? repoOwner.toLowerCase() === USERNAME.toLowerCase()
    : Boolean(repoShort && state.repos.some((item) => item.name.toLowerCase() === repoShort.toLowerCase()));
  const displayRepo = isOwnRepo ? repoShort : repoFullName || repoShort;
  const safeRepoPath = repoFullName
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const repoUrl = safeRepoPath
    ? "https://github.com/" + safeRepoPath
    : "https://github.com/" + USERNAME;
  const payload = event.payload || {};

  if (event.type === "PushEvent") {
    const branch = String(payload.ref || "main").replace("refs/heads/", "");
    const commitMsg = payload.commits?.[0]?.message;
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "PUSH · " + branch,
      detail: commitMsg ? commitMsg : "向 " + branch + " 分支推送更新",
    };
  }
  if (event.type === "CreateEvent") {
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "CREATE · " + String(payload.ref_type || "repo").toUpperCase(),
      detail: payload.ref ? "创建分支或标签 " + payload.ref : "初始化仓库",
    };
  }
  if (event.type === "ReleaseEvent") {
    const tag = payload.release?.tag_name || payload.release?.name || "";
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: tag ? "RELEASE · " + tag : "RELEASE",
      detail: tag ? "发布版本 " + tag : "发布新的 Release 版本",
    };
  }
  if (event.type === "WatchEvent") {
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "STARRED",
      detail: isOwnRepo ? "仓库收到或点亮 Star 信号" : "Star 了开源项目 " + (repoFullName || repoShort),
    };
  }
  if (event.type === "ForkEvent") {
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "FORK",
      detail: "Fork 了仓库 " + (repoFullName || repoShort),
    };
  }
  if (event.type === "PullRequestEvent") {
    const action = payload.action || "updated";
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "PR · " + String(action).toUpperCase(),
      detail: payload.pull_request?.title || "Pull Request 动态更新",
    };
  }
  if (event.type === "IssuesEvent") {
    const action = payload.action || "updated";
    return {
      repoFullName,
      repoShort,
      displayRepo,
      isOwnRepo,
      repoUrl,
      badge: "ISSUE · " + String(action).toUpperCase(),
      detail: payload.issue?.title || "Issue 动态更新",
    };
  }
  return {
    repoFullName,
    repoShort,
    displayRepo,
    isOwnRepo,
    repoUrl,
    badge: String(event.type || "EVENT").replace(/Event$/, "").toUpperCase(),
    detail: "GitHub 仓库公开动态更新",
  };
}

function renderTimeline() {
  elements.timelineModeEvents.classList.toggle("is-active", state.timelineMode === "events");
  elements.timelineModeRepos.classList.toggle("is-active", state.timelineMode === "repos");

  if (state.timelineMode === "events" && state.events.length > 0) {
    elements.timeline.innerHTML = state.events
      .slice(0, 10)
      .map((event) => {
        const info = formatEventDescription(event);
        const matchingRepo = info.isOwnRepo
          ? state.repos.find((item) => item.name.toLowerCase() === info.repoShort.toLowerCase())
          : null;
        const repoUrl = matchingRepo ? matchingRepo.html_url : info.repoUrl;
        return (
          '<div class="timeline-item">' +
          '<span class="timeline-date">' + escapeHtml(formatDate(event.created_at)) + "</span>" +
          '<div class="timeline-main">' +
          '<div class="timeline-title-row"><h3>' + escapeHtml(info.displayRepo) + '</h3><span class="timeline-badge">' + escapeHtml(info.badge) + "</span></div>" +
          "<p>" + escapeHtml(info.detail) + "</p>" +
          "</div>" +
          '<div class="timeline-actions">' +
          (matchingRepo ? '<button class="card-detail" type="button" data-repo="' + escapeHtml(matchingRepo.name) + '">详情 ' + icons.arrow + "</button>" : "") +
          '<a class="timeline-link" href="' + escapeHtml(repoUrl) + '" target="_blank" rel="noreferrer">仓库 ' + icons.external + "</a>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    return;
  }

  elements.timeline.innerHTML = sortRepos(state.repos, "recent")
    .map((repo) => (
      '<div class="timeline-item">' +
      '<span class="timeline-date">' + escapeHtml(formatDate(repo.pushed_at || repo.updated_at)) + "</span>" +
      '<div class="timeline-main">' +
      '<div class="timeline-title-row"><h3>' + escapeHtml(repo.name) + '</h3><span class="timeline-badge">' + escapeHtml(repo.language || "Project") + "</span></div>" +
      "<p>" + escapeHtml(repo.description || "暂无公开简介") + "</p>" +
      "</div>" +
      '<div class="timeline-actions">' +
      '<button class="card-detail" type="button" data-repo="' + escapeHtml(repo.name) + '">详情 ' + icons.arrow + "</button>" +
      '<a class="timeline-link" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">仓库 ' + icons.external + "</a>" +
      "</div>" +
      "</div>"
    ))
    .join("");
}

function observeReveals() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  const revealIfInView = (element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 120) {
      element.style.transitionDelay = element.style.getPropertyValue("--delay") || "0ms";
      element.classList.add("is-visible");
      return true;
    }
    return false;
  };
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = entry.target.style.getPropertyValue("--delay") || "0ms";
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.01, rootMargin: "80px 0px" }
  );
  revealElements.forEach((element) => {
    if (!revealIfInView(element)) observer.observe(element);
  });
}

function bindDelegatedHandlers() {
  document.addEventListener("click", (event) => {
    const bookmarkBtn = event.target.closest("[data-bookmark]");
    if (bookmarkBtn) {
      event.stopPropagation();
      toggleBookmark(bookmarkBtn.dataset.bookmark);
      return;
    }

    const filterBtn = event.target.closest("[data-filter]");
    if (filterBtn) {
      state.filter = filterBtn.dataset.filter;
      renderFilters();
      renderProjects();
      observeReveals();
      return;
    }

    const repoBtn = event.target.closest("[data-repo]");
    if (repoBtn) {
      const repo = state.repos.find((item) => item.name === repoBtn.dataset.repo);
      if (repo) openProjectDialog(repo);
      return;
    }

    const langBtn = event.target.closest("[data-jump-lang]");
    if (langBtn) {
      state.filter = langBtn.dataset.jumpLang;
      renderFilters();
      renderProjects();
      observeReveals();
      document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
      return;
    }

    const topicBtn = event.target.closest("[data-jump-topic]");
    if (topicBtn) {
      state.filter = "All";
      state.query = topicBtn.dataset.jumpTopic;
      elements.projectSearch.value = state.query;
      renderFilters();
      renderProjects();
      observeReveals();
      document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
    }
  });
}

function render() {
  renderTotalsAndHero();
  renderFilters();
  renderFeatured();
  renderProjects();
  renderStackSection();
  renderTimeline();
  elements.currentYear.textContent = new Date().getFullYear();
  observeReveals();
}

function toggleBookmark(repoName) {
  if (!repoName) return;
  if (state.bookmarks.has(repoName)) {
    state.bookmarks.delete(repoName);
    showToast("已从本地收藏移除：" + repoName);
  } else {
    state.bookmarks.add(repoName);
    showToast("已加入本地收藏：" + repoName);
  }
  saveBookmarks();
  render();
  if (state.detailRepo && state.detailRepo.name === repoName) {
    updateDialogBookmarkButton(repoName);
  }
}

function updateDialogBookmarkButton(repoName) {
  const isSaved = state.bookmarks.has(repoName);
  elements.dialogBookmarkButton.classList.toggle("is-saved", isSaved);
  elements.dialogBookmarkButton.setAttribute("aria-label", isSaved ? "取消本地收藏" : "本地收藏该项目");
}

function resetAllFilters() {
  state.filter = "All";
  state.query = "";
  state.sort = "recent";
  state.starredOnly = false;
  state.demoOnly = false;
  state.savedOnly = false;
  elements.projectSearch.value = "";
  elements.projectSort.value = "recent";
  elements.toggleStarredOnly.setAttribute("aria-pressed", "false");
  elements.toggleDemoOnly.setAttribute("aria-pressed", "false");
  elements.toggleSavedOnly.setAttribute("aria-pressed", "false");
  renderFilters();
  renderProjects();
  observeReveals();
}

function renderDialogMeta(repo) {
  const items = [
    repo.language || "Mixed",
    "最近推送 " + formatDate(repo.pushed_at || repo.updated_at),
    formatNumber(repo.stargazers_count || 0) + " stars",
    formatNumber(repo.forks_count || 0) + " forks",
  ];
  elements.dialogMeta.innerHTML = items.map((item) => "<span>" + escapeHtml(item) + "</span>").join("");
}

function renderStarPanel(repo, status) {
  elements.dialogStarCount.textContent = formatNumber(repo.stargazers_count || 0);
  elements.dialogForkCount.textContent = formatNumber(repo.forks_count || 0);
  elements.dialogStarStatus.textContent = status;
  elements.starRepoAction.href = repo.html_url;
}

function updateStarCountBadges(repo) {
  const formatted = formatNumber(repo.stargazers_count || 0);
  const hasStars = Number(repo.stargazers_count) > 0;
  document.querySelectorAll('[data-star-count="' + CSS.escape(repo.name) + '"]').forEach((element) => {
    const valueEl = element.querySelector("[data-star-value]");
    if (valueEl) valueEl.textContent = formatted;
    element.classList.toggle("has-stars", hasStars);
  });
  renderTotalsAndHero();
}

function renderDialogActions(repo) {
  const links = [
    '<a class="button button-primary" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">在 GitHub 查看 ' + icons.external + "</a>",
  ];
  if (repo.homepage) {
    links.push('<a class="button button-secondary" href="' + escapeHtml(repo.homepage) + '" target="_blank" rel="noreferrer">打开在线演示 ' + icons.external + "</a>");
  }
  elements.dialogActions.innerHTML = links.join("");
}

function sanitizeReadmeHtml(rawHtml) {
  const root = document.createElement("div");
  root.innerHTML = String(rawHtml || "");
  const allowedTags = new Set([
    "a", "blockquote", "br", "code", "del", "details", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6",
    "hr", "img", "input", "li", "ol", "p", "pre", "s", "span", "strong", "summary", "sub", "sup",
    "table", "tbody", "td", "th", "thead", "tr", "ul",
  ]);
  const allowedAttributes = new Set(["alt", "checked", "colspan", "disabled", "href", "rowspan", "src", "start", "title", "type"]);

  root.querySelectorAll("*").forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    if (!allowedTags.has(tagName)) {
      while (element.firstChild) element.parentNode.insertBefore(element.firstChild, element);
      element.remove();
      return;
    }
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      const unsafeUrl = (name === "href" || name === "src") && /^(?:javascript|data|vbscript):/i.test(value);
      if (!allowedAttributes.has(name) || name.startsWith("on") || unsafeUrl) element.removeAttribute(attribute.name);
    });
    if (tagName === "a") {
      element.target = "_blank";
      element.rel = "noopener noreferrer nofollow";
    }
    if (tagName === "img") {
      element.loading = "lazy";
      element.decoding = "async";
    }
    if (tagName === "input" && element.getAttribute("type") !== "checkbox") {
      element.remove();
    }
  });
  return root.innerHTML;
}

function readmeSafeUrl(value, repo, image = false) {
  const target = String(value || "").trim();
  if (!target || /^(?:javascript|data|vbscript):/i.test(target)) return "";
  if (target.startsWith("#")) return target;
  const branch = encodeURIComponent(repo.default_branch || "HEAD").replace(/%2F/gi, "/");
  const base = image
    ? "https://raw.githubusercontent.com/" + USERNAME + "/" + encodeURIComponent(repo.name) + "/" + branch + "/"
    : "https://github.com/" + USERNAME + "/" + encodeURIComponent(repo.name) + "/blob/" + branch + "/";
  try {
    const url = new URL(target, base);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch (error) {
    return "";
  }
}

function renderReadmeInline(value, repo) {
  const tokens = [];
  const stash = (html) => "\u0000" + (tokens.push(html) - 1) + "\u0000";
  const rawImagePattern = new RegExp("<img\\b[^>]*\\bsrc=[\"']([^\"']+)[\"'][^>]*>", "gi");
  let text = String(value || "")
    .replace(rawImagePattern, (match, source) => {
      const safeSource = readmeSafeUrl(source, repo, true);
      const alt = match.match(/\balt=["']([^"']*)["']/i)?.[1] || "";
      return safeSource ? stash('<img src="' + escapeHtml(safeSource) + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async">') : "";
    })
    .replace(/<\/?(?:a|div|p|span|br)(?:\s[^>]*)?>/gi, (tag) => (/<br\b/i.test(tag) ? "\n" : ""))
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g, (match, alt, source) => {
      const safeSource = readmeSafeUrl(source, repo, true);
      return safeSource ? stash('<img src="' + escapeHtml(safeSource) + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async">') : escapeHtml(alt);
    })
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) => {
      const safeHref = readmeSafeUrl(href, repo);
      return safeHref ? stash('<a href="' + escapeHtml(safeHref) + '" target="_blank" rel="noopener noreferrer nofollow">' + escapeHtml(label) + "</a>") : escapeHtml(label);
    });
  text = escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  for (let pass = 0; pass < 4 && /\u0000\d+\u0000/.test(text); pass += 1) {
    text = text.replace(/\u0000(\d+)\u0000/g, (match, index) => tokens[Number(index)] ?? "");
  }
  return text;
}

function renderReadmeFallback(raw, repo) {
  const lines = String(raw || "").replace(/\r/g, "").slice(0, 160000).split("\n");
  const output = [];
  let paragraph = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push("<p>" + renderReadmeInline(paragraph.join("\n"), repo).replace(/\n/g, "<br>") + "</p>");
    paragraph = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = line.match(/^\s*(`{3,}|~{3,})\s*([\w+-]*)\s*$/);
    if (fence) {
      flushParagraph();
      const codeLines = [];
      index += 1;
      while (index < lines.length && !new RegExp("^\\s*" + fence[1][0] + "{3,}\\s*$").test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      const language = fence[2] ? ' class="language-' + escapeHtml(fence[2]) + '"' : "";
      output.push("<pre><code" + language + ">" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
      continue;
    }

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      output.push("<h" + level + ">" + renderReadmeInline(heading[2], repo) + "</h" + level + ">");
      continue;
    }

    if (/^\s*((\*\s*){3,}|(-\s*){3,}|(_\s*){3,})$/.test(line)) {
      flushParagraph();
      output.push("<hr>");
      continue;
    }

    if (/^\s*\|.+\|\s*$/.test(line) && index + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[index + 1])) {
      flushParagraph();
      const splitCells = (row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
      const headers = splitCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\s*\|.+\|\s*$/.test(lines[index])) {
        rows.push(splitCells(lines[index]));
        index += 1;
      }
      index -= 1;
      output.push(
        "<table><thead><tr>" +
        headers.map((cell) => "<th>" + renderReadmeInline(cell, repo) + "</th>").join("") +
        "</tr></thead><tbody>" +
        rows.map((row) => "<tr>" + row.map((cell) => "<td>" + renderReadmeInline(cell, repo) + "</td>").join("") + "</tr>").join("") +
        "</tbody></table>"
      );
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flushParagraph();
      const quoteLines = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      index -= 1;
      output.push("<blockquote><p>" + renderReadmeInline(quoteLines.join("\n"), repo).replace(/\n/g, "<br>") + "</p></blockquote>");
      continue;
    }

    const listItem = line.match(/^\s*(?:[-*+]\s+|\d+\.\s+)(.+)$/);
    if (listItem) {
      flushParagraph();
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*(?:[-*+]\s+|\d+\.\s+)(.+)$/);
        if (!item || /^\s*\d+\.\s+/.test(lines[index]) !== ordered) break;
        const taskMatch = item[1].match(/^\[(x|X| )\]\s+(.+)$/);
        if (taskMatch) {
          const checked = taskMatch[1].toLowerCase() === "x" ? " checked" : "";
          items.push('<li><input type="checkbox" disabled' + checked + "> " + renderReadmeInline(taskMatch[2], repo) + "</li>");
        } else {
          items.push("<li>" + renderReadmeInline(item[1], repo) + "</li>");
        }
        index += 1;
      }
      index -= 1;
      output.push("<" + (ordered ? "ol" : "ul") + ">" + items.join("") + "</" + (ordered ? "ol" : "ul") + ">");
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  return output.join("");
}

function enhanceCodeBlocks() {
  elements.readmeContent.querySelectorAll("pre").forEach((pre) => {
    if (pre.parentElement?.classList.contains("readme-pre-wrap")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "readme-pre-wrap";
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "readme-pre-copy";
    copyBtn.textContent = "复制";
    copyBtn.addEventListener("click", () => copyText(pre.textContent || "", "已复制代码块"));
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(copyBtn);
  });
}

function attachReadmeImageFallbacks() {
  elements.readmeContent.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackTried) return;
      const rawMatch = img.src.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);
      const ghRawMatch = img.src.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/);
      const match = rawMatch || ghRawMatch;
      if (!match) return;
      img.dataset.fallbackTried = "1";
      img.src = JSDELIVR_ROOT + "/" + match[1] + "/" + match[2] + "@" + match[3] + "/" + match[4];
    });
  });
}

function renderReadme(html) {
  elements.readmeContent.innerHTML = "";
  const safeHtml = sanitizeReadmeHtml(html);
  if (!safeHtml) {
    elements.readmeContent.innerHTML = "<p>这个项目还没有可读取的 README 内容。</p>";
    return;
  }
  elements.readmeContent.innerHTML = safeHtml;
  attachReadmeImageFallbacks();
  enhanceCodeBlocks();
}

function isValidReadmeText(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/^(?:<!doctype\s+html|<html\b)/i.test(trimmed)) return false;
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        (parsed.error === true ||
          typeof parsed.status === "number" ||
          typeof parsed.statusCode === "number" ||
          (typeof parsed.message === "string" && Object.keys(parsed).length <= 4))
      ) {
        return false;
      }
    } catch (error) {
      // Not a JSON error object; treat as normal Markdown/text.
    }
  }
  return true;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  if (options.signal || typeof AbortController === "undefined") {
    return fetch(url, options);
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

async function loadSnapshotReadmes() {
  if (state.snapshotReadmes) return state.snapshotReadmes;
  if (!state.snapshotReadmesPromise) {
    state.snapshotReadmesPromise = fetchJson(READMES_SNAPSHOT_URL)
      .then((payload) => {
        state.snapshotReadmes = payload?.readmes && typeof payload.readmes === "object" ? payload.readmes : {};
        return state.snapshotReadmes;
      })
      .catch(() => {
        state.snapshotReadmesPromise = null;
        return {};
      });
  }
  return state.snapshotReadmesPromise;
}

async function fetchReadmeFromBaseUrls(urls) {
  let sawError = false;
  let allMissing = urls.length > 0;
  for (const url of urls) {
    try {
      const response = await fetchWithTimeout(url, {}, 5500);
      if (response.ok) {
        const text = await response.text();
        if (isValidReadmeText(text)) {
          return { markdown: text, confirmedMissing: false, hadError: false };
        }
        sawError = true;
        allMissing = false;
      } else if (response.status !== 404) {
        sawError = true;
        allMissing = false;
      }
    } catch (error) {
      sawError = true;
      allMissing = false;
    }
  }
  return { markdown: "", confirmedMissing: allMissing && !sawError, hadError: sawError };
}

async function loadReadme(repo) {
  const cached = state.readmeCache.get(repo.name);
  if (cached) {
    if (cached.missing) {
      elements.readmeContent.innerHTML = "<p>这个项目没有 README 文件，可以直接打开 GitHub 查看仓库文件。</p>";
      elements.readmeState.textContent = "NO README";
      return;
    }
    renderReadme(cached.html);
    elements.readmeState.textContent = cached.stateLabel;
    return;
  }

  elements.readmeState.textContent = "LOADING";
  elements.readmeContent.innerHTML = "<p>正在读取 README.md …</p>";
  try {
    let rawMarkdown = "";
    let sourceOrigin = "LIVE";
    let confirmedMissing = false;
    let hadNetworkError = false;

    if (Date.now() >= state.githubApiBlockedUntil) {
      try {
        const readmeResponse = await fetchWithTimeout(
          API_ROOT + "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name) + "/readme",
          { headers: { Accept: "application/vnd.github.raw+json" } },
          6000
        );
        if (readmeResponse.ok) {
          const text = await readmeResponse.text();
          if (isValidReadmeText(text)) rawMarkdown = text;
          else hadNetworkError = true;
        } else if (readmeResponse.status === 404) {
          confirmedMissing = true;
        } else {
          if (readmeResponse.status === 403 || readmeResponse.status === 429) {
            state.githubApiBlockedUntil = Date.now() + 5 * 60 * 1000;
          }
          hadNetworkError = true;
        }
      } catch (error) {
        hadNetworkError = true;
      }
    } else {
      hadNetworkError = true;
    }

    const encodedRepo = encodeURIComponent(repo.name);
    const branchCandidates = repo.default_branch ? [repo.default_branch] : ["main", "master"];
    const readmeFilenames = ["README.md", "readme.md", "Readme.md", "README.markdown"];

    if (!rawMarkdown && !confirmedMissing) {
      const jsdelivrUrls = [];
      branchCandidates.forEach((branch) => {
        const encodedBranch = encodeURIComponent(branch).replace(/%2F/gi, "/");
        readmeFilenames.forEach((filename) => {
          jsdelivrUrls.push(JSDELIVR_ROOT + "/" + USERNAME + "/" + encodedRepo + "@" + encodedBranch + "/" + filename);
        });
      });
      const cdnResult = await fetchReadmeFromBaseUrls(jsdelivrUrls);
      if (cdnResult.markdown) rawMarkdown = cdnResult.markdown;
      else if (cdnResult.hadError) hadNetworkError = true;
    }

    if (!rawMarkdown && !confirmedMissing) {
      const rawUrls = [];
      branchCandidates.forEach((branch) => {
        const encodedBranch = encodeURIComponent(branch).replace(/%2F/gi, "/");
        readmeFilenames.forEach((filename) => {
          rawUrls.push("https://raw.githubusercontent.com/" + USERNAME + "/" + encodedRepo + "/" + encodedBranch + "/" + filename);
        });
      });
      const rawResult = await fetchReadmeFromBaseUrls(rawUrls);
      if (rawResult.markdown) rawMarkdown = rawResult.markdown;
      else if (rawResult.confirmedMissing && !hadNetworkError) confirmedMissing = true;
      else if (rawResult.hadError) hadNetworkError = true;
    }

    if (!rawMarkdown && !confirmedMissing) {
      try {
        const unghReadme = await fetchJson(UNGH_ROOT + "/repos/" + USERNAME + "/" + encodedRepo + "/readme", {}, 6000);
        if (!unghReadme?.error && isValidReadmeText(unghReadme?.markdown)) {
          rawMarkdown = unghReadme.markdown;
        } else {
          hadNetworkError = true;
        }
      } catch (error) {
        hadNetworkError = true;
      }
    }

    if (!rawMarkdown) {
      const snapshotReadmes = await loadSnapshotReadmes();
      if (Object.prototype.hasOwnProperty.call(snapshotReadmes, repo.name)) {
        const snapshotText = snapshotReadmes[repo.name];
        if (snapshotText === null) {
          confirmedMissing = true;
          hadNetworkError = false;
        } else if (isValidReadmeText(snapshotText)) {
          rawMarkdown = snapshotText;
          sourceOrigin = "SNAPSHOT";
        }
      }
    }

    if (state.detailRepo !== repo) return;

    if (!rawMarkdown) {
      if (confirmedMissing && !hadNetworkError) {
        elements.readmeContent.innerHTML = "<p>这个项目没有 README 文件，可以直接打开 GitHub 查看仓库文件。</p>";
        elements.readmeState.textContent = "NO README";
        state.readmeCache.set(repo.name, { missing: true });
      } else {
        elements.readmeContent.innerHTML = "<p>暂时无法连接 GitHub 读取 README，可直接点击左侧「在 GitHub 查看」按钮浏览文档。</p>";
        elements.readmeState.textContent = "OPEN GITHUB";
      }
      return;
    }

    if (Date.now() >= state.githubApiBlockedUntil) {
      try {
        const markdownResponse = await fetchWithTimeout(
          API_ROOT + "/markdown",
          {
            method: "POST",
            headers: { Accept: "text/html", "Content-Type": "application/json" },
            body: JSON.stringify({ text: rawMarkdown, mode: "gfm", context: USERNAME + "/" + repo.name }),
          },
          4500
        );
        if (state.detailRepo !== repo) return;
        if (markdownResponse.ok) {
          const renderedHtml = await markdownResponse.text();
          if (state.detailRepo !== repo) return;
          const stateLabel = sourceOrigin + " / GFM";
          renderReadme(renderedHtml);
          elements.readmeState.textContent = stateLabel;
          state.readmeCache.set(repo.name, { html: renderedHtml, stateLabel });
          return;
        }
        if (markdownResponse.status === 403 || markdownResponse.status === 429) {
          state.githubApiBlockedUntil = Date.now() + 5 * 60 * 1000;
        }
      } catch (error) {
        // Fallback to local Markdown renderer.
      }
    }

    if (state.detailRepo !== repo) return;
    const localHtml = renderReadmeFallback(rawMarkdown, repo);
    const stateLabel = sourceOrigin + " / LOCAL";
    renderReadme(localHtml);
    elements.readmeState.textContent = stateLabel;
    state.readmeCache.set(repo.name, { html: localHtml, stateLabel });
  } catch (error) {
    if (state.detailRepo !== repo) return;
    elements.readmeContent.innerHTML = "<p>暂时无法读取 README，你可以点击左侧按钮前往 GitHub 查看。</p>";
    elements.readmeState.textContent = "OPEN GITHUB";
  }
}

async function fetchJson(url, options = {}, timeoutMs = 8000) {
  const response = await fetchWithTimeout(url, options, timeoutMs);
  if (!response.ok) {
    const err = new Error("Request failed: " + response.status);
    err.status = response.status;
    throw err;
  }
  return response.json();
}

async function fetchRepoStats(repo) {
  if (Date.now() >= state.githubApiBlockedUntil) {
    try {
      const data = await fetchJson(API_ROOT + "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name), {
        headers: API_HEADERS,
        cache: "no-store",
      });
      return { data, source: "GITHUB" };
    } catch (githubError) {
      if (githubError?.status === 403 || githubError?.status === 429) {
        state.githubApiBlockedUntil = Date.now() + 5 * 60 * 1000;
      }
    }
  }
  try {
    const ungh = await fetchJson(UNGH_ROOT + "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name), {
      cache: "no-store",
    });
    if (!ungh?.repo || ungh?.error) throw new Error("Invalid UNGH repo stats");
    return {
      data: {
        stargazers_count: Number(ungh.repo.stars) || 0,
        forks_count: Number(ungh.repo.forks) || 0,
        pushed_at: ungh.repo.pushedAt || repo.pushed_at,
        updated_at: ungh.repo.updatedAt || repo.updated_at,
        default_branch: ungh.repo.defaultBranch || repo.default_branch,
        description: ungh.repo.description ?? repo.description,
      },
      source: "UNGH",
    };
  } catch (unghError) {
    const badgeUrl = "https://img.shields.io/github/stars/" + USERNAME + "/" + encodeURIComponent(repo.name) + ".json";
    const badge = await fetchJson(badgeUrl, { cache: "no-store" });
    const stargazersCount = parseStarCount(badge.value ?? badge.message);
    if (!Number.isFinite(stargazersCount)) throw unghError;
    return { data: { stargazers_count: stargazersCount }, source: "SHIELDS" };
  }
}

async function refreshRepoStats(repo, silent = false) {
  if (!repo) return;
  if (!silent) {
    elements.refreshStars.classList.add("is-loading");
    elements.dialogStarStatus.textContent = "正在拉取实时 Star…";
  }
  try {
    const { data: freshRepo, source } = await fetchRepoStats(repo);
    Object.assign(repo, freshRepo);
    const storedRepo = state.repos.find((item) => item.name === repo.name);
    if (storedRepo && storedRepo !== repo) Object.assign(storedRepo, freshRepo);
    renderDialogMeta(repo);
    renderStarPanel(repo, "LIVE · " + source + " · " + formatCheckTime());
    updateStarCountBadges(repo);
    saveCache();
  } catch (error) {
    renderStarPanel(repo, "快照缓存 · 暂无法连接实时 API");
    if (!silent) showToast("暂时无法连接实时接口，当前显示的是已同步的 Star 数据。");
  } finally {
    elements.refreshStars.classList.remove("is-loading");
  }
}

function stopStarPolling() {
  if (state.starPolling) window.clearInterval(state.starPolling);
  state.starPolling = null;
}

function startStarPolling(repo) {
  stopStarPolling();
  refreshRepoStats(repo, true);
  state.starPolling = window.setInterval(() => {
    if (!document.hidden && elements.projectDialog.open) refreshRepoStats(repo, true);
  }, 30000);
}

function openProjectDialog(repo) {
  state.detailRepo = repo;
  elements.dialogTitle.textContent = repo.name;
  elements.dialogBranch.textContent = "BRANCH: " + String(repo.default_branch || "main").toUpperCase();
  if (repo.license && repo.license !== "NOASSERTION") {
    elements.dialogLicense.textContent = "LICENSE: " + repo.license;
    elements.dialogLicense.hidden = false;
  } else {
    elements.dialogLicense.hidden = true;
  }
  elements.dialogDescription.textContent = repo.description || "这个仓库还没有公开简介。";
  renderDialogMeta(repo);
  elements.dialogTags.innerHTML = projectTags(repo, 10);
  renderDialogActions(repo);
  renderStarPanel(repo, "正在核验实时 Star…");
  updateDialogBookmarkButton(repo.name);
  elements.dialogCloneCommand.textContent = "git clone " + repo.html_url + ".git";
  elements.projectDialog.showModal();
  elements.projectDialog.scrollTop = 0;
  elements.readmeContent.scrollTop = 0;
  loadReadme(repo);
  startStarPolling(repo);
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  state.toastTimer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 3800);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    showToast("复制失败，请手动复制：" + text);
  }
}

function saveCache() {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        user: state.user,
        repos: state.repos,
        events: state.events,
      })
    );
  } catch (error) {
    // Ignore storage quota errors.
  }
}

function loadCachedSnapshot() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.repos) || !parsed.repos.length) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function mergeReposWithFallback(incomingRepos, baseRepos) {
  const baseByName = new Map(baseRepos.map((repo) => [repo.name, repo]));
  return incomingRepos.map((repo) => {
    const base = baseByName.get(repo.name) || {};
    return {
      ...base,
      name: repo.name,
      description: repo.description ?? base.description ?? "",
      html_url: repo.html_url || base.html_url || "https://github.com/" + USERNAME + "/" + encodeURIComponent(repo.name),
      default_branch: repo.default_branch || repo.defaultBranch || base.default_branch || "main",
      homepage: repo.homepage ?? base.homepage ?? "",
      language: repo.language ?? base.language ?? null,
      stargazers_count: Number(repo.stargazers_count ?? repo.stars ?? base.stargazers_count ?? 0),
      forks_count: Number(repo.forks_count ?? repo.forks ?? base.forks_count ?? 0),
      topics: Array.isArray(repo.topics) && repo.topics.length ? repo.topics : base.topics || [],
      pushed_at: repo.pushed_at || repo.pushedAt || base.pushed_at,
      updated_at: repo.updated_at || repo.updatedAt || base.updated_at,
      fork: Boolean(repo.fork ?? base.fork),
      archived: Boolean(repo.archived ?? base.archived),
      license: typeof repo.license === "string" ? repo.license : repo.license?.spdx_id || base.license || null,
    };
  });
}

async function fetchAllReposFromGitHub() {
  const allRepos = [];
  for (let page = 1; page <= 10; page += 1) {
    const repos = await fetchJson(API_ROOT + "/users/" + USERNAME + "/repos?per_page=100&page=" + page + "&sort=updated", {
      headers: API_HEADERS,
    });
    allRepos.push(...repos);
    if (repos.length < 100) break;
  }
  return allRepos;
}

async function loadBuildSnapshot() {
  try {
    const snapshot = await fetchJson(SNAPSHOT_URL);
    if (snapshot?.user) state.user = { ...state.user, ...snapshot.user };
    if (Array.isArray(snapshot?.repos) && snapshot.repos.length) {
      state.repos = mergeReposWithFallback(snapshot.repos, state.repos);
    }
    if (Array.isArray(snapshot?.events) && snapshot.events.length) {
      state.events = snapshot.events;
    }
    state.sourceLabel = "BUILD SNAPSHOT";
    elements.syncStatus.textContent = "SNAPSHOT";
    elements.lastSync.textContent = snapshot?.generated_at ? formatDate(snapshot.generated_at) : "已加载快照";
    render();
  } catch (error) {
    // Running via file:// or snapshot missing; fallbackRepos already populated.
  }
}

async function syncGitHubData(manual = false) {
  elements.syncNowButton.classList.add("is-syncing");
  elements.syncNowButton.classList.remove("is-fallback");
  elements.syncStatus.textContent = "SYNCING";

  try {
    if (!manual && Date.now() < state.githubApiBlockedUntil) {
      throw new Error("GitHub API cooldown active");
    }
    const [user, repos] = await Promise.all([
      fetchJson(API_ROOT + "/users/" + USERNAME, { headers: API_HEADERS }),
      fetchAllReposFromGitHub(),
    ]);
    state.user = user;
    state.repos = mergeReposWithFallback(repos, state.repos);
    try {
      const events = await fetchJson(API_ROOT + "/users/" + USERNAME + "/events/public?per_page=15", {
        headers: API_HEADERS,
      });
      if (Array.isArray(events) && events.length) state.events = events;
    } catch (eventsError) {
      // Events are optional; keep snapshot events.
    }
    state.sourceLabel = "GITHUB LIVE";
    elements.syncStatus.textContent = "LIVE";
    elements.lastSync.textContent = "刚刚同步";
    saveCache();
    render();
    if (manual) showToast("已同步最新 GitHub 仓库与 Star 数据");
  } catch (githubError) {
    if (githubError?.status === 403 || githubError?.status === 429) {
      state.githubApiBlockedUntil = Date.now() + 5 * 60 * 1000;
    }
    try {
      const [unghUser, unghRepos] = await Promise.all([
        fetchJson(UNGH_ROOT + "/users/" + USERNAME),
        fetchJson(UNGH_ROOT + "/users/" + USERNAME + "/repos"),
      ]);
      if (unghRepos?.error || !Array.isArray(unghRepos?.repos) || !unghRepos.repos.length) {
        throw new Error("Invalid UNGH repos response");
      }
      if (unghUser?.user && !unghUser?.error) {
        state.user = {
          ...state.user,
          name: unghUser.user.name || state.user.name,
          avatar_url: unghUser.user.avatar || state.user.avatar_url,
        };
      }
      state.repos = mergeReposWithFallback(unghRepos.repos, state.repos);
      state.sourceLabel = "UNGH MIRROR";
      elements.syncStatus.textContent = "MIRROR LIVE";
      elements.lastSync.textContent = "镜像同步";
      saveCache();
      render();
      if (manual) showToast("已通过边缘镜像同步最新 Star 与仓库状态");
    } catch (mirrorError) {
      elements.syncNowButton.classList.add("is-fallback");
      elements.syncStatus.textContent = "CACHED";
      if (manual) showToast("实时接口暂不可达，已保留当前快照数据");
    }
  } finally {
    elements.syncNowButton.classList.remove("is-syncing");
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#111315" : "#f6f4ef");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (error) {
    // Ignore storage errors.
  }
}

// Event bindings
bindDelegatedHandlers();
elements.themeToggle.addEventListener("click", toggleTheme);
elements.syncNowButton.addEventListener("click", () => syncGitHubData(true));
elements.jumpStarredButton.addEventListener("click", () => {
  state.sort = "stars";
  state.starredOnly = true;
  elements.projectSort.value = "stars";
  elements.toggleStarredOnly.setAttribute("aria-pressed", "true");
  renderProjects();
  observeReveals();
  document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
});

elements.projectSearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProjects();
  observeReveals();
});

elements.clearSearch.addEventListener("click", () => {
  state.query = "";
  elements.projectSearch.value = "";
  elements.projectSearch.focus();
  renderProjects();
  observeReveals();
});

elements.projectSort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProjects();
  observeReveals();
});

elements.toggleStarredOnly.addEventListener("click", () => {
  state.starredOnly = !state.starredOnly;
  elements.toggleStarredOnly.setAttribute("aria-pressed", String(state.starredOnly));
  renderProjects();
  observeReveals();
});

elements.toggleDemoOnly.addEventListener("click", () => {
  state.demoOnly = !state.demoOnly;
  elements.toggleDemoOnly.setAttribute("aria-pressed", String(state.demoOnly));
  renderProjects();
  observeReveals();
});

elements.toggleSavedOnly.addEventListener("click", () => {
  state.savedOnly = !state.savedOnly;
  elements.toggleSavedOnly.setAttribute("aria-pressed", String(state.savedOnly));
  renderProjects();
  observeReveals();
});

elements.resetFiltersButton.addEventListener("click", resetAllFilters);

elements.timelineModeEvents.addEventListener("click", () => {
  state.timelineMode = "events";
  renderTimeline();
});

elements.timelineModeRepos.addEventListener("click", () => {
  state.timelineMode = "repos";
  renderTimeline();
});

elements.closeDialog.addEventListener("click", () => elements.projectDialog.close());
elements.refreshStars.addEventListener("click", () => refreshRepoStats(state.detailRepo));
elements.dialogBookmarkButton.addEventListener("click", () => {
  if (state.detailRepo) toggleBookmark(state.detailRepo.name);
});
elements.dialogShareButton.addEventListener("click", () => {
  if (!state.detailRepo) return;
  const shareUrl = new URL("?repo=" + encodeURIComponent(state.detailRepo.name), window.location.href).href;
  copyText(shareUrl, "已复制项目直达链接");
});
elements.copyCloneButton.addEventListener("click", () => {
  if (!state.detailRepo) return;
  copyText("git clone " + state.detailRepo.html_url + ".git", "已复制 git clone 命令");
});
elements.starRepoAction.addEventListener("click", () => showToast("已打开 GitHub，回来后会自动刷新实时 Star 数。"));

elements.projectDialog.addEventListener("click", (event) => {
  if (event.target === elements.projectDialog) elements.projectDialog.close();
});

elements.projectDialog.addEventListener("close", () => {
  stopStarPolling();
  state.detailRepo = null;
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && elements.projectDialog.open && state.detailRepo) {
    refreshRepoStats(state.detailRepo, true);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
    event.preventDefault();
    elements.projectSearch.focus();
  }
});

elements.profileAvatar.addEventListener("error", () => {
  elements.profileAvatar.src =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#14191f"/><text x="32" y="40" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#f6f4ef">Z</text></svg>'
    );
});

// Boot sequence
(async function init() {
  const cached = loadCachedSnapshot();
  if (cached) {
    state.user = { ...state.user, ...cached.user };
    state.repos = mergeReposWithFallback(cached.repos, state.repos);
    state.events = Array.isArray(cached.events) ? cached.events : [];
    state.sourceLabel = "LOCAL CACHE";
  }
  render();

  await loadBuildSnapshot();

  const targetRepoName = new URLSearchParams(window.location.search).get("repo");
  if (targetRepoName) {
    const matched = state.repos.find((item) => item.name.toLowerCase() === targetRepoName.toLowerCase());
    if (matched) openProjectDialog(matched);
  }

  await syncGitHubData(false);
})();
