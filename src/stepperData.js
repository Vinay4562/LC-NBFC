// Exact 400 kV feeders for TSTRANSCO (from user's provided list)
export const FEEDERS_400KV = [
  "400KV MAHESHWARAM-2",
  "400KV MAHESHWARAM-1",
  "400KV NARSAPUR-1",
  "400KV NARSAPUR-2",
  "400KV KETHIREDDYPALLY-1",
  "400KV KETHIREDDYPALLY-2",
  "400KV NIZAMABAD-1",
  "400KV NIZAMABAD-2"
];

// LC steps (Line Clearance) — exact steps as provided earlier
export const LC_STEPS = [
  { id: "plan", label: "Work planning & approval", required: true },
  { id: "receive", label: "Receive LC request & identify equipment", required: true },
  { id: "cb-open", label: "Open Circuit Breaker (CB)", required: true },
  { id: "isolators-open", label: "Open Isolators", required: true },
  { id: "voltage-check", label: "Absence of Voltage Check", required: true },
  { id: "apply-earth", label: "Apply Safety Earths", required: true },
  { id: "tag", label: "Tag equipment (Men at Work)", required: true },
  { id: "issue-lc", label: "Issue LC to maintenance team", required: true },
  { id: "work-done", label: "Work completed & LC returned", required: true },
  { id: "remove-earth", label: "Remove Earth & Tags", required: true },
  { id: "close-isolators", label: "Close Isolators", required: true },
  { id: "close-cb", label: "Close CB & inform SLDC", required: true }
];

// NBFC steps (Non-Breakdown Forced Clearance)
export const NBFC_STEPS = [
  { id: "detect", label: "Detect abnormality & report", required: true },
  { id: "slcd-approval", label: "Get SLDC/NLDC immediate approval", required: true },
  { id: "cb-trip", label: "Trip Circuit Breaker (CB)", required: true },
  { id: "isolators-open", label: "Open Isolators", required: true },
  { id: "voltage-check", label: "Absence of Voltage Check", required: true },
  { id: "apply-earth", label: "Apply Safety Earths", required: true },
  { id: "tag", label: "Tag equipment", required: true },
  { id: "urgent-work", label: "Carry out urgent work", required: true },
  { id: "remove-earth", label: "Remove Earth & Tags", required: true },
  { id: "close-isolators", label: "Close Isolators", required: true },
  { id: "monitor", label: "Monitor after re-energization", required: true }
];
