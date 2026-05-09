// Mount

const ACCENT_PALETTES = {
  matrix:   { name: "matrix",   color: "#4ade80" },
  amber:    { name: "amber",    color: "#fbbf24" },
  cyan:     { name: "cyan",     color: "#22d3ee" },
  magenta:  { name: "magenta",  color: "#f472b6" },
  ember:    { name: "ember",    color: "#fb7185" },
};

function App() {
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "matrix",
    "density": "default",
    "scanlines": false
  }/*EDITMODE-END*/);

  const accent = (ACCENT_PALETTES[t.accent] || ACCENT_PALETTES.matrix).color;

  React.useEffect(() => {
    document.body.classList.toggle("scanlines", !!t.scanlines);
    document.documentElement.style.setProperty("--accent", accent);
  }, [t.scanlines, accent]);

  return (
    <>
      <div className={`app ${t.density === "compact" ? "compact" : t.density === "roomy" ? "roomy" : ""}`}>
        <HeaderHUD accent={accent} density={t.density} />
        <div className="main-grid">
          <div className="col">
            <Terminal accent={accent} />
            <Timeline accent={accent} />
          </div>
          <div className="col">
            <SkillMatrix accent={accent} />
            <Education accent={accent} />
            <MetaPanels accent={accent} />
          </div>
        </div>
        <Footer accent={accent} />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor
            label="Palette"
            value={ACCENT_PALETTES[t.accent]?.color}
            onChange={(c) => {
              const match = Object.entries(ACCENT_PALETTES).find(([k, v]) => v.color === c);
              if (match) setTweak("accent", match[0]);
            }}
            options={Object.values(ACCENT_PALETTES).map((p) => p.color)}
          />
        </TweakSection>
        <TweakSection title="Density">
          <TweakRadio
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Default", value: "default" },
              { label: "Roomy",   value: "roomy" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Effects">
          <TweakToggle
            label="CRT scanlines"
            value={t.scanlines}
            onChange={(v) => setTweak("scanlines", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
