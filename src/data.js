// src/data.js
// Feeder lists and dynamic SOP generators.
// Includes explicit sequence for 400KV MAHESHWARAM-2 (as provided).
// Other 400KV feeders use a templated sequence that you can edit.

export const FEEDER_GROUPS = {
  "400KV": [
    "400KV MAHESHWARAM-2",
    "400KV MAHESHWARAM-1",
    "400KV NARSAPUR-1",
    "400KV NARSAPUR-2",
    "400KV KETHIREDDYPALLY-1",
    "400KV KETHIREDDYPALLY-2",
    "400KV NIZAMABAD-1",
    "400KV NIZAMABAD-2"
  ],
  "220KV": [
    "220KV PARIGI-1",
    "220KV PARIGI-2",
    "220KV THANDUR",
    "220KV GACHIBOWLI-1",
    "220KV GACHIBOWLI-2",
    "220KV KETHIREDDYPALLY",
    "220KV YEDDUMAILARAM-1",
    "220KV YEDDUMAILARAM-2",
    "220KV SADASIVAPET-1",
    "220KV SADASIVAPET-2"
  ],
  "ICTs": [
    "315MVA ICT-1",
    "315MVA ICT-2",
    "315MVA ICT-3",
    "500MVA ICT-4"
  ]
};

/**
 * Specific device mappings for feeders.
 * Add or edit entries here if you want exact breaker/isolator/earth names per feeder.
 *
 * Example key: "400KV MAHESHWARAM-2"
 */
export const FEEDER_DEVICE_MAP = {
  // exact mapping for Maheshwaram-2 as provided by the user
  "400KV MAHESHWARAM-2": {
    breakersOpen: ["4-1-52", "4-2-52"], // open sequence (two breakers)
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-1-89L", "4-1-89", "4-1-89A", "4-2-89A", "4-2-89B"],
    earthsClose: ["4-1-89LE", "4-1-89AE", "4-2-89AE", "4-2-89BE"]
  },

  // Specific mapping for Maheshwaram-1
  "400KV MAHESHWARAM-1": {
    breakersOpen: ["4-4-52", "4-5-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-4-89L", "4-4-89", "4-4-89A", "4-5-89A", "4-5-89B"],
    earthsClose: ["4-4-89LE", "4-4-89AE", "4-5-89AE", "4-5-89BE"]
  },

  // Specific mapping for Narsapur-1
  "400KV NARSAPUR-1": {
    breakersOpen: ["4-7-52", "4-8-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-7-89L", "4-7-89", "4-7-89A", "4-8-89A", "4-8-89B"],
    earthsClose: ["4-7-89LE", "4-7-89AE", "4-8-89AE", "4-8-89BE"]
  },

  // Specific mapping for Narsapur-2
  "400KV NARSAPUR-2": {
    breakersOpen: ["4-10-52", "4-11-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-10-89L", "4-10-89", "4-10-89A", "4-11-89A", "4-11-89B"],
    earthsClose: ["4-10-89LE", "4-10-89AE", "4-11-89AE", "4-11-89BE"]
  },

  // Specific mapping for Kethireddypally-1
  "400KV KETHIREDDYPALLY-1": {
    breakersOpen: ["4-13-52", "4-14-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-13-89L", "4-13-89", "4-13-89A", "4-14-89A", "4-14-89B"],
    earthsClose: ["4-13-89LE", "4-13-89AE", "4-14-89AE", "4-14-89BE"]
  },

  // Specific mapping for Kethireddypally-2
  "400KV KETHIREDDYPALLY-2": {
    breakersOpen: ["4-16-52", "4-17-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-16-89L", "4-16-89", "4-16-89A", "4-17-89A", "4-17-89B"],
    earthsClose: ["4-16-89LE", "4-16-89AE", "4-17-89AE", "4-17-89BE"]
  },

  // Specific mapping for Nizamabad-1
  "400KV NIZAMABAD-1": {
    breakersOpen: ["4-19-52", "4-20-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-19-89L", "4-19-89", "4-19-89A", "4-20-89A", "4-20-89B"],
    earthsClose: ["4-19-89LE", "4-19-89AE", "4-20-89AE", "4-20-89BE"]
  },

  // Specific mapping for Nizamabad-2
  "400KV NIZAMABAD-2": {
    breakersOpen: ["4-22-52", "4-23-52"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["4-22-89L", "4-22-89", "4-22-89A", "4-23-89A", "4-23-89B"],
    earthsClose: ["4-22-89LE", "4-22-89AE", "4-23-89AE", "4-23-89BE"]
  },

  // Generic default: when feeder not found in map, we will generate templated names
  "default400KV": {
    breakersOpen: ["BREAKER-A", "BREAKER-B"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["ISOLATOR-1", "ISOLATOR-2", "ISOLATOR-3", "ISOLATOR-4", "ISOLATOR-5"],
    earthsClose: ["EARTH-1", "EARTH-2", "EARTH-3", "EARTH-4"]
  }
};

/**
 * Specific device mappings for 220KV feeders.
 */
export const FEEDER_DEVICE_MAP_220KV = {
  // Specific mapping for Parigi-1
  "220KV PARIGI-1": {
    breakersOpen: ["2-1-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-1-89L", "2-1-89A/B"],
    earthsClose: ["2-1-89LE2/2-1-89LE1", "2-1-89AE(if required)"]
  },

  // Specific mapping for Parigi-2
  "220KV PARIGI-2": {
    breakersOpen: ["2-2-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-2-89L", "2-2-89A/B"],
    earthsClose: ["2-2-89LE2/2-2-89LE1", "2-2-89AE(if required)"]
  },

  // Specific mapping for Thandur
  "220KV THANDUR": {
    breakersOpen: ["2-9-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-9-89L", "2-9-89A/B"],
    earthsClose: ["2-9-89LE2/2-9-89LE1", "2-9-89AE(if required)"]
  },

  // Specific mapping for Gachibowli-1
  "220KV GACHIBOWLI-1": {
    breakersOpen: ["2-10-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-10-89L", "2-10-89A/B"],
    earthsClose: ["2-10-89LE2/2-10-89LE1", "2-10-89AE(if required)"]
  },

  // Specific mapping for Gachibowli-2
  "220KV GACHIBOWLI-2": {
    breakersOpen: ["2-11-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-11-89L", "2-11-89A/B"],
    earthsClose: ["2-11-89LE2/2-11-89LE1", "2-11-89AE(if required)"]
  },

  // Specific mapping for Kethireddypally
  "220KV KETHIREDDYPALLY": {
    breakersOpen: ["2-12-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-12-89L", "2-12-89A/B"],
    earthsClose: ["2-12-89LE2/2-12-89LE1", "2-12-89AE(if required)"]
  },

  // Specific mapping for Yeddumailaram-1
  "220KV YEDDUMAILARAM-1": {
    breakersOpen: ["2-13-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-13-89L", "2-13-89A/B"],
    earthsClose: ["2-13-89LE2/2-13-89LE1", "2-13-89AE(if required)"]
  },

  // Specific mapping for Yeddumailaram-2
  "220KV YEDDUMAILARAM-2": {
    breakersOpen: ["2-14-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-14-89L", "2-14-89A/B"],
    earthsClose: ["2-14-89LE2/2-14-89LE1", "2-14-89AE(if required)"]
  },

  // Specific mapping for Sadasivapet-1
  "220KV SADASIVAPET-1": {
    breakersOpen: ["2-15-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-15-89L", "2-15-89A/B"],
    earthsClose: ["2-15-89LE2/2-15-89LE1", "2-15-89AE(if required)"]
  },

  // Specific mapping for Sadasivapet-2
  "220KV SADASIVAPET-2": {
    breakersOpen: ["2-16-52"],
    otherEndCheck: "Ensure other end breaker is opened",
    isolatorsOpen: ["2-16-89L", "2-16-89A/B"],
    earthsClose: ["2-16-89LE2/2-16-89LE1", "2-16-89AE(if required)"]
  },

  // Generic default for 220KV feeders
  "default220KV": {
    breakersOpen: ["BREAKER-220"],
    otherEndCheck: "Ensure other end breakers (Line & TIE) are opened",
    isolatorsOpen: ["ISOLATOR-L", "ISOLATOR-A/B"],
    earthsClose: ["EARTH-LE", "EARTH-AE"]
  }
};


/**
 * Specific device mappings for ICTs.
 */
export const ICT_DEVICE_MAP = {
  "315MVA ICT-1": {
    primaryBreaker: "2-3-52",
    autoBreakers: ["4-2-52", "4-3-52"],
    isolators: ["4-3-89T", "4-3-89A(if required)", "4-2-89B(if required)", "2-3-89T", "2-3-89A/B(if required)"],
    earthSwitches: ["2-3-89TE2", "4-3-89TE"],
    hvBreaker: "4-3-52",
    tieBreaker: "4-2-52"
  },
  "315MVA ICT-2": {
    primaryBreaker: "2-6-52",
    autoBreakers: ["4-8-52", "4-9-52"],
    isolators: ["4-9-89T", "4-9-89A(if required)", "4-8-89B(if required)", "2-6-89T", "2-6-89A/B(if required)"],
    earthSwitches: ["2-6-89TE2", "4-9-89TE"],
    hvBreaker: "4-9-52",
    tieBreaker: "4-8-52"
  },
  "315MVA ICT-3": {
    primaryBreaker: "2-8-52",
    autoBreakers: ["4-11-52", "4-12-52"],
    isolators: ["4-12-89T", "4-12-89A(if required)", "4-11-89B(if required)", "2-8-89T", "2-8-89A/B(if required)"],
    earthSwitches: ["2-8-89TE2", "4-12-89TE"],
    hvBreaker: "4-12-52",
    tieBreaker: "4-11-52"
  },
  "500MVA ICT-4": {
    primaryBreaker: "2-5-52",
    autoBreakers: ["4-5-52", "4-6-52"],
    isolators: ["4-6-89T", "4-6-89A(if required)", "4-5-89B(if required)", "2-5-89T", "2-5-89A/B(if required)"],
    earthSwitches: ["2-5-89TE2", "4-6-89TE"],
    hvBreaker: "4-6-52",
    tieBreaker: "4-5-52"
  }
};

/**
 * Build LC steps for a 400KV feeder: breaker -> other-end check -> isolators -> earths -> permit.
 */
export function buildLCSteps400KV(feederName) {
  const map = FEEDER_DEVICE_MAP[feederName] || FEEDER_DEVICE_MAP["default400KV"];

  return [
    { id: "plan", label: `Receive LC request(from concerned official) & identify equipment for ${feederName}`, required: true },
    { id: "inform", label: `Inform to the ${feederName} end about LC`, required: true },
    { id: "inform-sldc", label: `Inform SLDC about LC & get shutdown permission with Opening Code`, required: true },

    // Breaker opening step — expands listed breakers
    {
      id: "breaker-open",
      label: `Open breakers: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    // Other end confirmation
    {
      id: "other-end-check",
      label: `${map.otherEndCheck}`,
      required: true
    },

    // Isolators opening (5 isolators expected)
    {
      id: "isolators-open",
      label: `Open isolators: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Earth close (in LC they asked earth switches closing process)
    {
      id: "earth-close",
      label: `Close earth switches: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    { id: "issue-lc", label: `Issue Line Clearance permit for ${feederName} with LC Number to the Concerned Official`, required: true },
    { id: "inform-sldc-issued", label: `Inform to SLDC about Issued LC with Breaker Opening Time`, required: true },
    { id: "success", label: `Congratulations, your Issued LC on ${feederName} successfully!!`, required: true, animation: true }
  ];
}

/**
 * Build NBFC steps for a 400KV feeder: reverse -> earths open -> isolators close -> breakers close.
 */
export function buildNBFCSteps400KV(feederName) {
  const map = FEEDER_DEVICE_MAP[feederName] || FEEDER_DEVICE_MAP["default400KV"];

  return [
    { id: "receive-nbfc", label: `Receive NBFC request for ${feederName}`, required: true },
    { id: "confirm-work", label: `Confirm all work completed & safe to energize`, required: true },

    // Earths opening (reverse of LC earth close)
    {
      id: "earth-open",
      label: `Open earth switches: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    // Isolators close step
    {
      id: "isolators-close",
      label: `Close isolators: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Breakers close step
    {
      id: "breaker-close",
      label: `Close breakers: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    { id: "inform-sldc-nbfc", label: `Inform SLDC about restoration`, required: true },
    { id: "declare-service", label: `Declare ${feederName} back in service`, required: true }
  ];
}

/**
 * Build LC Returning steps for a 400KV feeder: receive return -> verify completion -> remove safety -> restore equipment.
 */
export function buildLCReturningSteps400KV(feederName) {
  const map = FEEDER_DEVICE_MAP[feederName] || FEEDER_DEVICE_MAP["default400KV"];

  return [
    { id: "receive-return", label: `Receive LC return request for ${feederName} from the Concerned Official`, required: true },
    { id: "take-return-code", label: `Take the LC Closing code from SLDC`, required: true },
    { id: "verify-work", label: `Verify all maintenance work completed safely`, required: true },
    { id: "inspect-equipment", label: `Inspect equipment condition before restoration`, required: true },

    // Earth switches opening (reverse of LC earth close)
    {
      id: "earth-open",
      label: `Open earth switches: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    // Isolators closing (reverse of LC isolators open)
    {
      id: "isolators-close",
      label: `Close isolators: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Breakers closing (reverse of LC breakers open)
    {
      id: "breaker-close",
      label: `Close breakers: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    { id: "test-protection", label: `Test protection systems and alarms`, required: true },
    { id: "inform-sldc-return", label: `Inform SLDC about LC return completion`, required: true },
    { id: "declare-service", label: `Declare ${feederName} back in service`, required: true }
  ];
}

/**
 * Build NBFC Returning steps for a 400KV feeder: receive return -> safety checks -> document completion.
 */
export function buildNBFCReturningSteps400KV(feederName) {
  return [
    { id: "receive-nbfc-return", label: `Receive NBFC return request for ${feederName}`, required: true },
    { id: "verify-restoration", label: `Verify equipment successfully restored to service`, required: true },
    { id: "check-parameters", label: `Check electrical parameters and system stability`, required: true },
    { id: "update-records", label: `Update maintenance and operational records`, required: true },
    { id: "confirm-normal", label: `Confirm ${feederName} operating under normal conditions`, required: true },
    { id: "close-nbfc", label: `Close NBFC procedure and file documentation`, required: true }
  ];
}


/**
 * Build LC steps for a 220KV feeder: breaker -> other-end check -> isolators -> earths -> permit.
 */
export function buildLCSteps220KV(feederName) {
  const map = FEEDER_DEVICE_MAP_220KV[feederName] || FEEDER_DEVICE_MAP_220KV["default220KV"];

  return [
    { id: "plan", label: `Receive LC request(from concerned official) & identify equipment for ${feederName}`, required: true },
    { id: "inform", label: `Inform to the ${feederName} end about LC`, required: true },
    { id: "inform-sldc", label: `Inform SLDC about LC & get shutdown permission with Opening Code`, required: true },

    // Breaker opening step — expands listed breakers
    {
      id: "breaker-open",
      label: `Open breaker: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    // Other end confirmation
    {
      id: "other-end-check",
      label: `${map.otherEndCheck}`,
      required: true
    },

    // Isolators opening
    {
      id: "isolators-open",
      label: `Open isolators: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Take NBFC from feeder end
    {
      id: "take-nbfc",
      label: `Take the NBFC From the ${feederName} end with NBFC Number`,
      required: true
    },

    // Earth close
    {
      id: "earth-close",
      label: `Close earth switches: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    { id: "issue-lc", label: `Issue Line Clearance permit for ${feederName} with LC Number to the Concerned Official`, required: true },
    { id: "inform-sldc-issued", label: `Inform to SLDC about Issued LC with Breaker Opening Time`, required: true },
    { id: "success", label: `Congratulations, your Issued LC on ${feederName} successfully!!`, required: true, animation: true }
  ];
}

export function buildNBFCSteps220KV(feederName) {
  const map = FEEDER_DEVICE_MAP_220KV[feederName] || FEEDER_DEVICE_MAP_220KV["default220KV"];

  return [
    { id: "receive-nbfc", label: `Receive NBFC Issue request from ${feederName} end`, required: true },
    { id: "take-opening-code", label: `Take the Opening Code from ${feederName} end & Confirm with SLDC`, required: true },

    // Opening the breakers
    {
      id: "breaker-open",
      label: `Open the breaker: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    { id: "ensure-feeder-breaker-open", label: `Ensure that ${feederName} end Breaker opened`, required: true },
    { id: "check-voltages-zero", label: `Make sure that Voltages become "0"`, required: true },
    { id: "ensure-feeder-isolator-open", label: `Ensure that ${feederName} end opened Line Isolator`, required: true },

    // Open Line Isolator
    {
      id: "isolators-open",
      label: `Open Line Isolator: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Close earth switch
    {
      id: "earth-close",
      label: `Close earth switch: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    { id: "issue-nbfc", label: `Issue NBFC to ${feederName} end with NBFC Number`, required: true },
    { id: "success", label: `Congratulations, Your issued NBFC on ${feederName} successfully!!`, required: true, animation: true }
  ];
}

export function buildLCReturningSteps220KV(feederName) {
  const map = FEEDER_DEVICE_MAP_220KV[feederName] || FEEDER_DEVICE_MAP_220KV["default220KV"];

  return [
    { id: "receive-return", label: `Receive LC return request for ${feederName} from the Concerned Official`, required: true },
    { id: "take-return-code", label: `Take the LC Closing code from SLDC`, required: true },
    { id: "verify-work", label: `Verify all maintenance work completed safely`, required: true },
    { id: "inspect-equipment", label: `Inspect equipment condition before restoration`, required: true },

    // Earth switches opening (reverse of LC earth close)
    {
      id: "earth-open",
      label: `Open earth switches: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    // Return NBFC to feeder end
    {
      id: "return-nbfc",
      label: `Return NBFC to the ${feederName} end`,
      required: true
    },

    // Ensure feeder end actions completed
    {
      id: "ensure-feeder-actions",
      label: `Ensure that ${feederName} opened Earth switches and Closed Isolator`,
      required: true
    },

    // Isolators closing (reverse of LC isolators open)
    {
      id: "isolators-close",
      label: `Close isolators: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    // Breakers closing (reverse of LC breakers open)
    {
      id: "breaker-close",
      label: `Close breaker: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    // Ensure breaker is closed
    {
      id: "ensure-breaker-closed",
      label: `Ensure that ${feederName} breaker closed`,
      required: true
    },

    { id: "test-protection", label: `Test protection systems and alarms`, required: true },
    { id: "inform-sldc-return", label: `Inform SLDC about LC return completion`, required: true },
    { id: "declare-service", label: `Declare ${feederName} back in service`, required: true }
  ];
}

export function buildNBFCReturningSteps220KV(feederName) {
  const map = FEEDER_DEVICE_MAP_220KV[feederName] || FEEDER_DEVICE_MAP_220KV["default220KV"];

  return [
    { id: "receive-nbfc-return", label: `Receive NBFC return request from ${feederName} end with NBFC Number Confirmation`, required: true },
    { id: "ensure-feeder-earth-open", label: `Ensure that ${feederName} Opened Line Earth Switch`, required: true },

    // Open Earth Switch
    {
      id: "earth-open",
      label: `Open Earth Switch: ${map.earthsClose.join(", ")}`,
      detail: map.earthsClose,
      required: true
    },

    // Close Line Isolator
    {
      id: "isolators-close",
      label: `Close Line Isolator: ${map.isolatorsOpen.join(", ")}`,
      detail: map.isolatorsOpen,
      required: true
    },

    { id: "inform-feeder-actions", label: `Inform to ${feederName} end about our end Earth switch opened & Line Isolator Closed`, required: true },
    { id: "ensure-feeder-isolator-closed", label: `Ensure that ${feederName} closed Line Isolator`, required: true },
    { id: "take-closing-code", label: `Take the Closing Code from ${feederName} end & Confirm with SLDC`, required: true },
    { id: "confirm-work-completed", label: `Confirm all work completed & safe to energize`, required: true },
    { id: "ensure-feeder-breaker-closed", label: `Ensure that ${feederName} closed Breaker`, required: true },

    // Close Breaker
    {
      id: "breaker-close",
      label: `Close Breaker: ${map.breakersOpen.join(", ")}`,
      detail: map.breakersOpen,
      required: true
    },

    { id: "check-loads-voltages", label: `Ensure the Loads and Voltages in all 3-phases`, required: true },
    { id: "success", label: `Congratulations, Your Returned NBFC on ${feederName} successfully!!`, required: true, animation: true }
  ];
}

/**
 * Generic LC/NBFC for ICTs
 */
export function buildLCStepsICT(feederName) {
  const map = ICT_DEVICE_MAP[feederName];
  if (!map) {
    // Fallback for unknown ICTs
    return [
      { id: "receive", label: `Receive LC Issue request from the Concerned official`, required: true },
      { id: "take-opening-code", label: `Take the Opening Code from the SLDC`, required: true },
      { id: "breaker-open", label: `Open HV breaker(s) for ${feederName}`, required: true },
      { id: "isolators-open", label: `Open HV isolators for ${feederName}`, required: true },
      { id: "earth-close", label: `Close HV earth switch(es) for ${feederName}`, required: true },
      { id: "issue-lc", label: `Issue Line Clearance permit for ${feederName} with LC Number to the Concerned Official`, required: true },
      { id: "inform-sldc-issued", label: `Inform to SLDC about Issued LC with Breaker Opening Time`, required: true },
      { id: "success", label: `Congratulations, your Issued LC on ${feederName} successfully!!`, required: true, animation: true }
    ];
  }

  return [
    { id: "receive", label: `Receive LC Issue request from the Concerned official`, required: true },
    { id: "take-opening-code", label: `Take the Opening Code from the SLDC`, required: true },
    { id: "breaker-open", label: `Open ${map.primaryBreaker} breaker`, required: true },
    { id: "ensure-auto-breakers", label: `Ensure that ${map.autoBreakers.join(" & ")} Breakers opened automatically`, required: true },
    
    // Open Isolators
    {
      id: "isolators-open",
      label: `Open Isolators`,
      detail: map.isolators,
      required: true
    },

    // Close Earth Switches
    {
      id: "earth-close",
      label: `Close Earth Switches`,
      detail: map.earthSwitches,
      required: true
    },

    { id: "issue-lc", label: `Issue Line Clearance permit for ${feederName} with LC Number to the Concerned Official`, required: true },
    { id: "inform-sldc-issued", label: `Inform to SLDC about Issued LC with Breaker Opening Time`, required: true },
    { id: "success", label: `Congratulations, your Issued LC on ${feederName} successfully!!`, required: true, animation: true }
  ];
}

export function buildLCReturningStepsICT(feederName) {
  const map = ICT_DEVICE_MAP[feederName];
  if (!map) {
    // Fallback for unknown ICTs
    return [
      { id: "receive-return", label: `Receive LC return request from the Concerned official`, required: true },
      { id: "verify-work", label: `Verify all maintenance work completed safely`, required: true },
      { id: "inspect-equipment", label: `Inspect equipment condition before restoration`, required: true },
      { id: "earth-open", label: `Open HV earth switch(es) for ${feederName}`, required: true },
      { id: "isolators-close", label: `Close HV isolators for ${feederName}`, required: true },
      { id: "take-closing-code", label: `Take the LC Closing code from SLDC`, required: true },
      { id: "breaker-close", label: `Close HV breaker(s) for ${feederName}`, required: true },
      { id: "test-protection", label: `Test protection systems and alarms`, required: true },
      { id: "inform-sldc-return", label: `Inform SLDC about LC return completion`, required: true },
      { id: "declare-service", label: `Declare ${feederName} back in service`, required: true }
    ];
  }

  return [
    { id: "receive-return", label: `Receive LC return request from the Concerned official`, required: true },
    { id: "verify-work", label: `Verify all maintenance work completed safely`, required: true },
    { id: "inspect-equipment", label: `Inspect equipment condition before restoration`, required: true },
    
    // Open Earth Switches
    {
      id: "earth-open",
      label: `Open Earth Switches`,
      detail: map.earthSwitches,
      required: true
    },

    // Close Isolators
    {
      id: "isolators-close",
      label: `Close Isolators`,
      detail: map.isolators,
      required: true
    },

    { id: "take-closing-code", label: `Take the LC Closing code from SLDC`, required: true },
    { id: "hv-breaker-close", label: `Close Breaker ${map.hvBreaker}(HV Breaker)`, required: true },
    { id: "check-currents", label: `Ensure that Initial Currents become less(less than 2Amps) in OWS`, required: true },
    { id: "tie-breaker-close", label: `Close Breaker ${map.tieBreaker}(TIE Breaker)`, required: true },
    { id: "wait-2min", label: `Kindly Wait for 2Minutes`, required: true },
    { id: "primary-breaker-close", label: `Close ${map.primaryBreaker} Breaker`, required: true },
    { id: "test-protection", label: `Test protection systems and alarms`, required: true },
    { id: "inform-sldc-return", label: `Inform SLDC about LC return completion`, required: true },
    { id: "declare-service", label: `Declare ${feederName} back in service`, required: true }
  ];
}

export function buildNBFCStepsICT(feederName) {
  return [
    { id: "receive-nbfc", label: `Receive NBFC request for ${feederName}`, required: true },
    { id: "confirm", label: `Confirm work completion`, required: true },
    { id: "earth-open", label: `Open HV earth switch(es) for ${feederName}`, required: true },
    { id: "isolators-close", label: `Close HV isolators for ${feederName}`, required: true },
    { id: "breaker-close", label: `Close HV breaker(s) for ${feederName}`, required: true },
    { id: "inform-sldc", label: `Inform SLDC about restoration`, required: true }
  ];
}

export function buildNBFCReturningStepsICT(feederName) {
  return [
    { id: "receive-nbfc-return", label: `Receive NBFC return request for ${feederName}`, required: true },
    { id: "verify-restoration", label: `Verify equipment successfully restored to service`, required: true },
    { id: "check-parameters", label: `Check electrical parameters and system stability`, required: true },
    { id: "update-records", label: `Update maintenance and operational records`, required: true },
    { id: "confirm-normal", label: `Confirm ${feederName} operating under normal conditions`, required: true },
    { id: "close-nbfc", label: `Close NBFC procedure and file documentation`, required: true }
  ];
}




/**
 * Top-level helper to get steps based on voltage group, feeder and procedure type.
 * Returns an array of step objects: { id, label, required, detail? }
 */
export function getStepsFor(feederVoltageGroup, feederName, procedureType) {
  // procedureType is "LC", "NBFC", "LC_RETURN", or "NBFC_RETURN"
  if (feederVoltageGroup === "400KV") {
    if (procedureType === "LC") return buildLCSteps400KV(feederName);
    if (procedureType === "NBFC") return buildNBFCSteps400KV(feederName);
    if (procedureType === "LC_RETURN") return buildLCReturningSteps400KV(feederName);
    if (procedureType === "NBFC_RETURN") return buildNBFCReturningSteps400KV(feederName);
  }

  if (feederVoltageGroup === "220KV") {
    if (procedureType === "LC") return buildLCSteps220KV(feederName);
    if (procedureType === "NBFC") return buildNBFCSteps220KV(feederName);
    if (procedureType === "LC_RETURN") return buildLCReturningSteps220KV(feederName);
    if (procedureType === "NBFC_RETURN") return buildNBFCReturningSteps220KV(feederName);
  }

  // ICTs
  if (feederVoltageGroup === "ICTs") {
    if (procedureType === "LC") return buildLCStepsICT(feederName);
    if (procedureType === "NBFC") return buildNBFCStepsICT(feederName);
    if (procedureType === "LC_RETURN") return buildLCReturningStepsICT(feederName);
    if (procedureType === "NBFC_RETURN") return buildNBFCReturningStepsICT(feederName);
  }

  // fallback
  return procedureType === "LC"
    ? [{ id: "plan", label: `Plan for ${feederName}`, required: true }, { id: "issue-lc", label: "Issue LC", required: true }]
    : [{ id: "receive-nbfc", label: `Receive NBFC for ${feederName}`, required: true }, { id: "declare", label: "Declare service", required: true }];
}
