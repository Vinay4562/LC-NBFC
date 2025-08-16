// src/LogPanel.js
import React from "react";

export default function LogPanel({ logs }) {
  return (
    <div style={{ 
      maxHeight: 220, 
      overflowY: "auto", 
      fontSize: 11, 
      color: "#9aa5b1", 
      background: "#061424", 
      padding: 10, 
      borderRadius: 6,
      fontFamily: "Monaco, 'Courier New', monospace",
      lineHeight: 1.4
    }}>
      {logs.length === 0 ? <div style={{ color: "#6b7280" }}>No actions yet.</div> :
        <div>
          {logs.slice().reverse().map((l, i) => (
            <div key={i} style={{ marginBottom: 4, borderBottom: "1px solid #1f2937", paddingBottom: 3 }}>
              {l}
            </div>
          ))}
        </div>
      }
    </div>
  );
}
