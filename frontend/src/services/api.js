const API_URL = "http://localhost:5204/api/stars";

export const getStars = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addStar = async () => {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST"
  });
  return res.json();
};

export const removeStar = async () => {
  const res = await fetch(`${API_URL}/remove`, {
    method: "POST"
  });
  return res.json();
};