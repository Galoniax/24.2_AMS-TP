
const KEY: string = "TOKEN_YENNY";

export const saveLs = (value: any) => {
  localStorage.setItem(KEY, JSON.stringify(value));
};

export const getFromLs = () => {
  const value = localStorage.getItem(KEY);
  return value ? JSON.parse(value) : null;
}

export const removeLs = () => {
  localStorage.removeItem(KEY);
}
