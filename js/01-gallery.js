import { galleryItems } from "./gallery-items.js";
// Change code below this line
// console.log(galleryItems);

// 1 Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const galleryListEl = document.querySelector(".gallery");
galleryListEl.insertAdjacentHTML("beforeend", createGalleryItem(galleryItems));

function createGalleryItem(galleryItems) {
    return galleryItems
        .map(
            ({ preview, original, description }) =>
                `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
      </li>`
        )
        .join("");
}

// 2 отримання посилання на велике зображення

galleryListEl.addEventListener('click', onClick);

function onClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    const modalWindowImg = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);
    modalWindowImg.show(galleryListEl.addEventListener('click', closeOriginalImgByClick));
    function closeOriginalImgByClick() {
        modalWindowImg.close(galleryListEl.removeEventListener('keydown', closeOriginalImgByBtn));
    }

    //3 Закриття модалки після натискання клавіші Escape
    galleryListEl.addEventListener('keydown', closeOriginalImgByBtn);
    function closeOriginalImgByBtn(event) {
        if (event.code === 'Escape') {

            modalWindowImg.close(galleryListEl.removeEventListener('keydown', closeOriginalImgByBtn));
        }
    }
}
