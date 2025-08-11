export function getName(field) {
  if (!field) return "Не указано";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    return field.name || "Не указано";
  }
  return "Не указано";
}