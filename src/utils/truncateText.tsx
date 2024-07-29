export function truncateText(text: string, maxLength: number): string {
  try {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
  } catch {
    return "";
  }
  return text;
}
