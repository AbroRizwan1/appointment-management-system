export const getUnseenCount = (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data.filter((item) => !item.seen).length;
};
// mark all as seen
export const markSeenUtil = (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  const newData = data.map(item => ({ ...item, seen: true }));
  localStorage.setItem(key, JSON.stringify(newData));
};