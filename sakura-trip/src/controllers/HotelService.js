import axios from "axios";

const HOTEL_API_URL = 'https://back-sakura.herokuapp.com/hoteis'

class HotelService {
  getAllHoteis() {
    return axios.get(HOTEL_API_URL);
  }

  createHotel(hotel) {
    return axios.post(HOTEL_API_URL, hotel);
  }

  getHotelById(hotelId) {
    return axios.get(HOTEL_API_URL + "/" + hotelId);
  }

  updateHotel(hotelId, hotel) {
    return axios.put(HOTEL_API_URL + "/" + hotelId, hotel);
  }

  deleteHotel(hotelId) {
    return axios.delete(HOTEL_API_URL + "/" + hotelId);
  }
}

export default new HotelService();
