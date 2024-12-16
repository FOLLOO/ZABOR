export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token || null;
};

export const removeFromStorage = () => {
  localStorage.clear();
};
