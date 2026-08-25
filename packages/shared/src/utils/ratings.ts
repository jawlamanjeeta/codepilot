/**
 * Clamps a number to [min, max].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Normalises a raw count to a [0, 100] score using a logarithmic scale.
 * Avoids the score shooting to 100 after just a few solves.
 * @param count  - The raw count (e.g. problems solved in a topic)
 * @param target - The count considered "mastery" (default 50)
 */
export function normaliseVolume(count: number, target = 50): number {
  if (count <= 0) return 0;
  // log scale: score = 100 * log(1 + count) / log(1 + target)
  return clamp(
    (Math.log(1 + count) / Math.log(1 + target)) * 100,
    0,
    100
  );
}

/**
 * Given a user's current rating, returns what rating bracket they're in
 * and the ideal next target rating.
 */
export function getRatingBracket(rating: number): {
  label: string;
  min: number;
  max: number;
  idealTarget: number;
} {
  const brackets = [
    { label: "Newbie",          min: 0,    max: 1199, idealTarget: 1200 },
    { label: "Pupil",           min: 1200, max: 1399, idealTarget: 1400 },
    { label: "Specialist",      min: 1400, max: 1599, idealTarget: 1600 },
    { label: "Expert",          min: 1600, max: 1899, idealTarget: 1900 },
    { label: "Candidate Master",min: 1900, max: 2099, idealTarget: 2100 },
    { label: "Master",          min: 2100, max: 2299, idealTarget: 2300 },
    { label: "International Master", min: 2300, max: 2499, idealTarget: 2500 },
    { label: "Grandmaster",     min: 2500, max: Infinity, idealTarget: 3000 },
  ];
  return brackets.find((b) => rating >= b.min && rating <= b.max) ?? brackets[0];
}

/**
 * Returns a 0–100 "proximity score" for how suitable a problem rating is
 * for a user at a given rating. Peak at +150 above user, falls off sharply
 * outside the comfortable range.
 */
export function ratingProximityScore(
  userRating: number,
  problemRating: number
): number {
  const delta = problemRating - userRating;
  // Ideal delta is +150. Acceptable window: -100 to +400
  if (delta < -100 || delta > 400) return 0;
  if (delta >= 50 && delta <= 250) return 100;
  if (delta < 50) return clamp(((delta + 100) / 150) * 100, 0, 100);
  // delta 250–400: falls off
  return clamp(((400 - delta) / 150) * 100, 0, 100);
}
