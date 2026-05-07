import fs from "fs";
import path from "path";
import { RULES } from "../src/rules";

const readmePath = path.resolve("README.md");

const START = "<!-- AUTO-GENERATED-START -->";
const END = "<!-- AUTO-GENERATED-END -->";

const fieldDescriptions: Record<string, string> = {
  name: "Full name validation (min/max length, no special characters)",
  username: "Username validation (alphanumeric, underscores allowed)",
  email: "Email format validation (RFC-compliant)",
  password:
    "Strong password (min 8 chars, uppercase, number, special char)",
  phone: "International phone number validation (E.164 format)",
  url: "URL format validation (http/https required)",
  street: "Street address validation",
  city: "City name validation",
  state: "State or province validation",
  postalCode: "Postal/ZIP code validation",
  creditCard: "Credit card number validation (Luhn algorithm)",
  cvv: "CVV/CVC validation (3–4 digits)",
  date: "Date format validation (YYYY-MM-DD)",
  time: "Time format validation (HH:MM or HH:MM:SS)",
  active: "Boolean active/inactive status validation",
  avatar: "Image validation (URL format, MIME type, size limits)",
};

const categories: Record<string, string[]> = {
  Identity: ["name", "username", "email", "password"],
  Contact: ["phone", "url"],
  Address: ["street", "city", "state", "postalCode"],
  Finance: ["creditCard", "cvv"],
  System: ["date", "time", "active"],
  Media: ["avatar"],
};

function auditRules(): void {
  const allCategorized = Object.values(categories).flat();
  const ruleKeys = Object.keys(RULES);

  for (const key of ruleKeys) {
    if (!allCategorized.includes(key)) {
      console.warn(
        `⚠️ Rule "${key}" is in RULES but has no category. Add it to categories.`
      );
    }

    if (!fieldDescriptions[key]) {
      console.warn(
        `⚠️ Rule "${key}" has no description. Add it to fieldDescriptions.`
      );
    }
  }
}

function buildTable(fields: string[]): string {
  const header = `| Field | Description |
|-------|-------------|`;

  const rows = fields
    .map((field) => {
      const description =
        fieldDescriptions[field] ?? "Standard validation rule";

      return `| \`${field}\` | ${description} |`;
    })
    .join("\n");

  return `${header}\n${rows}`;
}

function buildSections(): string {
  return Object.entries(categories)
    .map(([title, fields]) => {
      return `### ${title}

${buildTable(fields)}
`;
    })
    .join("\n");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateReadme(): void {
  if (!fs.existsSync(readmePath)) {
    console.error("❌ README.md not found");
    process.exit(1);
  }

  const readme = fs.readFileSync(readmePath, "utf-8");

  if (!readme.includes(START) || !readme.includes(END)) {
    console.error("❌ Could not find injection markers in README.md");
    console.error("Make sure these exist:");
    console.error(START);
    console.error(END);
    process.exit(1);
  }

  auditRules();

  const generatedBlock = `
## Supported Fields

${buildSections()}
`;

  const escapedStart = escapeRegex(START);
  const escapedEnd = escapeRegex(END);

  const regex = new RegExp(
    `${escapedStart}[\\s\\S]*?${escapedEnd}`,
    "g"
  );

  const replacement = `${START}

${generatedBlock}

${END}`;

  const updated = readme.replace(regex, replacement);

  fs.writeFileSync(readmePath, updated, "utf-8");

  console.log("✅ README.md updated successfully");
}

updateReadme();