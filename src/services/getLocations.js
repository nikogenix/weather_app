import axios from "axios";

const URL = "https://geocoding-api.open-meteo.com/v1/search?";

const getLocations = async (input) => {
	if (input) {
		const { data } = await axios.get(URL + "name=" + input);
		console.log(data.results);
		return data.results;
	}
};

export default getLocations;
