export function splitMapTrimArray(value: string): string[] {
  return value.split(",").map(v => v.trim());
}

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const joinWithHyphen = (x: string, sep = " ") => x.split(sep).join("-");

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatPathname(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const capitalized = parts.map(capitalizeFirstLetter);
  return capitalized.join("/");
}
