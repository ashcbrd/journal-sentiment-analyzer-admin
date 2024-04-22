function scaleScores(scores: number[]): number {
  const totalScore: number = scores.reduce((acc, curr) => acc + curr.score, 0);
  const scaledScore: number = Math.round((totalScore / scores.length) * 1000);
  return scaledScore;
}
