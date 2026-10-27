import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/visibility.json");

export const DEFAULT_VISIBILITY = {
  "employee-dash": true,
  "govt-election": true,
  "vammy": true,
};

/**
 * Reads visibility state from disk
 */
export async function getVisibility() {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_VISIBILITY, ...parsed };
  } catch {
    // If file doesn't exist yet, write default and return
    await saveVisibility(DEFAULT_VISIBILITY);
    return DEFAULT_VISIBILITY;
  }
}

/**
 * Saves entire visibility object to disk
 */
export async function saveVisibility(visibilityData) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(visibilityData, null, 2),
      "utf8"
    );
    return true;
  } catch (err) {
    console.error("Failed to save visibility data:", err);
    return false;
  }
}

/**
 * Updates visibility for a single case study slug
 */
export async function setCaseStudyVisibility(slug, isVisible) {
  const current = await getVisibility();
  current[slug] = Boolean(isVisible);
  await saveVisibility(current);
  return current;
}

