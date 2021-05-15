export function getAssociatedImage(meteoIcon: string) {
  const light: boolean = meteoIcon[meteoIcon.length] === "d";
  const iconId = meteoIcon.slice(0, -1)
  console.log(iconId)
  switch (iconId) {
    case "01":
      return `sunny_${light ? "light" : "dark"}.png`;
    case "02":
      return `cloudy_${light ? "light" : "dark"}.png`;
    case "03":
      return `cloudy_${light ? "light" : "dark"}.png`;
    case "04":
      return `cloudy_${light ? "light" : "dark"}.png`;
    case "09":
      return `raining_${light ? "light" : "dark"}.png`;
    case "10":
      return `raining_${light ? "light" : "dark"}.png`;
    case "11":
      return `storm_${light ? "light" : "dark"}.png`;
    case "13":
      return `snowing_${light ? "light" : "dark"}.png`;
    case "50":
      return `storm_${light ? "light" : "dark"}.png`; // I know it's "mist" but we don't have any assets for that sadly...
    default:
       return `cloudy_${light ? "light" : "dark"}.png`;
  }
}
