import fs from "fs";
import path from "path";
import { RULES } from "../src/rules";

const categories: Record<string, string[]> = {
  Identity: ["name", "username", "email", "password"],
  Contact: ["phone", "url"],
  Address: ["street", "city", "state", "postalCode"],
  Finance: ["creditCard", "cvv"],
  System: ["date", "time", "active"],
  Media: ["avatar"],
};

function generateTable(fields: string[]) {
  return fields
    .map((field) => {
      const rule = RULES[field];
      const desc =
        field === "avatar"
          ? "Image validation (URL, MIME type, size limits)"
          : "Standard validation rule";

      return `| \`${field}\` | ${desc} |`;
    })
    .join("\n");
}

function generateSection(title: string, fields: string[]) {
  return `### ${title}\n\n| Field | Description |\n|------|-------------|\n${generateTable(fields)}\n`;
}

function generateReadme() {
  const header = `# Supported Fields\n\nThis section is auto-generated from the \`RULES\` object.\n\n`;

  const sections = Object.entries(categories)
    .map(([title, fields]) => generateSection(title, fields))
    .join("\n");

  const footer = `
---

## ⚙️ Note

This file is auto-generated. Do not edit manually.
Run:

\`\`\`bash
npm run generate:readme
\`\`\`
`;

  return header + sections + footer;
}

// Write README
const outputPath = path.resolve("SUPPORTED_FIELDS.md");

fs.writeFileSync(outputPath, generateReadme(), "utf-8");

console.log("README generated successfully → SUPPORTED_FIELDS.md");