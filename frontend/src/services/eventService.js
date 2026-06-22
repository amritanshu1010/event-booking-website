import axios from "axios";

const API_URL = "https://event-booking-website-kj57.onrender.com";

export const getFeaturedEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(API_URL);

  return response.data.find(
    (event) => event._id === id
  );
};