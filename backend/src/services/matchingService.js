/**
 * Ranks internships by how well their required skills overlap with the
 * user's extracted skills. Deliberately simple (keyword overlap, not
 * embeddings) - fast, dependency-free, and the reasoning is easy to explain
 * in a demo, which matters more than marginal matching precision here.
 */
export function matchInternships(userSkills, internships) {
  const normalizedUserSkills = new Set(userSkills.map((s) => s.toLowerCase().trim()));

  return internships
    .map((internship) => {
      const required = internship.requiredSkills.map((s) => s.toLowerCase().trim());
      const matchedSkills = required.filter((skill) => normalizedUserSkills.has(skill));
      const missingSkills = required.filter((skill) => !normalizedUserSkills.has(skill));

      const matchScore = required.length === 0 ? 0 : Math.round((matchedSkills.length / required.length) * 100);

      const reasoning =
        missingSkills.length === 0
          ? `${matchScore}% match - you have every required skill for this role.`
          : `${matchScore}% match - missing: ${missingSkills.slice(0, 3).join(", ")}${
              missingSkills.length > 3 ? ", and more" : ""
            }.`;

      return {
        internship,
        matchScore,
        matchedSkills,
        missingSkills,
        reasoning,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
