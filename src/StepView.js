// src/StepView.js
import React from "react";

export default function StepView({ step, completed, toggle }) {
  if (!step) return null;
  const done = !!completed[step.id];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={done} readOnly />
        <span style={{ fontWeight: 600 }}>{step.label}</span>
      </label>
      {step.detail && (
        <div style={{ fontSize: 13, color: "#9aa5b1" }}>
          <strong>Devices:</strong>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {step.detail.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
      <button onClick={toggle} style={{ padding: 6, borderRadius: 6, background: done ? "#3fb37f" : "#4f46e5", color: done ? "#04210a" : "#fff", cursor: "pointer" }}>
        {done ? "Mark Undone" : "Mark Done"}
      </button>
    </div>
  );
}
