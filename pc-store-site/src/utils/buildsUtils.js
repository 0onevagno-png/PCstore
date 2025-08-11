import { amdBuilds } from "../data/amdBuilds";

// Эмуляция чтения
export const getAmdBuilds = () => {
  return [...amdBuilds]; // возвращаем копию
};

// Эмуляция сохранения
export const saveAmdBuilds = (newBuilds) => {
  console.log("Сохраняем сборки:", newBuilds);
};
