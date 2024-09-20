export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isMobileDevice = () =>
  typeof window !== "undefined"
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false;

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    // add toaster here

    return true;
  } catch (error) {
    // add toaster here

    return false;
  }
};
