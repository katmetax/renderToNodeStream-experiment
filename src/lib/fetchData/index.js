import axios from "axios";

const url = "https://rickandmortyapi.com/api/character";

const fetchData = () => {
  return axios
    .get(url)
    .then(function (response) {
      return response.data.results;
    })
    .catch(function (error) {
      throw error;
    });
};

export default fetchData;
