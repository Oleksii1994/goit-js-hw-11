import axios from 'axios';
import Notiflix from 'notiflix';

const MY_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS_FOR_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('[data-action="load-more"]');

let valueForSearch = '';
let page = 0;

formEl.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();
  try {
    if (formEl.elements.searchQuery.value === '') {
      Notiflix.Notify.failure('Enter something to search');
      return;
    }

    btnLoadMore.classList.add('hidden');
    btnLoadMore.classList.add('btn');

    galleryEl.innerHTML = '';

    page = 0;

    await insertMarkup();
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  insertMarkup();
}

async function getPics(itemToSearch) {
  try {
    page += 1;
    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${itemToSearch}&${OPTIONS_FOR_RESPONSE}&page=${page}&per_page=40`
    );

    const picsArray = await response.data.hits;
    const picsArrayLength = await response.data.hits.length;

    if (picsArrayLength === 0 || itemToSearch === '') {
      throw new Error();
    }

    console.log(response.data.total);
    console.log(picsArrayLength);
    console.log(picsArray);
    Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
    return picsArray;
  } catch (error) {
    itemToSearch = '';
    onErrorNotify();
  }
}

function onErrorNotify() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function renderMarkup(arr) {
  if (arr === undefined) {
    return;
  }
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
        <a class="link-slider"><img src="${webformatURL}" alt="${tags}" loading="lazy" class='img'/></a>
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

async function insertMarkup() {
  valueForSearch = formEl.elements.searchQuery.value;

  galleryEl.insertAdjacentHTML(
    'beforeend',
    renderMarkup(await getPics(valueForSearch))
  );

  btnLoadMore.classList.remove('hidden');
}
