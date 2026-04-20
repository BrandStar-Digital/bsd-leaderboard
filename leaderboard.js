// ============================================================
// BrandStar Digital AI Marketing Engine — Leaderboard
// Application logic and rendering
// ============================================================
// Data is loaded from data.js (window.BSD_TEAM, BSD_BADGES, etc.)
// Phase 2: replace stub globals with fetch('/api/leaderboard')
// ============================================================

(function () {
  'use strict';

  // Wait for data to be available
  if (!window.BSD_TEAM) {
    console.error('BSD Leaderboard: data.js not loaded');
    return;
  }

  const TEAM = window.BSD_TEAM;
  const BADGES = window.BSD_BADGES;
  const AGENTS = window.BSD_AGENTS;
  const CHALLENGES = window.BSD_CHALLENGES;
  const METRICS = window.BSD_TEAM_METRICS;

  // --- Rank calculation ---
  function rankOf(points) {
    if (points >= 5000) return { id: 'architect', name: 'Architect' };
    if (points >= 2000) return { id: 'lead', name: 'Lead' };
    if (points >= 500) return { id: 'practitioner', name: 'Practitioner' };
    return { id: 'operator', name: 'Operator' };
  }

  function nextRankThreshold(points) {
    if (points >= 5000) return null;
    if (points >= 2000) return 5000;
    if (points >= 500) return 2000;
    return 500;
  }

  function nextRankName(points) {
    if (points >= 5000) return null;
    if (points >= 2000) return 'Architect';
    if (points >= 500) return 'Lead';
    return 'Practitioner';
  }

  // --- Deterministic per-member badges based on tier ---
  function badgesFor(member) {
    const tier = member.badgeTier;
    if (tier === 0) return [];
    let seed = 0;
    for (const c of member.name) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
    const counts = [0, 4, 9, 15];
    const count = counts[tier] || 0;
    const pool = BADGES.map(b => b.id);
    const earned = [];
    for (let i = 0; i < count; i++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      const idx = seed % pool.length;
      earned.push(pool.splice(idx, 1)[0]);
    }
    return earned;
  }

  function heatClass(uses) {
    if (uses === 0) return 'cold';
    if (uses <= 3) return 'cool';
    if (uses <= 9) return 'warm';
    return 'hot';
  }

  // ============================================================
  // Render functions
  // ============================================================

  let currentRankFilter = 'all';
  let currentDeptFilter = 'all';

  function renderLeaderboard() {
    const host = document.getElementById('lbTable');
    if (!host) return;
    let filtered = TEAM;
    if (currentRankFilter !== 'all') {
      filtered = filtered.filter(m => rankOf(m.points).id === currentRankFilter);
    }
    if (currentDeptFilter !== 'all') {
      filtered = filtered.filter(m => m.dept === currentDeptFilter);
    }
    const sorted = [...filtered].sort((a, b) => b.points - a.points);
    const header = '<div class="lb-row lb-head">'
      + '<div class="lb-col-rank">#</div>'
      + '<div>Member</div>'
      + '<div>Points</div>'
      + '<div>Rank</div>'
      + '<div class="lb-col-streak">Streak</div>'
      + '</div>';
    const rows = sorted.map((m, i) => {
      const rank = rankOf(m.points);
      const rankClass = i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : '';
      const streakHtml = m.streak > 0
        ? `<div class="lb-streak">${m.streak}🔥</div>`
        : `<div class="lb-streak lb-streak-none">—</div>`;
      return `<div class="lb-row clickable" data-member="${encodeURIComponent(m.name)}">
        <div class="lb-col-rank"><span class="lb-rank ${rankClass}">${i + 1}</span></div>
        <div><div class="lb-name">${m.name}</div><div class="lb-role">${m.role} · ${m.dept}</div></div>
        <div class="lb-points">${m.points.toLocaleString()}</div>
        <div><span class="lb-rank-badge ${rank.id}">${rank.name}</span></div>
        <div class="lb-col-streak">${streakHtml}</div>
      </div>`;
    }).join('');
    host.innerHTML = header + rows;

    // Row click-through to dashboard
    host.querySelectorAll('.lb-row.clickable').forEach(row => {
      row.addEventListener('click', () => {
        const name = decodeURIComponent(row.dataset.member);
        const sel = document.getElementById('dashSelect');
        if (sel) sel.value = name;
        renderDashboard(name);
        const tabMe = document.querySelector('.tab[data-tab="me"]');
        if (tabMe) tabMe.click();
        window.scrollTo({ top: document.querySelector('.tabs-wrap').offsetTop - 10, behavior: 'smooth' });
      });
    });
  }

  function renderDashboard(selected) {
    const host = document.getElementById('dashGrid');
    if (!host) return;
    const m = TEAM.find(t => t.name === selected) || TEAM[0];
    const rank = rankOf(m.points);
    const nextT = nextRankThreshold(m.points);
    const prevT = rank.id === 'operator' ? 0
      : rank.id === 'practitioner' ? 500
      : rank.id === 'lead' ? 2000 : 5000;
    const progress = nextT ? ((m.points - prevT) / (nextT - prevT)) * 100 : 100;
    const nextName = nextRankName(m.points);
    const earnedBadges = badgesFor(m);

    const badgeList = earnedBadges.slice(0, 5).map(id => {
      const b = BADGES.find(x => x.id === id);
      return `<li><strong>${b.name}</strong><span class="ts">Earned</span></li>`;
    }).join('') || '<li>No badges earned yet.</li>';

    const activityList = [
      ['Agent 08 Creative Production', 'Session w/ CCB', '2 hours ago'],
      ['Agent 19 QA Gate', 'Deliverable approved', 'Yesterday'],
      ['Agent 14 Paid Media Optimization', 'Session w/ CCB', 'Yesterday'],
      ['Skill: copywriting', 'Activated', '2 days ago'],
      ['Agent 03 Client Brand Brief', 'CCB generated', '3 days ago']
    ].map(([a, b, c]) => `<li><strong>${a}</strong><span>${b}</span><span class="ts">${c}</span></li>`).join('');

    host.innerHTML = `
      <div class="dash-card rank">
        <div class="dash-eyebrow">Current Rank</div>
        <div class="dash-big">${rank.name}</div>
        <div class="dash-sub">${m.points.toLocaleString()} points earned</div>
        ${nextT ? `
          <div class="progress"><div class="progress-fill" style="width:${Math.min(100, progress)}%"></div></div>
          <div class="progress-meta"><span>${m.points.toLocaleString()} pts</span><span>${(nextT - m.points).toLocaleString()} to ${nextName}</span></div>
        ` : `<div class="dash-sub" style="color:var(--bs-green)">Top rank achieved.</div>`}
      </div>
      <div class="dash-card streak">
        <div class="dash-eyebrow">Current Streak</div>
        <div class="dash-big" style="color:${m.streak > 0 ? 'var(--bs-yellow)' : 'var(--bs-gray-500)'}">${m.streak}</div>
        <div class="dash-sub">${m.streak > 0 ? 'consecutive days — keep it going' : 'no active streak'}</div>
      </div>
      <div class="dash-card badges-c">
        <div class="dash-eyebrow">Badges Earned</div>
        <div class="dash-big">${earnedBadges.length}<span style="font-size:28px;color:var(--bs-gray-500);font-weight:700">/20</span></div>
        <div class="dash-sub">Credentials unlocked</div>
        <ul class="dash-list">${badgeList}</ul>
      </div>
      <div class="dash-card activity">
        <div class="dash-eyebrow">Recent Activity</div>
        <ul class="dash-list" style="margin-top:0">${activityList}</ul>
      </div>
    `;
  }

  function renderBadges(selected) {
    const host = document.getElementById('badgesGrid');
    if (!host) return;
    const m = TEAM.find(t => t.name === selected) || TEAM[0];
    const earned = new Set(badgesFor(m));
    host.innerHTML = BADGES.map(b => {
      const isEarned = earned.has(b.id);
      return `<div class="badge ${isEarned ? 'earned' : ''}">
        <span class="badge-category ${b.cat}">${b.cat}</span>
        <div class="badge-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-req">${b.req}</div>
      </div>`;
    }).join('');
  }

  function renderChallenges() {
    const host = document.getElementById('chGrid');
    if (!host) return;
    host.innerHTML = CHALLENGES.map(c => `
      <div class="ch-card ${c.c}">
        <div class="ch-period">${c.p}</div>
        <div class="ch-title">${c.t}</div>
        <div class="ch-desc">${c.d}</div>
        <div class="ch-meta"><span class="label">Reward</span><span class="ch-reward">${c.r}</span></div>
      </div>
    `).join('');
  }

  function renderRewards() {
    const host = document.getElementById('rewardsGrid');
    if (!host) return;
    const cards = [
      {
        cls: 'monthly',
        eyebrow: 'Phase 2 · Monthly',
        title: 'Monthly Badge Rewards',
        desc: 'Specific high-value badges trigger automatic gift card rewards when earned. Milestones like reaching Architect rank, completing a 30-Day Engine Streak, or contributing to the Prompt Library unlock recognition that carries real weight.'
      },
      {
        cls: 'quarterly',
        eyebrow: 'Phase 2 · Quarterly',
        title: 'Quarterly Champions',
        desc: 'Four category champions recognized each quarter — Engine Architect, Mentor, Prompt Innovator, and QA Gold Standard. Named publicly in the quarterly team meeting, with the recognition to match.'
      },
      {
        cls: 'team',
        eyebrow: 'Phase 2 · Collective',
        title: 'Team Pool Rewards',
        desc: 'When the team hits collective milestones — full CCB discipline streaks, high QA compliance, all 24 agents active in a month — the entire team shares the recognition. Team lunches, half-day Fridays, shared wins.'
      }
    ];
    host.innerHTML = cards.map(c => `
      <div class="reward-card ${c.cls}">
        <div class="reward-eyebrow">${c.eyebrow}</div>
        <div class="reward-title">${c.title}</div>
        <div class="reward-desc">${c.desc}</div>
        <div class="reward-status">Launching with Phase 2 · Pending leadership approval</div>
      </div>
    `).join('');
  }

  function renderAdoption() {
    const host = document.getElementById('taStats');
    if (!host) return;
    const active = TEAM.filter(m => m.streak > 0).length;
    const architects = TEAM.filter(m => rankOf(m.points).id === 'architect').length;
    const leads = TEAM.filter(m => rankOf(m.points).id === 'lead').length;
    host.innerHTML = `
      <div class="ta-stat green"><div class="ta-val">${TEAM.length}</div><div class="ta-label">Team Members</div></div>
      <div class="ta-stat blue"><div class="ta-val">${active}</div><div class="ta-label">Active Streaks</div></div>
      <div class="ta-stat purple"><div class="ta-val">${architects + leads}</div><div class="ta-label">Lead or Architect</div></div>
      <div class="ta-stat yellow"><div class="ta-val">${METRICS.qaCompliancePct}%</div><div class="ta-label">QA Compliance</div></div>
    `;
    const weeks = METRICS.weeklyTrend;
    const max = Math.max(...weeks);
    const chart = document.getElementById('trendChart');
    const labels = document.getElementById('trendLabels');
    if (chart) chart.innerHTML = weeks.map(w => `<div class="trend-bar" style="height:${(w / max) * 100}%" title="${w} sessions"></div>`).join('');
    if (labels) labels.innerHTML = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'].map(l => `<div class="trend-label">${l}</div>`).join('');
  }

  function renderHeatMap() {
    const host = document.getElementById('hmGrid');
    if (!host) return;
    host.innerHTML = AGENTS.map(a => `
      <div class="hm-cell ${heatClass(a.uses)}">
        <div class="hm-code">Agent ${a.c}</div>
        <div class="hm-name">${a.n}</div>
        <div class="hm-meta"><span>Sessions (30d)</span><strong>${a.uses}</strong></div>
      </div>
    `).join('');
  }

  function renderStreaks() {
    const bigHost = document.getElementById('streakBig');
    const listHost = document.getElementById('streakList');
    if (bigHost) bigHost.textContent = METRICS.teamStreakDays;
    if (!listHost) return;
    const streakers = TEAM.filter(m => m.streak > 0).sort((a, b) => b.streak - a.streak);
    const header = '<div class="streak-row head">'
      + '<div>#</div><div>Member</div><div>Streak</div><div class="streak-col-since">Since</div>'
      + '</div>';
    const today = new Date();
    const rows = streakers.map((m, i) => {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - m.streak);
      const since = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `<div class="streak-row">
        <div><span class="streak-rank-num">${i + 1}</span></div>
        <div><div class="lb-name">${m.name}</div><div class="lb-role">${m.role}</div></div>
        <div><span class="streak-days">${m.streak}</span> <span class="streak-days-label">days</span></div>
        <div class="streak-col-since streak-since">${since}</div>
      </div>`;
    }).join('');
    listHost.innerHTML = header + rows;
  }

  // ============================================================
  // Init
  // ============================================================

  function populateSelectors() {
    const opts = TEAM.map(m => `<option value="${m.name}">${m.name} · ${m.role}</option>`).join('');
    const dashSelect = document.getElementById('dashSelect');
    const bdSelect = document.getElementById('bdSelect');
    if (dashSelect) {
      dashSelect.innerHTML = opts;
      dashSelect.addEventListener('change', e => renderDashboard(e.target.value));
    }
    if (bdSelect) {
      bdSelect.innerHTML = opts;
      bdSelect.addEventListener('change', e => renderBadges(e.target.value));
    }
  }

  function populateDepartmentFilter() {
    const host = document.getElementById('lbDeptFilters');
    if (!host) return;
    const depts = Array.from(new Set(TEAM.map(m => m.dept))).sort();
    const buttons = [
      '<span class="lb-filter-group-label">Dept:</span>',
      '<button class="lb-filter on" data-dept="all">All</button>',
      ...depts.map(d => `<button class="lb-filter" data-dept="${d}">${d}</button>`)
    ].join('');
    host.innerHTML = buttons;
    host.querySelectorAll('.lb-filter').forEach(b => {
      b.addEventListener('click', () => {
        host.querySelectorAll('.lb-filter').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        currentDeptFilter = b.dataset.dept;
        renderLeaderboard();
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
        document.querySelectorAll('.pane').forEach(x => x.classList.remove('on'));
        t.classList.add('on');
        const pane = document.getElementById('pane-' + t.dataset.tab);
        if (pane) {
          pane.classList.add('on');
          pane.classList.add('fade-in');
          setTimeout(() => pane.classList.remove('fade-in'), 600);
        }
      });
    });
  }

  function initRankFilter() {
    document.querySelectorAll('.lb-filter[data-rank]').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.lb-filter[data-rank]').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        currentRankFilter = b.dataset.rank;
        renderLeaderboard();
      });
    });
  }

  // Run on DOMContentLoaded
  function init() {
    populateSelectors();
    populateDepartmentFilter();
    initTabs();
    initRankFilter();
    renderLeaderboard();
    renderDashboard(TEAM[0].name);
    renderBadges(TEAM[0].name);
    renderChallenges();
    renderRewards();
    renderAdoption();
    renderHeatMap();
    renderStreaks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
