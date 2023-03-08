// import Notiflix from 'notiflix';
// import axios from 'axios';

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
