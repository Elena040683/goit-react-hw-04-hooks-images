import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '23140878-cc837524a3fe3a996e92890e9';

const fetchImages = (searchValue, page = 1) => {
  console.log(searchValue, page);
  return axios
    .get(
      `/?q=${searchValue}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(result => result.data.hits);
};

export default fetchImages;
