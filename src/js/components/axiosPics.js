import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
import { refs } from '..';

const MY_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS_FOR_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPics() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${MY_KEY}&q=${this.searchQuery}&${OPTIONS_FOR_RESPONSE}&page=${this.page}&per_page=${this.perPage}`
      );

      if (response.data.total === 0) {
        refs.containerForLoadBtn.classList.add('hidden');
        refs.galleryEl.classList.add('hidden');
        refs.galleryEl.textContent = '';

        throw new Error('error');
      }

      Notiflix.Notify.success(
        `Hooray! We found ${response.data.total} images for you.`
      );

      console.log(response.data.hits.length);
      return response.data.hits;
    } catch (e) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
