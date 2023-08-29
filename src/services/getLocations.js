import axios from "axios";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search?";

const getLocations = async (input) => {
	if (input) {
		const { data } = await axios.get(BASE_URL + "name=" + input);
		return data.results;
	}
};

export default getLocations;
