import axios from "axios";
import {DATA_URL} from "./constants";

export default class ApiService {

  static async getPlayers(): Promise<Array<any>> {
    const response = await axios.get(DATA_URL);
    return response.data.players;
  }
}

