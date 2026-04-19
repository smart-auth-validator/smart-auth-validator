import fs from "fs";
import path from "path";
import { RULES } from "../src/rules";

const readmePath = path.resolve("README.md");

const START = "<!-- AUTO-GENERATED-START -->";
const END   = "<!-- AUTO-GENERATED-END -->";

const fieldDescriptions: Record<string, string> = {
  name:       "Full name validation (min/max length, no special characters)",
  username:   "Username validation (alphanumeric, underscores allowed)",
  email:      "Email format validation (RFC-compliant)",
  password:   "Strong password (min 8 chars, uppercase, number, special char)",
  phone:      "International phone number validation (E.164 format)",
  url:        "URL format validation (http/https required)",
  street:     "Street address validation",
  city:       "City name validation",
  state:      "State or province validation",
  postalCode: "Postal/ZIP code validation",
  creditCard: "Credit card number validation (Luhn algorithm)",
  cvv:        "CVV/CVC validation (3–4 digits)",
  date:       "Date format validation (YYYY-MM-DD)",
  time:       "Time format validation (HH:MM or HH:MM:SS)",
  active:     "Boolean active/inactive status validation",
  avatar:     "Image validation (URL format, MIME type, size limits)",
};

const categories: Record<string, string[]> = {
  Identity: ["name", "username", "email", "password"],
  Contact:  ["phone", "url"],
  Address:  ["street", "city", "state", "postalCode"],
  Finance:  ["creditCard", "cvv"],
  System:   ["date", "time", "active"],
  Media:    ["avatar"],
};

function auditRules(): void {
  const allCategorized = Object.values(categories).flat();
  const ruleKeys = Object.keys(RULES);

  for (const key of ruleKeys) {
    if (!allCategorized.includes(key)) {
      console.warn(`⚠️  Rule "${key}" is in RULES but has no category. Add it to categories.`);
    }
    if (!fieldDescriptions[key]) {
      console.warn(`⚠️  Rule "${key}" has no description. Add it to fieldDescriptions.`);
    }
  }
}

function buildTable(fields: string[]): string {
  const header = `| Field | Description |\n|-------|-------------|`;

  const rows = fields
    .map((field) => {
      const description = fieldDescriptions[field] ?? "Standard validation rule";
      return `| \`${field}\` | ${description} |`;
    })
    .join("\n");

  return `${header}\n${rows}`;
}

function buildSections(): string {
  return Object.entries(categories)
    .map(([title, fields]) => {
      return `### ${title}\n\n${buildTable(fields)}\n`;
    })
    .join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function updateReadme(): void {
  const readme = fs.readFileSync(readmePath, "utf-8");

  if (!readme.includes(START) || !readme.includes(END)) {
    console.error(`❌ Could not find injection markers in README.md`);
    console.error(`   Make sure both of these exist in your README:`);
    console.error(`   ${START}`);
    console.error(`   ${END}`);
    process.exit(1);
  }

  auditRules();

  const generatedBlock = `\n### 📦 Supported Fields\n\n${buildSections()}`;

  const updated = readme.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`),
    `${START}\n${generatedBlock}\n${END}`
  );

  fs.writeFileSync(readmePath, updated, "utf-8");
  console.log("✅ README.md updated successfully");
}

updateReadme();