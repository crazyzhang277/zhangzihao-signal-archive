const USERNAME = "crazyzhang277";
const API_ROOT = "https://api.github.com";
const API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

const icons = {
  arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>',
  external: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>',
  star: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>',
};

const fallbackUser = {
  login: USERNAME,
  name: "crazyzhang",
  avatar_url: "https://avatars.githubusercontent.com/u/238443114?v=4",
  public_repos: 6,
  followers: 0,
  following: 2,
};

const fallbackRepos = [
  {
    name: "codex-antigravity-bridge",
    description: "Let Codex supervise Google Antigravity agents through MCP with scoped tasks, plan-driven workflows, and parallel Git worktrees.",
    html_url: "https://github.com/crazyzhang277/codex-antigravity-bridge",
    default_branch: "main",
    homepage: "",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["agy", "ai-agent", "antigravity", "codex", "coding-agent", "developer-tools", "git-worktree", "mcp", "multi-agent", "python"],
    pushed_at: "2026-08-07T18:29:21Z",
    updated_at: "2026-08-07T18:29:41Z",
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
    pushed_at: "2026-08-07T16:24:49Z",
    updated_at: "2026-08-07T16:25:09Z",
    fork: false,
    archived: false,
  },
  {
    name: "zhangzihao-resume",
    description: "Personal resume website",
    html_url: "https://github.com/crazyzhang277/zhangzihao-resume",
    default_branch: "gh-pages",
    homepage: "",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: "2026-07-28T09:06:14Z",
    updated_at: "2026-07-28T08:55:19Z",
    fork: false,
    archived: false,
  },
  {
    name: "zeroaigen-auto-mention",
    description: "零一 AIGC AI 视频提示词 @主体标签 一键自动关联油猴扩展脚本",
    html_url: "https://github.com/crazyzhang277/zeroaigen-auto-mention",
    default_branch: "master",
    homepage: "https://aigc.zeroaigen.cn",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai-video", "aigc", "prompt-engineering", "tampermonkey", "userscript", "zeroaigen"],
    pushed_at: "2026-07-27T09:13:16Z",
    updated_at: "2026-07-27T13:50:29Z",
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
  Python: "#a63f37",
  TypeScript: "#2d5eae",
  JavaScript: "#b17a00",
  HTML: "#006b6e",
  CSS: "#6a4db5",
  default: "#607286",
};

const state = {
  user: fallbackUser,
  repos: fallbackRepos,
  filter: "All",
  query: "",
  detailRepo: null,
  starPolling: null,
  toastTimer: null,
};

const elements = {
  syncStatus: document.querySelector("#syncStatus"),
  lastSync: document.querySelector("#lastSync"),
  profileAvatar: document.querySelector("#profileAvatar"),
  repoCount: document.querySelector("#repoCount"),
  languageCount: document.querySelector("#languageCount"),
  topicCount: document.querySelector("#topicCount"),
  latestUpdate: document.querySelector("#latestUpdate"),
  featuredGrid: document.querySelector("#featuredGrid"),
  filterList: document.querySelector("#filterList"),
  projectSearch: document.querySelector("#projectSearch"),
  projectGrid: document.querySelector("#projectGrid"),
  emptyState: document.querySelector("#emptyState"),
  timeline: document.querySelector("#timeline"),
  currentYear: document.querySelector("#currentYear"),
  projectDialog: document.querySelector("#projectDialog"),
  closeDialog: document.querySelector("#closeDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogMeta: document.querySelector("#dialogMeta"),
  dialogTags: document.querySelector("#dialogTags"),
  dialogActions: document.querySelector("#dialogActions"),
  dialogStarCount: document.querySelector("#dialogStarCount"),
  dialogStarStatus: document.querySelector("#dialogStarStatus"),
  refreshStars: document.querySelector("#refreshStars"),
  starRepoAction: document.querySelector("#starRepoAction"),
  readmeContent: document.querySelector("#readmeContent"),
  readmeState: document.querySelector("#readmeState"),
  toast: document.querySelector("#toast"),
};

document.documentElement.classList.add("js-ready");

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
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "short" }).format(date);
}

function formatYear(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);
}

function formatCheckTime() {
  return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function getLanguageColor(language) {
  return languageColors[language] || languageColors.default;
}

function getLanguages(repos) {
  return [...new Set(repos.map((repo) => repo.language).filter(Boolean))].sort();
}

function getTopics(repos) {
  return new Set(repos.flatMap((repo) => repo.topics || [])).size;
}

function sortByRecent(repos) {
  return [...repos].sort((first, second) => {
    const firstTime = new Date(first.pushed_at || first.updated_at || 0).getTime();
    const secondTime = new Date(second.pushed_at || second.updated_at || 0).getTime();
    return secondTime - firstTime;
  });
}

function getFeaturedRepos() {
  return sortByRecent(state.repos)
    .map((repo) => ({
      repo,
      score: (repo.homepage ? 4 : 0) + (repo.description ? 2 : 0) + Math.min((repo.topics || []).length, 4) + (repo.archived ? -3 : 0),
    }))
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map((entry) => entry.repo);
}

function projectTitle(name) {
  return String(name || "").replace(/[-_]+/g, " ");
}

function projectTags(repo) {
  const tags = [repo.language, ...(repo.topics || [])].filter(Boolean);
  if (!tags.length) return '<span class="project-tag">PROJECT</span>';
  return tags.slice(0, 4).map((tag) => '<span class="project-tag">' + escapeHtml(tag) + "</span>").join("");
}

function projectCard(repo, index, featured) {
  const language = repo.language || "Project";
  const cardClass = featured ? "featured-card" : "project-card";
  const description = repo.description || "这个仓库还没有公开简介，打开项目查看最新内容。";
  const title = projectTitle(repo.name);
  const detailLabel = (featured ? "打开精选项目详情：" : "打开项目详情：") + title;
  const starBadge = '<span class="project-signal" data-star-count="' + escapeHtml(repo.name) + '"><span class="star-glyph" aria-hidden="true">' + icons.star + '</span> ' + formatNumber(repo.stargazers_count) + "</span>";
  return '<article class="' + cardClass + '" data-reveal style="--delay:' + Math.min(index * 70, 210) + 'ms">' +
    '<button class="card-hit-area" type="button" data-repo="' + escapeHtml(repo.name) + '" aria-label="' + escapeHtml(detailLabel) + '"></button>' +
    '<div class="project-card-body">' +
    '<div class="project-card-top"><span class="project-index">' + String(index + 1).padStart(2, "0") + '</span><span class="language-label"><span class="language-dot" style="background:' + getLanguageColor(repo.language) + '"></span>' + escapeHtml(language) + "</span></div>" +
    "<h3>" + escapeHtml(title) + "</h3>" +
    "<p" + (featured ? "" : ' class="project-description"') + ">" + escapeHtml(description) + "</p>" +
    (featured ? "" : '<div class="project-tags">' + projectTags(repo) + "</div>") +
    '<div class="project-footer"><span>' + escapeHtml(formatDate(repo.pushed_at || repo.updated_at)) + starBadge + '</span><div class="project-footer-links"><button class="card-detail" type="button" data-repo="' + escapeHtml(repo.name) + '">详情 ' + icons.arrow + '</button><a class="project-link" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">GitHub ' + icons.external + '</a></div></div>' +
    "</div>" +
    "</article>";
}

function renderStats() {
  elements.repoCount.textContent = state.repos.length;
  elements.languageCount.textContent = getLanguages(state.repos).length;
  elements.topicCount.textContent = getTopics(state.repos);
  elements.latestUpdate.textContent = formatYear(sortByRecent(state.repos)[0]?.pushed_at);
  elements.profileAvatar.src = state.user.avatar_url || fallbackUser.avatar_url;
}

function renderFilters() {
  const filters = ["All", ...getLanguages(state.repos)];
  elements.filterList.innerHTML = filters.map((filter) =>
    '<button class="filter-button' + (state.filter === filter ? " is-active" : "") + '" type="button" data-filter="' + escapeHtml(filter) + '">' + escapeHtml(filter) + "</button>"
  ).join("");
}

function renderFeatured() {
  elements.featuredGrid.innerHTML = getFeaturedRepos().map((repo, index) => projectCard(repo, index, true)).join("");
}

function getVisibleRepos() {
  const query = state.query.trim().toLowerCase();
  return sortByRecent(state.repos).filter((repo) => {
    const matchesFilter = state.filter === "All" || repo.language === state.filter;
    const searchable = [repo.name, repo.description, repo.language, ...(repo.topics || [])].filter(Boolean).join(" ").toLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
}

function renderProjects() {
  const repos = getVisibleRepos();
  elements.projectGrid.innerHTML = repos.map((repo, index) => projectCard(repo, index, false)).join("");
  elements.emptyState.hidden = repos.length > 0;
}

function renderTimeline() {
  elements.timeline.innerHTML = sortByRecent(state.repos).map((repo, index) =>
    '<div class="timeline-item" data-reveal style="--delay:' + Math.min(index * 60, 240) + 'ms"><span class="timeline-date">' + escapeHtml(formatDate(repo.pushed_at || repo.updated_at)) + '</span><div class="timeline-main"><h3>' + escapeHtml(projectTitle(repo.name)) + '</h3><p>' + escapeHtml(repo.description || "暂无公开简介") + '</p></div><a class="timeline-link" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">查看仓库 ' + icons.arrow + '</a></div>'
  ).join("");
}

function observeReveals() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = entry.target.style.getPropertyValue("--delay") || "0ms";
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  revealElements.forEach((element) => observer.observe(element));
}

function bindFilterButtons() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      renderFilters();
      renderProjects();
      bindFilterButtons();
      bindDetailButtons();
      observeReveals();
    });
  });
}

function bindDetailButtons() {
  document.querySelectorAll("[data-repo]").forEach((button) => {
    button.addEventListener("click", () => {
      const repo = state.repos.find((item) => item.name === button.dataset.repo);
      if (repo) openProjectDialog(repo);
    });
  });
}

function render() {
  renderStats();
  renderFilters();
  renderFeatured();
  renderProjects();
  renderTimeline();
  elements.currentYear.textContent = new Date().getFullYear();
  bindFilterButtons();
  bindDetailButtons();
  observeReveals();
}

function renderDialogMeta(repo) {
  const items = [
    repo.language || "Mixed",
    "Updated " + formatDate(repo.pushed_at || repo.updated_at),
    formatNumber(repo.stargazers_count) + " stars",
    formatNumber(repo.forks_count) + " forks",
  ];
  elements.dialogMeta.innerHTML = items.map((item) => "<span>" + escapeHtml(item) + "</span>").join("");
}

function renderStarPanel(repo, status) {
  elements.dialogStarCount.textContent = formatNumber(repo.stargazers_count);
  elements.dialogStarStatus.textContent = status;
  elements.starRepoAction.href = repo.html_url;
}

function updateStarCountBadges(repo) {
  document.querySelectorAll('[data-star-count="' + CSS.escape(repo.name) + '"]').forEach((element) => {
    element.lastChild.textContent = " " + formatNumber(repo.stargazers_count);
  });
}

function renderDialogActions(repo) {
  const links = ['<a class="button button-primary" href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noreferrer">查看 GitHub ' + icons.external + '</a>'];
  if (repo.homepage) {
    links.push('<a class="button button-secondary" href="' + escapeHtml(repo.homepage) + '" target="_blank" rel="noreferrer">打开演示 ' + icons.external + '</a>');
  }
  elements.dialogActions.innerHTML = links.join("");
}

function sanitizeReadmeHtml(rawHtml) {
  const root = document.createElement("div");
  root.innerHTML = String(rawHtml || "");
  const allowedTags = new Set([
    "a", "blockquote", "br", "code", "del", "details", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6",
    "hr", "img", "li", "ol", "p", "pre", "s", "span", "strong", "summary", "sub", "sup", "table", "tbody", "td",
    "th", "thead", "tr", "ul",
  ]);
  const allowedAttributes = new Set(["alt", "colspan", "href", "rowspan", "src", "start", "title"]);

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
  const rawImagePattern = new RegExp("<" + "img\\b[^>]*\\bsrc=[\\\"']([^\\\"']+)[\\\"'][^>]*>", "gi");
  let text = String(value || "")
    .replace(rawImagePattern, (match, source) => {
      const safeSource = readmeSafeUrl(source, repo, true);
      const alt = match.match(/\balt=["']([^"']*)["']/i)?.[1] || "";
      return safeSource ? stash('<img src="' + escapeHtml(safeSource) + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async">') : "";
    })
    .replace(/<\/?(?:a|div|p|span|br)(?:\s[^>]*)?>/gi, (tag) => /<br\b/i.test(tag) ? "\n" : "")
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
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
  return text.replace(/\u0000(\d+)\u0000/g, (match, index) => tokens[Number(index)]);
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
        items.push("<li>" + renderReadmeInline(item[1], repo) + "</li>");
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

function renderReadme(html) {
  elements.readmeContent.innerHTML = "";
  const safeHtml = sanitizeReadmeHtml(html);
  if (!safeHtml) {
    elements.readmeContent.innerHTML = "<p>这个项目还没有可读取的 README 内容。</p>";
    return;
  }
  elements.readmeContent.innerHTML = safeHtml;
}

async function loadReadme(repo) {
  elements.readmeState.textContent = "LOADING";
  elements.readmeContent.innerHTML = "<p>正在读取 README.md …</p>";
  try {
    let rawMarkdown = "";
    try {
      const readmeResponse = await fetch(API_ROOT + "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name) + "/readme", {
        headers: { ...API_HEADERS, Accept: "application/vnd.github.raw+json" },
      });
      if (readmeResponse.ok) rawMarkdown = await readmeResponse.text();
    } catch (error) {
      // Continue with raw.githubusercontent.com when the API is unavailable or rate-limited.
    }

    if (!rawMarkdown.trim()) {
      const branch = encodeURIComponent(repo.default_branch || "HEAD").replace(/%2F/gi, "/");
      for (const filename of ["README.md", "readme.md", "Readme.md", "README.markdown", "readme.markdown"]) {
        try {
          const rawResponse = await fetch("https://raw.githubusercontent.com/" + USERNAME + "/" + encodeURIComponent(repo.name) + "/" + branch + "/" + filename);
          if (rawResponse.ok) {
            rawMarkdown = await rawResponse.text();
            if (rawMarkdown.trim()) break;
          }
        } catch (error) {
          // Try the next README filename when a raw host request fails.
        }
      }
    }
    if (!rawMarkdown.trim()) {
      elements.readmeContent.innerHTML = "<p>这个项目没有 README 文件，可直接打开 GitHub 查看项目内容。</p>";
      elements.readmeState.textContent = "NO README";
      return;
    }

    try {
      const markdownResponse = await fetch(API_ROOT + "/markdown", {
        method: "POST",
        headers: { ...API_HEADERS, Accept: "text/html", "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawMarkdown, mode: "gfm", context: USERNAME + "/" + repo.name }),
      });
      if (markdownResponse.ok) {
        renderReadme(await markdownResponse.text());
        elements.readmeState.textContent = "LIVE / GFM";
        return;
      }
    } catch (error) {
      // Fall back to the local renderer when GitHub Markdown is rate-limited or unavailable.
    }
    renderReadme(renderReadmeFallback(rawMarkdown, repo));
    elements.readmeState.textContent = "LIVE / LOCAL";
  } catch (error) {
    elements.readmeContent.innerHTML = "<p>暂时无法读取 README，但你可以直接打开 GitHub 查看完整项目内容。</p>";
    elements.readmeState.textContent = "OPEN GITHUB";
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) throw new Error("GitHub request failed: " + response.status);
  return response.json();
}

async function refreshRepoStats(repo, silent = false) {
  if (!repo) return;
  if (!silent) {
    elements.refreshStars.classList.add("is-loading");
    elements.dialogStarStatus.textContent = "SYNCING";
  }
  try {
    const freshRepo = await fetchJson(API_ROOT + "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name));
    Object.assign(repo, {
      stargazers_count: freshRepo.stargazers_count,
      forks_count: freshRepo.forks_count,
      updated_at: freshRepo.updated_at,
      pushed_at: freshRepo.pushed_at,
    });
    const storedRepo = state.repos.find((item) => item.name === repo.name);
    if (storedRepo && storedRepo !== repo) Object.assign(storedRepo, repo);
    renderDialogMeta(repo);
    renderStarPanel(repo, "LIVE · CHECKED " + formatCheckTime());
    updateStarCountBadges(repo);
  } catch (error) {
    if (!silent) {
      renderStarPanel(repo, "OFFLINE · SNAPSHOT");
      showToast("暂时无法连接 GitHub，当前显示的是缓存数据。");
    }
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
  refreshRepoStats(repo);
  state.starPolling = window.setInterval(() => {
    if (!document.hidden && elements.projectDialog.open) refreshRepoStats(repo, true);
  }, 30000);
}

function openProjectDialog(repo) {
  state.detailRepo = repo;
  elements.dialogTitle.textContent = projectTitle(repo.name);
  elements.dialogDescription.textContent = repo.description || "这个仓库还没有公开简介。";
  renderDialogMeta(repo);
  elements.dialogTags.innerHTML = projectTags(repo);
  renderDialogActions(repo);
  renderStarPanel(repo, "SYNCING · GITHUB");
  elements.projectDialog.showModal();
  loadReadme(repo);
  startStarPolling(repo);
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  state.toastTimer = window.setTimeout(() => { elements.toast.hidden = true; }, 4200);
}

async function fetchAllRepos() {
  const allRepos = [];
  for (let page = 1; page <= 10; page += 1) {
    const repos = await fetchJson(API_ROOT + "/users/" + USERNAME + "/repos?per_page=100&page=" + page + "&sort=updated");
    allRepos.push(...repos);
    if (repos.length < 100) break;
  }
  return allRepos;
}

async function loadGitHubData() {
  try {
    const [user, repos] = await Promise.all([fetchJson(API_ROOT + "/users/" + USERNAME), fetchAllRepos()]);
    state.user = user;
    state.repos = repos;
    elements.syncStatus.textContent = "LIVE FROM GITHUB";
    elements.lastSync.textContent = "JUST NOW";
  } catch (error) {
    elements.syncStatus.textContent = "SNAPSHOT MODE";
    elements.lastSync.textContent = "LOCAL FALLBACK";
  }
  render();
}

elements.projectSearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProjects();
  bindDetailButtons();
  observeReveals();
});
elements.closeDialog.addEventListener("click", () => elements.projectDialog.close());
elements.refreshStars.addEventListener("click", () => refreshRepoStats(state.detailRepo));
elements.starRepoAction.addEventListener("click", () => showToast("已打开 GitHub，回来后会自动刷新 Star 数量。"));
elements.projectDialog.addEventListener("click", (event) => {
  if (event.target === elements.projectDialog) elements.projectDialog.close();
});
elements.projectDialog.addEventListener("close", () => {
  stopStarPolling();
  state.detailRepo = null;
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && elements.projectDialog.open && state.detailRepo) refreshRepoStats(state.detailRepo, true);
});

render();
loadGitHubData();
