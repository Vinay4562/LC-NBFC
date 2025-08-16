// Test script to verify new LC/NBFC returning processes
import { getStepsFor, FEEDER_GROUPS } from './src/data.js';

console.log('Testing new LC/NBFC Returning processes...\n');

// Test 400KV feeder
const feeder400 = "400KV MAHESHWARAM-2";
console.log(`=== Testing ${feeder400} ===`);

console.log('\n1. LC Issue Steps:');
const lcSteps = getStepsFor("400KV", feeder400, "LC");
lcSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n2. NBFC Issue Steps:');
const nbfcSteps = getStepsFor("400KV", feeder400, "NBFC");
nbfcSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n3. LC Return Steps:');
const lcReturnSteps = getStepsFor("400KV", feeder400, "LC_RETURN");
lcReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n4. NBFC Return Steps:');
const nbfcReturnSteps = getStepsFor("400KV", feeder400, "NBFC_RETURN");
nbfcReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

// Test 220KV feeder
const feeder220 = "220KV PARIGI-1";
console.log(`\n\n=== Testing ${feeder220} ===`);

console.log('\n1. LC Return Steps:');
const lc220ReturnSteps = getStepsFor("220KV", feeder220, "LC_RETURN");
lc220ReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n2. NBFC Return Steps:');
const nbfc220ReturnSteps = getStepsFor("220KV", feeder220, "NBFC_RETURN");
nbfc220ReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

// Test ICT
const ict = "315MVA ICT-1";
console.log(`\n\n=== Testing ${ict} ===`);

console.log('\n1. LC Return Steps:');
const lcICTReturnSteps = getStepsFor("ICTs", ict, "LC_RETURN");
lcICTReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n2. NBFC Return Steps:');
const nbfcICTReturnSteps = getStepsFor("ICTs", ict, "NBFC_RETURN");
nbfcICTReturnSteps.forEach((step, i) => console.log(`  ${i+1}. ${step.label}`));

console.log('\n✅ All tests completed successfully!');