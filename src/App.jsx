// src/App.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEEDER_GROUPS, getStepsFor } from "./data";

export default function App() {
  const voltageGroups = ["None", ...Object.keys(FEEDER_GROUPS)]; // ["None", "400KV", "220KV", "ICTs"]
  const [voltage, setVoltage] = useState("None");
  const [feeder, setFeeder] = useState("");
  const [procedure, setProcedure] = useState("LC"); // "LC", "NBFC", "LC_RETURN", or "NBFC_RETURN"
  const [previousFeeder, setPreviousFeeder] = useState(""); // Track previous feeder
  const [previousProcedure, setPreviousProcedure] = useState(""); // Track previous procedure

  const [steps, setSteps] = useState(() => voltage === "None" ? [] : getStepsFor(voltage, feeder, procedure));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState({});
  const [log, setLog] = useState([]);

  // Helper function to get display name for procedure
  const getProcedureDisplayName = (proc) => {
    switch(proc) {
      case "LC": return "LC Issue";
      case "NBFC": return "NBFC Issue";
      case "LC_RETURN": return "LC Return";
      case "NBFC_RETURN": return "NBFC Return";
      default: return proc;
    }
  };

  // Helper function to clear all lcnbfc-related localStorage keys
  function clearAllFeederStates() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("lcnbfc:"))
      .forEach((key) => localStorage.removeItem(key));
    setCompleted({});
    setCurrentIndex(0);
    appendLog("Cleared all feeder and procedure states from storage");
  }

  // When voltage changes, update feeder to first in list and clear states
  useEffect(() => {
    if (voltage === "None") {
      setFeeder("");
      setSteps([]);
      setCurrentIndex(0);
      setCompleted({});
      clearAllFeederStates(); // Clear all states when voltage is "None"
      return;
    }
    
    const list = FEEDER_GROUPS[voltage] || [];
    const newFeeder = list[0] || "";
    setFeeder(newFeeder);
    
    // Clear all states when switching voltage
    clearAllFeederStates();
    setLog((l) => [...l, `Switched to voltage: ${voltage} - All previous states cleared`]);
  }, [voltage]);

  // When feeder or procedure changes, regenerate steps and handle state persistence
  useEffect(() => {
    if (voltage === "None" || !feeder) {
      setSteps([]);
      setCurrentIndex(0);
      setCompleted({});
      return;
    }

    // Check if switching between LC and LC_RETURN for the same feeder
    const isSameFeederLCSwitch =
      previousFeeder === feeder &&
      ((previousProcedure === "LC" && procedure === "LC_RETURN") ||
       (previousProcedure === "LC_RETURN" && procedure === "LC"));

    if (!isSameFeederLCSwitch) {
      // Clear all feeder states unless switching between LC and LC_RETURN for the same feeder
      clearAllFeederStates();
    }

    const newSteps = getStepsFor(voltage, feeder, procedure) || [];
    setSteps(newSteps);
    setCurrentIndex(0);
    setCompleted({});

    // Load saved state if present
    const key = storageKey(feeder, procedure);
    const saved = localStorage.getItem(key);
    if (saved && isSameFeederLCSwitch) {
      try {
        const parsed = JSON.parse(saved);
        setCompleted(parsed.completed || {});
        setCurrentIndex(typeof parsed.currentIndex === "number" ? parsed.currentIndex : 0);
        setLog((l) => [...l, `Loaded saved state for ${feeder} (${getProcedureDisplayName(procedure)})`]);
      } catch (e) {
        // Ignore parsing errors
      }
    }

    setLog((l) => [...l, `Procedure: ${getProcedureDisplayName(procedure)} — feeder: ${feeder} — voltage: ${voltage} - Previous states ${isSameFeederLCSwitch ? "preserved" : "cleared"}`]);

    // Update previous feeder and procedure for next change
    setPreviousFeeder(feeder);
    setPreviousProcedure(procedure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeder, procedure, voltage]);

  // Persist state to localStorage
  useEffect(() => {
    const key = storageKey(feeder, procedure);
    localStorage.setItem(key, JSON.stringify({ completed, currentIndex }));
  }, [completed, currentIndex, feeder, procedure]);

  function storageKey(fdr, proc) {
    return `lcnbfc:${fdr}:${proc}`;
  }

  function appendLog(txt) {
    const timestamp = new Date().toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setLog((l) => [...l, `[${timestamp}] ${txt}`]);
  }

  function toggleStep(idx) {
    // Gated: only allow toggling current or previous steps
    if (idx > currentIndex) return;
    const s = steps[idx];
    setCompleted((c) => {
      const next = { ...c, [s.id]: !c[s.id] };
      appendLog(`Toggled: "${s.label}" -> ${!c[s.id] ? "DONE" : "UNDONE"}`);
      return next;
    });
  }

  function next() {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((i) => i + 1);
      appendLog(`Moved to next: ${steps[currentIndex + 1] ? steps[currentIndex + 1].label : "(unknown)"}`);
    } else {
      appendLog(`Procedure complete for ${feeder} (${getProcedureDisplayName(procedure)})`);
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      appendLog(`Moved to previous: ${steps[currentIndex - 1] ? steps[currentIndex - 1].label : "(unknown)"}`);
    }
  }

  function resetAll() {
    setCompleted({});
    setCurrentIndex(0);
    clearAllFeederStates(); // Clear all states on reset
    appendLog(`Reset procedure for ${feeder} (${getProcedureDisplayName(procedure)})`);
  }

  function exportAudit() {
    const payload = {
      feeder,
      voltage,
      procedure,
      timestamp: new Date().toISOString(),
      completed,
      currentIndex,
      log
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${feeder}-${procedure}-audit.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const progress = Math.round((Object.keys(completed).length / (steps.length || 1)) * 100);
  const progressWidth = `${progress}%`;
  const currentStep = steps[currentIndex] || null;

  // Welcome message component (unchanged)
  const WelcomeMessage = () => (
    <div style={{ padding: 40, textAlign: "center", background: "linear-gradient(180deg,#061224,#08182a)", borderRadius: 8, minHeight: 400, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>⚡</div>
      <h2 style={{ margin: 0, marginBottom: 16, color: "#3fb37f" }}>Welcome to TG TRANSCO LC & NBFC Interactive System</h2>
      <div style={{ color: "#9aa5b1", fontSize: 16, lineHeight: 1.6, maxWidth: 600, marginBottom: 24 }}>
        <p>This interactive system helps you manage Line Clearance (LC) and No Bus Fault Clearance (NBFC) procedures for electrical substations.</p>
        <p><strong>Features:</strong></p>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>Step-by-step guided procedures for 400KV and 220KV feeders</li>
          <li>Specialized processes for ICTs (Inter-Connecting Transformers)</li>
          <li>Both Issue and Return procedures for LC and NBFC</li>
          <li>Progress tracking and state persistence</li>
          <li>Safety-first approach with required step validation</li>
          <li>Detailed device identification and operation sequences</li>
        </ul>
      </div>
      <div style={{ background: "#071427", padding: 16, borderRadius: 8, color: "#9aa5b1", fontSize: 14 }}>
        <strong>Getting Started:</strong><br />
        1. Select a voltage level (400KV, 220KV, or ICTs)<br />
        2. Choose the specific feeder or ICT<br />
        3. Select the procedure type (LC Issue/Return or NBFC Issue/Return)<br />
        4. Follow the step-by-step instructions
      </div>
    </div>
  );

  // Rest of the JSX remains unchanged
  return (
    <div style={{ padding: 18, maxWidth: 1100, margin: "18px auto", fontFamily: "Inter, system-ui, Arial" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>TG TRANSCO — LC & NBFC Interactive</h1>
          <div style={{ color: "#9aa5b1", marginTop: 6 }}>Select voltage → feeder → procedure. Complete each step to progress.</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={voltage} onChange={(e) => setVoltage(e.target.value)} style={{ padding: 8 }}>
            {voltageGroups.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>

          <select value={feeder} onChange={(e) => setFeeder(e.target.value)} style={{ padding: 8 }} disabled={voltage === "None"}>
            {voltage === "None" ? (
              <option value="">Select Voltage First</option>
            ) : (
              (FEEDER_GROUPS[voltage] || []).map((f) => <option key={f} value={f}>{f}</option>)
            )}
          </select>

          <div style={{ display: "flex", background: "#071627", padding: 6, borderRadius: 8, gap: 4, opacity: voltage === "None" ? 0.5 : 1 }}>
            <label style={{ padding: "6px 8px", cursor: voltage === "None" ? "not-allowed" : "pointer", color: procedure === "LC" ? "#04210a" : "#9aa5b1", background: procedure === "LC" ? "#c9f2da" : "transparent", borderRadius: 6, fontSize: 13 }}>
              <input type="radio" name="proc" value="LC" checked={procedure === "LC"} onChange={() => voltage !== "None" && setProcedure("LC")} disabled={voltage === "None"} style={{ display: "none" }} />
              LC Issue
            </label>
            <label style={{ padding: "6px 8px", cursor: voltage === "None" ? "not-allowed" : "pointer", color: procedure === "NBFC" ? "#04210a" : "#9aa5b1", background: procedure === "NBFC" ? "#c9f2da" : "transparent", borderRadius: 6, fontSize: 13 }}>
              <input type="radio" name="proc" value="NBFC" checked={procedure === "NBFC"} onChange={() => voltage !== "None" && setProcedure("NBFC")} disabled={voltage === "None"} style={{ display: "none" }} />
              NBFC Issue
            </label>
            <label style={{ padding: "6px 8px", cursor: voltage === "None" ? "not-allowed" : "pointer", color: procedure === "LC_RETURN" ? "#04210a" : "#9aa5b1", background: procedure === "LC_RETURN" ? "#c9f2da" : "transparent", borderRadius: 6, fontSize: 13 }}>
              <input type="radio" name="proc" value="LC_RETURN" checked={procedure === "LC_RETURN"} onChange={() => voltage !== "None" && setProcedure("LC_RETURN")} disabled={voltage === "None"} style={{ display: "none" }} />
              LC Return
            </label>
            <label style={{ padding: "6px 8px", cursor: voltage === "None" ? "not-allowed" : "pointer", color: procedure === "NBFC_RETURN" ? "#04210a" : "#9aa5b1", background: procedure === "NBFC_RETURN" ? "#c9f2da" : "transparent", borderRadius: 6, fontSize: 13 }}>
              <input type="radio" name="proc" value="NBFC_RETURN" checked={procedure === "NBFC_RETURN"} onChange={() => voltage !== "None" && setProcedure("NBFC_RETURN")} disabled={voltage === "None"} style={{ display: "none" }} />
              NBFC Return
            </label>
          </div>

          <button onClick={resetAll} disabled={voltage === "None"} style={{ padding: 8, background: voltage === "None" ? "#374151" : "#dc2626", color: "white", borderRadius: 8, opacity: voltage === "None" ? 0.5 : 1, cursor: voltage === "None" ? "not-allowed" : "pointer" }}>Reset</button>
          <button onClick={exportAudit} disabled={voltage === "None"} style={{ padding: 8, background: voltage === "None" ? "#374151" : "#3fb37f", color: voltage === "None" ? "#9ca3af" : "#04210a", borderRadius: 8, opacity: voltage === "None" ? 0.5 : 1, cursor: voltage === "None" ? "not-allowed" : "pointer" }}>Export</button>
        </div>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, marginTop: 16 }}>
        <section style={{ background: "#0b1622", padding: 16, borderRadius: 10 }}>
          {voltage === "None" ? (
            <WelcomeMessage />
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{ margin: 0 }}>{feeder} — {getProcedureDisplayName(procedure)}</h2>
                  <div style={{ color: "#9aa5b1", marginTop: 6 }}>Step {currentIndex + 1} of {steps.length}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ width: 220 }}>
                    <div style={{ height: 10, background: "#072233", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "linear-gradient(90deg,#3fb37f,#68d391)", width: progressWidth, transition: "width 250ms" }} />
                    </div>
                    <div style={{ color: "#9aa5b1", fontSize: 12, marginTop: 6 }}>Progress: {progress}%</div>
                  </div>
                </div>
              </div>

              <div style={{ minHeight: 220, marginTop: 12 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep ? currentStep.id : `step-${currentIndex}`}
                    initial={{ opacity: 0, x: 40, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    style={{ padding: 18, background: "linear-gradient(180deg,#061224,#08182a)", borderRadius: 8 }}
                  >
                    <h3 style={{ margin: 0 }}>{currentStep ? currentStep.label : "(no step)"}</h3>
                    <div style={{ color: "#9aa5b1", marginTop: 8 }}>Complete the action below and mark it done to unlock the next step.</div>

                    <div style={{ marginTop: 12 }}>
                      <StepBlock step={currentStep} completed={completed} toggle={() => toggleStep(currentIndex)} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}

          {voltage !== "None" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <div>
                  <button onClick={prev} disabled={currentIndex === 0} style={{ padding: 8, borderRadius: 8, marginRight: 8, background: currentIndex === 0 ? "#1f2937" : "#1f2937", color: "#e6eef5", opacity: currentIndex === 0 ? 0.5 : 1 }}>Previous</button>
                  <button 
                    onClick={next} 
                    disabled={
                      (currentStep && currentStep.required && !completed[currentStep.id]) || 
                      (currentIndex === steps.length - 1)
                    }
                    style={{ 
                      padding: 8, 
                      borderRadius: 8, 
                      background: (
                        (currentStep && currentStep.required && !completed[currentStep.id]) || 
                        (currentIndex === steps.length - 1)
                      ) ? "#374151" : "#4f46e5", 
                      color: (
                        (currentStep && currentStep.required && !completed[currentStep.id]) || 
                        (currentIndex === steps.length - 1)
                      ) ? "#9ca3af" : "white",
                      opacity: (
                        (currentStep && currentStep.required && !completed[currentStep.id]) || 
                        (currentIndex === steps.length - 1)
                      ) ? 0.6 : 1,
                      cursor: (
                        (currentStep && currentStep.required && !completed[currentStep.id]) || 
                        (currentIndex === steps.length - 1)
                      ) ? "not-allowed" : "pointer"
                    }}
                  >
                    Next
                  </button>
                </div>
                <div style={{ color: "#9aa5b1", fontSize: 12 }}>
                  {currentIndex === steps.length - 1
                    ? "Procedure completed! Use Previous to review steps."
                    : currentStep && currentStep.required && !completed[currentStep.id] 
                    ? "Complete the current step to proceed" 
                    : "Tip: mark the required action done before moving next."
                  }
                </div>
              </div>

              <div style={{ marginTop: 14, padding: 12, background: "#071427", borderRadius: 8 }}>
                <strong>Checklist:</strong>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                  {steps.map((s, i) => (
                    <div key={s.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: completed[s.id] ? "#3fb37f" : "#18303d" }} />
                      <div style={{ fontSize: 13 }}>{i + 1}. {s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        <aside style={{ background: "#0e1724", padding: 16, borderRadius: 10 }}>
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: 0 }}>Live Log</h4>
            <div style={{ marginTop: 8, maxHeight: 200, overflow: "auto", padding: 10, background: "#061424", borderRadius: 8, color: "#9aa5b1", fontSize: 11, fontFamily: "Monaco, 'Courier New', monospace", lineHeight: 1.4 }}>
              {log.length === 0 ? <div style={{ color: "#6b7280" }}>No actions yet.</div> : 
                <div>
                  {log.slice().reverse().map((l, i) => (
                    <div key={i} style={{ marginBottom: 4, borderBottom: "1px solid #1f2937", paddingBottom: 3 }}>
                      {l}
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: 0 }}>Quick Controls</h4>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => { setCompleted(steps.reduce((a, s) => ({ ...a, [s.id]: true }), {})); appendLog("All steps marked done (demo)"); }} style={{ padding: 8 }}>Mark All</button>
              <button onClick={() => { setCompleted({}); appendLog("All steps cleared"); }} style={{ padding: 8 }}>Clear All</button>
              <button onClick={() => appendLog(`Checkpoint saved at ${new Date().toLocaleString()}`)} style={{ padding: 8 }}>Checkpoint</button>
            </div>
          </div>

          <div style={{ color: "#9aa5b1", fontSize: 13 }}>
            <strong>Notes:</strong>
            <ul>
              <li>Sequence respects CB/Isolator/Earth safety order for training.</li>
              <li>State persisted in localStorage per feeder + procedure.</li>
              <li>Do not connect to live SCADA without safety approvals.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* Helper child components below */
function StepBlock({ step, completed, toggle }) {
  if (!step) return null;
  const done = !!completed[step.id];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" checked={done} readOnly />
        <span style={{ fontWeight: 700 }}>{step.label}</span>
      </label>

      <div style={{ color: "#9aa5b1", fontSize: 13 }}>
        {/* Optional detail array (device list) */}
        {step.detail ? (
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Devices:</div>
            <ul>
              {step.detail.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ) : (
          <div>{/* fallback help text can be added here */}</div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={toggle} style={{ padding: 8, borderRadius: 8, background: done ? "#3fb37f" : "#4f46e5", color: done ? "#04210a" : "white" }}>{done ? "Mark Undone" : "Mark Done"}</button>
        <button onClick={() => alert(getSimulation(step.id))} style={{ padding: 8, borderRadius: 8 }}>Simulate</button>
      </div>
    </div>
  );
}

/* Light simulation text for common actions */
function getSimulation(id) {
  const sim = {
    "breaker-open": "Simulated: Breaker opened and status recorded.",
    "breaker-close": "Simulated: Breaker closed and status recorded.",
    "isolators-open": "Simulated: Isolators opened.",
    "isolators-close": "Simulated: Isolators closed.",
    "earth-close": "Simulated: Earth switches closed/applied.",
    "earth-open": "Simulated: Earth switches opened/removed."
  };
  return sim[id] || "Simulation: Action executed.";
}