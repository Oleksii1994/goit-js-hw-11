import axios from 'axios';
import Notiflix from 'notiflix';

const MY_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS_FOR_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
console.log();

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  // const valueForSearch = formEl.elements.searchQuery.value;
  galleryEl.insertAdjacentHTML('beforeend', renderMarkup(await getPics()));
  // renderMarkup();
  // getPics();
}

async function getPics() {
  try {
    const valueForSearch = formEl.elements.searchQuery.value.trim();
    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${valueForSearch}&${OPTIONS_FOR_RESPONSE}`
    );

    const picsArray = await response.data.hits;
    const picsArrayLength = await response.data.hits.length;
    if (picsArrayLength === 0) {
      throw new Error();
    }

    console.log(response);
    console.log(picsArrayLength);
    console.log(picsArray);
    return picsArray;
  } catch (error) {
    formEl.elements.searchQuery.value = '';

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function renderMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <a><img src="${webformatURL}" alt="${tags}" loading="lazy" class='img'/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes<br>${likes}</br></b>
          </p>
          <p class="info-item">
            <b>Views<br>${views}</br></b>
          </p>
          <p class="info-item">
            <b>Comments<br>${comments}</br></b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${downloads}</br></b>
          </p>
        </div>
      </div>`
    )
    .join('');
  return markup;
}

getPics().then(x => renderMarkup(x));
