
const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const galleryEl = document.querySelector('.js-gallery');
const backdropEl = document.querySelector('.js-lightbox');
const closeBackdropBtnEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');
const imageOnBackdrop = document.querySelector('.lightbox__image');


const createGalleryMarkup = galleryItems.map(({ preview, original, description }, index) => createGalleryItemMarkup({ preview, original, description }, index)).join('')
galleryEl.innerHTML = createGalleryMarkup;



galleryEl.addEventListener('click', opensModal);

closeBackdropBtnEl.addEventListener('click', closesModal);

overlayEl.addEventListener('click', closesModal);

window.addEventListener('keydown', closesModalByEscape);

window.addEventListener('keydown', scrollLeft);

window.addEventListener('keydown', scrollRight);


function createGalleryItemMarkup({ preview, original, description }, index) {
  return `<li class="gallery-item">
            <a class="gallery__link">
              <img class="gallery__image"
                   src="${preview}"
                   data-source="${original}"
                   data-index = "${index}"
                   alt="${description}">
            </a>
          </li>`;
}


function opensModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return
  }
  toggleBackdrop();
  getOrigin(e);
  blockScroll();
}

function closesModal() {
  toggleBackdrop();
  removeOriginSource();
  allowScroll();
}

function closesModalByEscape(e) {
  if (e.key !== 'Escape') {
    return
  }
  backdropEl.classList.remove('is-open');
  removeOriginSource();
  allowScroll();
}

function blockScroll() {
  bodyEl.classList.add('hidden');
}

function allowScroll() {
  bodyEl.classList.remove('hidden');
}

function toggleBackdrop() {
  backdropEl.classList.toggle('is-open');
}

function getOrigin(e) {
  imageOnBackdrop.src = e.target.dataset.source;
  imageOnBackdrop.alt = e.target.alt;
  imageOnBackdrop.dataset.index = e.target.dataset.index;
}

function removeOriginSource() {
  imageOnBackdrop.src = '';
}


function scrollLeft(e) {
  let currentIndex = imageOnBackdrop.dataset.index;
  console.log(currentIndex);
  if (backdropEl.classList.contains('is-open') && e.key === 'ArrowLeft') {
    if (!galleryItems[currentIndex - 1]) {
      return
    }
    imageOnBackdrop.src = galleryItems[currentIndex - 1].original;
  }
}

function scrollRight(e) {
  if (backdropEl.classList.contains('is-open') && e.key === 'ArrowRight') {
    for (let i = 0; i < galleryItems.length; i += 1) {
      let image = galleryItems[i];
      if (image.original === imageOnBackdrop.src) {
        if (!galleryItems[(i + 1)]) {
          return
        }
        return imageOnBackdrop.src = galleryItems[(i + 1)].original;
      }
    }
  }
}
