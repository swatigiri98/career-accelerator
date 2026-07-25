/**
 * LLMs occasionally wrap JSON responses in markdown code fences even when
 * explicitly told not to. This strips fences before parsing and throws a
 * descriptive error if the result still isn't valid JSON, rather than
 * letting a cryptic SyntaxError bubble up from deep in a service call.
 */
export function parseAIJson(rawText) {
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Failed to parse AI response as JSON: ${err.message}`);
  }
}
