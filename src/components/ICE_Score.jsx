const impactValue = ["?", "Small", "Medium", "Large", "Xlarge"];
const confidenceValue = ["?", "Small", "Medium", "Large", "Xlarge"];
const effortValue = ["?", "Xlarge", "Large", "Medium", "Small"];

//  this is the function to calculate the ice score automatically based on impact, confidence and effort value
function iceScoreCalculation(impactVar, confidenceVar, effortVar) {
  const impact = impactValue.indexOf(impactVar);
  const confidence = confidenceValue.indexOf(confidenceVar);
  const effort = effortValue.indexOf(effortVar);

  return impact * confidence * effort;
}

export default iceScoreCalculation;
