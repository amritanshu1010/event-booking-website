import axios from "axios";

const API_URL =
  "https://event-booking-website-kj57.onrender.com";

export const createBooking = async (
  bookingData
) => {
  const response = await axios.post(
    API_URL,
    bookingData
  );

  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(
    API_URL
  );

  return response.data;
};