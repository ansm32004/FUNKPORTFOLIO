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
    const parsed = JSON.parse(raw.trim());
    return {
      "employee-dash": parsed["employee-dash"] !== false,
      "govt-election": parsed["govt-election"] !== false,
      "vammy": parsed["vammy"] !== false,
    };
  } catch {
    // If file doesn't exist or is corrupted, reset to defaults
    const fallback = { ...DEFAULT_VISIBILITY };
    await saveVisibility(fallback);
    return fallback;
  }
}

/**
 * Saves entire visibility object to disk
 */
export async function saveVisibility(visibilityData) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    const cleanData = {
      "employee-dash": visibilityData["employee-dash"] !== false,
      "govt-election": visibilityData["govt-election"] !== false,
      "vammy": visibilityData["vammy"] !== false,
    };
    await fs.writeFile(
      DATA_FILE_PATH,
      JSON.stringify(cleanData, null, 2) + "\n",
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
  const updated = {
    ...current,
    [slug]: Boolean(isVisible),
  };
  await saveVisibility(updated);
  return updated;
}
