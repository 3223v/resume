import fs from "node:fs";
import path from "node:path";

const dataPath = path.join(process.cwd(), "backend", "data", "resume.json");

export function getResumeData() {
  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file);
}

export function getProjectBySlug(slug) {
  return getResumeData().projects.find((project) => project.slug === slug);
}

export function getArticleBySlug(slug) {
  return getResumeData().articles.find((article) => article.slug === slug);
}
