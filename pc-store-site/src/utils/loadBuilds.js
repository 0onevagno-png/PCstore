import { amdBuilds as defaultBuilds } from "../data/amdBuilds";

const STORAGE_KEY = "amdBuilds";

export function getBuilds() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultBuilds;
}

export function saveBuilds(builds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}
