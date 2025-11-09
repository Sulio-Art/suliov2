// src/app/Components/ui/colorPalette.jsx

const stringToHash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

export const getDeterministicColor = (name) => {
  if (name === "Other Countries") {
    return "hsl(220, 8%, 50%)";
  }

  const hash = stringToHash(name);
  const goldenRatio = 0.618033988749895;
  const hue = Math.floor((Math.abs(hash) * goldenRatio * 360) % 360);
  const saturation = 60 + (Math.abs(hash >> 8) % 21);
  const lightness = 40 + (Math.abs(hash >> 16) % 16);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getDeterministicColorWithContrast = (name) => {
  const bgColor = getDeterministicColor(name);
  const lightnessMatch = bgColor.match(/(\d+)%\)$/);
  const lightness = lightnessMatch ? parseInt(lightnessMatch[1]) : 45;
  const textColor = lightness < 50 ? "#ffffff" : "#1f2937";

  return {
    backgroundColor: bgColor,
    textColor: textColor,
  };
};

export const getLightCountryColor = (name, lightnessIncrease = 30) => {
  const baseColor = getDeterministicColor(name);
  const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);

  if (!match) return baseColor;

  const [, hue, saturation, lightness] = match;
  const newLightness = Math.min(95, parseInt(lightness) + lightnessIncrease);

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};
