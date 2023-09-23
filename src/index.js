import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { fillSelectBreeds, renderingCatInfo } from './js/rendering';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';

const breeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

Loading.dots();

fetchBreeds()
  .then(catBreeds => {
    breeds.classList.remove('visually-hidden');
    fillSelectBreeds(catBreeds, breeds);
    new SlimSelect({
      select: breeds,
      settings: {
        placeholderText: 'Choose your cat',
      },
    });
  })
  .catch(error => {
    Notify.failure(error.message, {
      cssAnimationStyle: 'zoom',
      closeButton: true,
      position: 'center-top',
    });
  })
  .finally(() => {
    Loading.remove();
  });
Loading.remove();

breeds.addEventListener('change', createCatCard);

function createCatCard(e) {
  Loading.dots();
  catInfo.classList.add('visually-hidden');
  fetchCatByBreed(e.target.value)
    .then(cat => {
      const { breeds, url } = cat[0];
      const { name, description, temperament } = breeds[0];
      renderingCatInfo(url, name, description, temperament, catInfo);
      catInfo.classList.remove('visually-hidden');
      Loading.remove();
    })
    .catch(error => {
      Notify.failure(error.message, {
        cssAnimationStyle: 'zoom',
        closeButton: true,
        position: 'center-top',
      });
    })
    .finally(() => {
      catInfo.classList.remove('visually-hidden');
      Loading.remove();
    });
  Loading.remove();
}
