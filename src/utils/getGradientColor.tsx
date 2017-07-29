export default function getGradientColor(color1:number[], color2:number[], weight:number) {
  if (weight < 0) {
    weight = 0;
  } else if (weight > 1) {
    weight = 1;
  }
  const w1 = 1 - weight;
  const w2 = weight;

  const n = Math.min(color1.length, color2.length);
  let resultColor:number[] = [];
  for (let i = 0; i < n; i++) {
    resultColor[i] = Math.round(w1 * color1[i] + w2 * color2[i]);
  }
  return resultColor;
}
