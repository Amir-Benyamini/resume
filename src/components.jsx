// Resume components for Amir Benyamini, DevOps Engineer
// Terminal/HUD aesthetic. All components depend on tweaks via props.

const { useState, useEffect, useRef, useMemo } = React;

// ─── DATA ───────────────────────────────────────────────────────────
const RESUME = {
  name: "Amir Benyamini",
  role: "DevOps Engineer",
  location: "Rehovot, IL",
  email: "benyamini.amir@gmail.com",
  phone: "050-554-5521",
  linkedin: "amir-bini-benyamini",
  github: "Amir-Benyamini",
  tagline: "Platform Engineering · Self-Service IaC · CI/CD at Scale · AI-Augmented DevOps",
  summary: "DevOps engineer who treats infrastructure as a product. I build self-service platforms that turn cloud and CI/CD complexity into one-line, reusable building blocks dev teams can ship with on their own. Currently driving the org-wide CI/CD and IaC strategy at Phoenix Financial, augmenting day-to-day work with GitHub Copilot, Claude Code, and custom agent skills / MCP servers.",
  experience: [
    {
      id: "phoenix",
      title: "DevOps Engineer",
      company: "Phoenix Financial",
      period: "Jan 2025 - Present",
      status: "ACTIVE",
      summary: "Driving the org-wide CI/CD and Infrastructure-as-Code platform at one of Israel's largest insurance enterprises. The platform is a self-service catalog of reusable, opinionated components: dev teams compose blueprints to ship to production without DevOps becoming a ticket queue.",
      bullets: [
        { lead: "Reusable GitHub Actions workflow library.", body: "Standardizes build, test, security scanning, image publishing, and deploy across every tech stack. Eliminates per-team pipeline duplication and config drift." },
        { lead: "AWS CDK blueprint library.", body: "Composable constructs for Lambda, API Gateway, EKS, ECS, Aurora/RDS, SQS/SNS, EventBridge, Step Functions, AWS Batch, S3, Route 53, CloudFront, Secrets Manager, and IAM. Teams import a construct and get a hardened deployment with logging, alerting, and least-privilege baked in." },
        { lead: "Custom Python tooling and CDK constructs.", body: "Glue AWS services together, automate operational flows, and enforce org-wide guardrails (tagging, cost controls, security baselines)." },
        { lead: "On-prem legacy stack alongside the cloud platform.", body: "Self-hosted Kubernetes, Jenkins pipelines, and ArgoCD GitOps deploys. Bridges legacy systems into the new self-service AWS platform." },
        { lead: "DevOps knowledge center + RAG-backed MCP server.", body: "Architecture docs, blueprints, and runbooks queryable from Cursor, Claude Code, or Copilot. Other teams' developers get answers from their agent instead of pinging DevOps." },
        { lead: "AI-augmented DevOps, end to end.", body: "Power-user of GitHub Copilot and Claude Code; authored agent skills, prompts, and MCP integrations that compress repetitive work (pipeline scaffolding, IaC reviews, doc lookups, on-call triage) from hours to minutes." }
      ],
      stack: ["AWS CDK", "GitHub Actions", "Python", "Lambda", "API Gateway", "EKS", "ECS", "Aurora", "SQS/SNS", "EventBridge", "Step Functions", "AWS Batch", "Route 53", "CloudFront", "S3", "IAM", "Kubernetes", "Jenkins", "ArgoCD", "Claude Code", "Copilot", "MCP"]
    },
    {
      id: "civrobotics",
      title: "DevOps Engineer",
      company: "Develeap @ Civ Robotics",
      period: "2022 - 2024",
      status: "COMPLETED",
      summary: "Built the DevOps function from scratch at a robotics startup. Software delivery, embedded deployment, and IoT integration from the ground up.",
      bullets: [
        "Built the company's first CI/CD pipelines with GitHub Actions, Bash, Docker, AWS, and JFrog Artifactory. Automated, repeatable delivery for both cloud services and embedded targets.",
        "Simplified embedded deployment by cross-compiling and packaging applications as Debian packages inside Docker, turning brittle manual installs into a one-command flow.",
        "Decomposed a monolithic repository into domain-focused repos, improving modularity, ownership, and parallel team workflow.",
        "Integrated robots as AWS-managed IoT devices for remote logging, real-time telemetry, secure tunneling, and OTA-style deployment."
      ],
      stack: ["AWS", "GitHub Actions", "Docker", "Bash", "JFrog", "AWS IoT", "Debian"]
    },
  ],
  education: [
    {
      id: "develeap",
      title: "DevOps Engineer Bootcamp",
      school: "Develeap",
      period: "2022",
      summary: "Competitive-entry, 800-hour bootcamp covering the full cloud-native stack: Docker, Kubernetes, AWS, Terraform, Jenkins/GitLab/GitHub Actions, Artifactory, networking, certificates, and release lifecycle."
    },
    {
      id: "elevation",
      title: "Full-Stack Web Development",
      school: "Elevation Academy",
      period: "2020",
      summary: "520-hour MERN bootcamp. End-to-end projects with clean architecture, external API integrations, and hackathon-driven collaboration."
    }
  ],
  skills: {
    "Cloud (AWS)": [
      { name: "AWS (broad)", level: 0.9 },
      { name: "Lambda / API GW", level: 0.85 },
      { name: "EKS / ECS", level: 0.8 },
      { name: "SQS / SNS / EventBridge", level: 0.85 },
      { name: "Step Functions / Batch", level: 0.75 },
      { name: "Aurora / RDS", level: 0.75 },
      { name: "Route 53 / CloudFront", level: 0.8 },
      { name: "IAM / Secrets Manager", level: 0.85 }
    ],
    "Platform & IaC": [
      { name: "AWS CDK", level: 0.9 },
      { name: "Terraform", level: 0.8 },
      { name: "Pulumi", level: 0.75 },
      { name: "Helm", level: 0.7 }
    ],
    "CI/CD": [
      { name: "GitHub Actions", level: 0.95 },
      { name: "Jenkins", level: 0.7 },
      { name: "JFrog Artifactory", level: 0.8 },
      { name: "ArgoCD", level: 0.7 }
    ],
    "Containers & Systems": [
      { name: "Docker", level: 0.9 },
      { name: "Kubernetes", level: 0.8 },
      { name: "Linux", level: 0.85 },
      { name: "Git / GitHub", level: 0.95 }
    ],
    "AI-Augmented DevOps": [
      { name: "GitHub Copilot", level: 0.9 },
      { name: "Claude Code", level: 0.9 },
      { name: "Agent Skills / Prompts", level: 0.85 },
      { name: "MCP Servers", level: 0.8 },
      { name: "Internal Knowledge (RAG)", level: 0.85 }
    ],
    "Languages": [
      { name: "Python", level: 0.85 },
      { name: "Bash", level: 0.9 },
      { name: "TypeScript", level: 0.75 },
      { name: "JavaScript", level: 0.75 }
    ]
  },
  traits: ["Problem solver", "Persistent", "Team player", "Continuous learner", "Works under pressure", "Communicator"],
  languages: [
    { name: "Hebrew", level: "Native" },
    { name: "English", level: "Fluent" }
  ]
};

// ─── HEADER HUD ─────────────────────────────────────────────────────
function HeaderHUD({ accent, density }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Uptime since current role at Phoenix Financial: Jan 5, 2025
  const start = new Date("2025-01-05T00:00:00Z");
  const ms = time - start;
  const days = Math.floor(ms / 86400000);
  const hrs = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);

  const pad = density === "compact" ? "16px 20px" : "24px 28px";

  return (
    <header className="hud-header" style={{ padding: pad }}>
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      <div className="hud-row hud-meta-top">
        <span className="dot" style={{ background: accent }} />
        <span className="muted mono small">SESSION</span>
        <span className="mono small">{time.toISOString().replace("T", " ").slice(0, 19)} UTC</span>
        <span className="muted mono small" style={{ marginLeft: "auto" }}>RESUME.v2026.05</span>
      </div>

      <div className="hud-identity">
        <div className="hud-name">
          <div className="mono muted small">$ whoami</div>
          <h1>
            {RESUME.name}
            <span className="cursor" style={{ background: accent }} />
          </h1>
          <div className="role-line">
            <span className="role" style={{ color: accent }}>&gt; {RESUME.role}</span>
            <span className="muted small">// {RESUME.tagline}</span>
          </div>
        </div>

        <div className="hud-stats">
          <Stat label="UPTIME" value={`${days}d ${hrs}h ${mins}m`} accent={accent} />
          <Stat label="LOCATION" value={RESUME.location} accent={accent} />
          <Stat label="STATUS" value="OPEN_TO_WORK" accent={accent} blink />
        </div>
      </div>

      <div className="hud-row hud-contact">
        <ContactChip icon="@" value={RESUME.email} accent={accent} href={`mailto:${RESUME.email}`} />
        <ContactChip icon="☏" value={RESUME.phone} accent={accent} href={`tel:${RESUME.phone.replace(/-/g, "")}`} />
        <ContactChip icon="in" value={`linkedin/${RESUME.linkedin}`} accent={accent} href={`https://www.linkedin.com/in/${RESUME.linkedin}/`} />
        <ContactChip icon="gh" value={`github/${RESUME.github}`} accent={accent} href={`https://github.com/${RESUME.github}`} />
      </div>
    </header>
  );
}

function Stat({ label, value, accent, blink }) {
  return (
    <div className="stat">
      <div className="mono muted small">{label}</div>
      <div className="mono stat-value" style={{ color: accent }}>
        {blink && <span className="blink-dot" style={{ background: accent }} />}
        {value}
      </div>
    </div>
  );
}

function ContactChip({ icon, value, accent, href }) {
  return (
    <a className="chip" href={href} target="_blank" rel="noreferrer">
      <span className="chip-icon" style={{ color: accent, borderColor: accent + "55" }}>{icon}</span>
      <span className="mono small">{value}</span>
    </a>
  );
}

// ─── TERMINAL ───────────────────────────────────────────────────────
const HELP_TEXT = [
  "Available commands:",
  "  whoami          identity & summary",
  "  skills [tag]    list skills (try: skills cloud)",
  "  experience      recent roles",
  "  contact         how to reach me",
  "  ls /projects    show key projects",
  "  cat traits.txt  what I'm like to work with",
  "  clear           clear the terminal",
  "  help            this menu",
];

function Terminal({ accent }) {
  const [history, setHistory] = useState([
    { kind: "system", text: "amir@devops:~$ session started" },
    { kind: "system", text: `Welcome. Type 'help' or click a suggestion below.` },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    const out = [{ kind: "prompt", text: cmd }];
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (head.toLowerCase()) {
      case "help":
        HELP_TEXT.forEach((l) => out.push({ kind: "out", text: l }));
        break;
      case "whoami":
        out.push({ kind: "out", text: `${RESUME.name} · ${RESUME.role}` });
        out.push({ kind: "out", text: `→ ${RESUME.tagline}` });
        out.push({ kind: "out", text: `→ ${RESUME.summary}` });
        out.push({ kind: "out", text: `→ Based in ${RESUME.location}, currently ${"OPEN_TO_WORK"}.` });
        break;
      case "skills": {
        const groups = Object.entries(RESUME.skills);
        const filtered = arg
          ? groups.filter(([g]) => g.toLowerCase().includes(arg))
          : groups;
        if (filtered.length === 0) {
          out.push({ kind: "err", text: `no skill group matches '${arg}'` });
        } else {
          filtered.forEach(([g, items]) => {
            out.push({ kind: "out", text: `[${g}]` });
            items.forEach((s) => {
              const bar = "█".repeat(Math.round(s.level * 10)) + "░".repeat(10 - Math.round(s.level * 10));
              out.push({ kind: "out", text: `  ${s.name.padEnd(22, " ")} ${bar} ${Math.round(s.level * 100)}%` });
            });
          });
        }
        break;
      }
      case "experience":
        RESUME.experience.forEach((e) => {
          out.push({ kind: "out", text: `${e.period} · ${e.title} @ ${e.company}` });
          out.push({ kind: "out", text: `  ${e.summary}` });
        });
        break;
      case "contact":
        out.push({ kind: "out", text: `email   : ${RESUME.email}` });
        out.push({ kind: "out", text: `phone   : ${RESUME.phone}` });
        out.push({ kind: "out", text: `linkedin: linkedin.com/in/${RESUME.linkedin}` });
        out.push({ kind: "out", text: `github  : github.com/${RESUME.github}` });
        break;
      case "ls":
        if (arg.includes("project")) {
          [
            "┌──────────────────────────────────────────────────",
            "│ cloudblox/                       private · pre-launch",
            "└──────────────────────────────────────────────────",
            "  Personal IaC platform.",
            "  Production-grade AWS infra from a single blox.yaml.",
            "",
            "  THE PROBLEM",
            "    At scaling startups, 1-2 DevOps engineers field",
            "    every infra request. Devs can't self-serve;",
            "    DevOps can't keep up.",
            "",
            "  HOW IT WORKS",
            "    · Composable blocks (EKS, RDS, Lambda, ECS,",
            "      static-sites, more) provision real AWS",
            "      resources. Pulumi runs under the hood.",
            "      Devs never write or see Pulumi code.",
            "    · Two-repo model: infra repo (DevOps owns)",
            "      + gitops repo (developers own). One CLI",
            "      drives both. Same `cloudblox deploy` flow.",
            "    · GitOps-friendly: every workload is declared",
            "      in YAML, versioned, and reviewed in PRs.",
            "",
            "  STACK",
            "    TypeScript · Pulumi · Node CLI · AWS · GitHub Actions",
            "",
            "┌──────────────────────────────────────────────────",
            "│ amir-resume-site/                deployed via cloudblox",
            "└──────────────────────────────────────────────────",
            "  This resume.",
            "  Dogfooding CloudBlox to ship its own demo site.",
            "",
            "  · Defined in a 10-line blox.yaml (static-site block).",
            "  · Provisions S3 + CloudFront + Route 53 + ACM.",
            "  · Pushed by the same CLI CloudBlox ships to users.",
            "  · Built fully static (no JS) so it's fast, indexable,",
            "    and prints clean to PDF.",
          ].forEach((t) => out.push({ kind: "out", text: t }));
        } else {
          out.push({ kind: "err", text: `ls: cannot access '${arg || "/"}'. try: ls /projects` });
        }
        break;
      case "cat":
        if (arg === "traits.txt") {
          RESUME.traits.forEach((t) => out.push({ kind: "out", text: `· ${t}` }));
        } else {
          out.push({ kind: "err", text: `cat: ${arg}: No such file. try: cat traits.txt` });
        }
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo":
        out.push({ kind: "err", text: `${RESUME.name} is not in the sudoers file. This incident will be reported.` });
        break;
      default:
        out.push({ kind: "err", text: `command not found: ${head}. try: help` });
    }
    setHistory((h) => [...h, ...out]);
  }

  const suggestions = ["whoami", "skills", "experience", "ls /projects", "contact", "cat traits.txt"];

  return (
    <section className="panel terminal" onClick={() => inputRef.current?.focus()}>
      <div className="panel-bar">
        <span className="tl-dot" style={{ background: "#ff5f56" }} />
        <span className="tl-dot" style={{ background: "#ffbd2e" }} />
        <span className="tl-dot" style={{ background: "#27c93f" }} />
        <span className="mono small muted" style={{ marginLeft: 12 }}>amir@devops:~ · interactive resume</span>
        <span className="mono small muted" style={{ marginLeft: "auto" }}>bash 5.2.21</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className={`tline tline-${line.kind}`}>
            {line.kind === "prompt" && <span style={{ color: accent }}>amir@devops:~$ </span>}
            {line.kind === "err" && <span style={{ color: "#ff8866" }}>! </span>}
            <span>{line.text}</span>
          </div>
        ))}
        <div className="tline tline-input">
          <span style={{ color: accent }}>amir@devops:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            spellCheck={false}
            autoFocus
          />
          <span className="cursor inline" style={{ background: accent }} />
        </div>
      </div>
      <div className="suggestions">
        {suggestions.map((s) => (
          <button
            key={s}
            className="suggest mono small"
            style={{ borderColor: accent + "44", color: accent }}
            onClick={(e) => {
              e.stopPropagation();
              run(s);
              inputRef.current?.focus();
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── SKILL MATRIX ───────────────────────────────────────────────────
function SkillMatrix({ accent }) {
  const [hoverGroup, setHoverGroup] = useState(null);
  return (
    <section className="panel skill-panel">
      <div className="panel-header">
        <span className="mono small muted">02 //</span>
        <h2 className="mono">SKILL_MATRIX</h2>
        <span className="mono small muted" style={{ marginLeft: "auto" }}>
          {Object.values(RESUME.skills).flat().length} entries
        </span>
      </div>
      <div className="skill-grid">
        {Object.entries(RESUME.skills).map(([group, items]) => (
          <div
            key={group}
            className="skill-group"
            onMouseEnter={() => setHoverGroup(group)}
            onMouseLeave={() => setHoverGroup(null)}
            style={{
              borderColor: hoverGroup === group ? accent : "rgba(255,255,255,0.08)",
              background: hoverGroup === group ? "rgba(255,255,255,0.02)" : "transparent",
            }}
          >
            <div className="skill-group-head mono small">
              <span style={{ color: accent }}>▸</span> {group}
            </div>
            {items.map((s) => (
              <SkillBar key={s.name} skill={s} accent={accent} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillBar({ skill, accent }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="skill-row" ref={ref}>
      <span className="mono small skill-name">{skill.name}</span>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{
            width: shown ? `${skill.level * 100}%` : 0,
            background: accent,
            boxShadow: `0 0 8px ${accent}66`,
          }}
        />
        <div className="skill-ticks">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="tick" />
          ))}
        </div>
      </div>
      <span className="mono small muted skill-pct">{Math.round(skill.level * 100)}</span>
    </div>
  );
}

// ─── EXPERIENCE TIMELINE ────────────────────────────────────────────
function Timeline({ accent }) {
  const [open, setOpen] = useState("phoenix");
  return (
    <section className="panel timeline-panel">
      <div className="panel-header">
        <span className="mono small muted">01 //</span>
        <h2 className="mono">EXPERIENCE.LOG</h2>
        <span className="mono small muted" style={{ marginLeft: "auto" }}>{RESUME.experience.length} entries</span>
      </div>
      <div className="timeline">
        <div className="timeline-spine" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />
        {RESUME.experience.map((e) => (
          <ExperienceItem
            key={e.id}
            entry={e}
            open={open === e.id}
            onToggle={() => setOpen(open === e.id ? null : e.id)}
            accent={accent}
          />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({ entry, open, onToggle, accent }) {
  const isLive = entry.status === "ACTIVE" || entry.status === "SIDE_PROJECT";
  return (
    <div className={`tl-item ${open ? "open" : ""}`}>
      <div className="tl-marker" style={{ borderColor: accent, background: open ? accent : "transparent" }}>
        {entry.status === "ACTIVE" && <span className="pulse" style={{ background: accent }} />}
      </div>
      <button className="tl-head" onClick={onToggle}>
        <div className="tl-head-top">
          <span className="mono small muted">{entry.period}</span>
          <span
            className="mono micro tl-status"
            style={{
              color: isLive ? accent : "rgba(255,255,255,0.4)",
              borderColor: isLive ? accent : "rgba(255,255,255,0.15)",
            }}
          >
            {entry.status}
          </span>
        </div>
        <div className="tl-title">
          <span className="tl-role">{entry.title}</span>
          <span className="muted">@</span>
          <span className="tl-company" style={{ color: accent }}>{entry.company}</span>
        </div>
        <div className="tl-summary">{entry.summary}</div>
      </button>
      <div className="tl-body" style={{ maxHeight: open ? 1000 : 0 }}>
        <div className="tl-body-inner">
          <ul className="tl-bullets">
            {entry.bullets.map((b, i) => (
              <li key={i}>
                <span className="bullet-mark mono" style={{ color: accent }}>▸</span>
                {typeof b === "string" ? (
                  <span>{b}</span>
                ) : (
                  <span><strong style={{ color: accent, fontWeight: 600 }}>{b.lead}</strong> <span style={{ color: "var(--text)" }}>{b.body}</span></span>
                )}
              </li>
            ))}
          </ul>
          <div className="stack">
            {entry.stack.map((s) => (
              <span key={s} className="stack-tag mono small" style={{ borderColor: accent + "44" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EDUCATION ──────────────────────────────────────────────────────
function Education({ accent }) {
  return (
    <section className="panel education-panel">
      <div className="panel-header">
        <span className="mono small muted">04 //</span>
        <h2 className="mono">EDUCATION</h2>
        <span className="mono small muted" style={{ marginLeft: "auto" }}>{RESUME.education.length} entries</span>
      </div>
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {RESUME.education.map((e) => (
          <div key={e.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 500 }}>{e.title}</span>
              <span className="muted">@</span>
              <span className="mono small" style={{ color: accent }}>{e.school}</span>
              <span className="mono small muted" style={{ marginLeft: "auto" }}>{e.period}</span>
            </div>
            <div className="muted" style={{ fontSize: 13.5, maxWidth: "62ch" }}>{e.summary}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── META PANELS ────────────────────────────────────────────────────
function MetaPanels({ accent }) {
  return (
    <div className="meta-grid">
      <section className="panel meta-panel">
        <div className="panel-header">
          <span className="mono small muted">03 //</span>
          <h2 className="mono">TRAITS</h2>
        </div>
        <div className="trait-grid">
          {RESUME.traits.map((t, i) => (
            <div key={t} className="trait mono small">
              <span style={{ color: accent }}>0{i + 1}</span> {t}
            </div>
          ))}
        </div>
      </section>

      <section className="panel meta-panel">
        <div className="panel-header">
          <span className="mono small muted">04 //</span>
          <h2 className="mono">LANGUAGES</h2>
        </div>
        <div className="lang-list">
          {RESUME.languages.map((l) => (
            <div key={l.name} className="lang-row">
              <span>{l.name}</span>
              <span className="mono small" style={{ color: accent }}>{l.level}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────
function Footer({ accent }) {
  return (
    <footer className="hud-footer">
      <div className="mono small muted">
        <span style={{ color: accent }}>●</span> END OF FILE
      </div>
      <div className="mono small muted">
        Deployed via <a href={`https://github.com/${RESUME.github}`} target="_blank" rel="noreferrer" style={{ color: accent }}>CloudBlox</a>, my own AWS platform-as-code project · {new Date().getFullYear()}
      </div>
      <div className="mono small muted">
        <a href={`mailto:${RESUME.email}`} style={{ color: accent }}>→ start a conversation</a>
      </div>
    </footer>
  );
}

Object.assign(window, {
  RESUME, HeaderHUD, Terminal, SkillMatrix, Timeline, Education, MetaPanels, Footer,
});
