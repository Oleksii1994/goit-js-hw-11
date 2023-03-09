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
      // refs.containerForLoadBtn.classList.add('hidden');
      if (response.data.total === 0) {
        refs.containerForLoadBtn.classList.add('hidden');
        refs.galleryEl.classList.add('hidden');
        refs.galleryEl.textContent = '';
        // refs.containerForLoadBtn.classList.add('hidden');

        // refs.containerForLoadBtn.innerHTML = '';
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

// export default async function getPics(itemToSearch) {
//   try {
//     // const valueForSearch = formEl.elements.searchQuery.value.trim();
//     page += 1;
//     const response = await axios.get(
//       `${BASE_URL}?key=${MY_KEY}&q=${itemToSearch}&${OPTIONS_FOR_RESPONSE}&page=${page}&per_page=40`
//     );

//     const picsArray = await response.data.hits;
//     const picsArrayLength = await response.data.hits.length;

//     if (picsArrayLength === 0) {
//       throw new Error();
//     }

//     console.log(response.data.total);
//     console.log(picsArrayLength);
//     console.log(picsArray);
//     return picsArray;
//   } catch (error) {
//     // formEl.elements.searchQuery.value = '';
//     itemToSearch = '';

//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// }
