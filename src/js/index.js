import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PicsApiService from './components/axiosPics';

export const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  btnSearch: document.querySelector('[type="submit"]'),
  btnLoadMore: document.querySelector('[data-action="load-more"]'),
  containerForLoadBtn: document.querySelector('.btn-load-container'),
};

const ApiService = new PicsApiService();

let valueForSearch = '';
let isPreviousWord;

refs.formEl.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();
  refs.galleryEl.classList.remove('hidden');
  refs.containerForLoadBtn.classList.remove('hidden');
  refs.btnLoadMore.classList.add('hidden');
  refs.galleryEl.innerHTML = '';
  ApiService.resetPage();

  const previousWord = event.currentTarget.elements.searchQuery.value;

  if (isPreviousWord === previousWord) {
    refs.btnLoadMore.classList.add('hidden');
    Notiflix.Notify.info('Enter new word to search');
    event.currentTarget.elements.searchQuery.value = '';
    return;
  }
  if (previousWord === '') {
    onErrorNotify();
    return;
  }

  await insertMarkup().then(
    slider =>
      (slider = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        scrollZoom: false,
      }))
  );

  ApiService.incrementPage();
  refs.btnLoadMore.classList.remove('hidden');
  refs.btnLoadMore.classList.add('btn');

  return (isPreviousWord = previousWord);
}

async function onLoadMore() {
  ApiService.incrementPage();
  await insertMarkup().then(
    slider =>
      (slider = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        scrollZoom: false,
      }))
  );
}

async function insertMarkup() {
  valueForSearch = refs.formEl.elements.searchQuery.value.trim();
  refs.btnLoadMore.classList.remove('hidden');
  ApiService.searchQuery = valueForSearch;
  refs.galleryEl.insertAdjacentHTML(
    'beforeend',
    renderMarkup(await ApiService.fetchPics())
  );
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
        `<a class="gallery__item" href='${largeImageURL}'><div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class='img'/>
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
      </div></a>`
    )
    .join('');
  return markup;
}
