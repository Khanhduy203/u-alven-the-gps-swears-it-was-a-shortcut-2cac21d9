import { mkdirSync, writeFileSync } from "node:fs";

// The GPS's one-line excuse for sending the driver down the wrong road.
const ENTRY =
  "The map promised me a shortcut and delivered a cul-de-sac full of a wedding \u2014 I stand by the map, not the bride.";

// Runtime guard: single line, 1-200 chars, not only whitespace.
// Also enforces the task rules: no leading/trailing whitespace, no
// control characters, and no "recalculating" cliché.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  throw new Error("entry must not contain control characters");
}
if (/recalculating/i.test(ENTRY)) {
  throw new Error('entry must not use the "recalculating" cliché');
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
