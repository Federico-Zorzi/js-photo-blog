const pinboardEl = document.getElementById("pinboard");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("close-overlay");

/**
 *
 * @param {object} photoEl inserire oggetto della foto per comporre la card
 * @returns
 */
const createCardPhoto = (photoEl) => {
  return `
        <div class="col-12 col-md-4">
            <div class="card h-100 w-100 rounded-0 m-auto" style="width: 18rem">
              <img src="${photoEl.url}" class="card-img-top pt-3 px-3" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  ${photoEl.title}
                </p>
              </div>
              <img src="./img/pin.svg" alt="pin" class="pin" />
            </div>
          </div>`;
};

fetch("https://jsonplaceholder.typicode.com/photos?_limit=6")
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);

    // stampa delle cards
    photos.forEach((photo) => {
      pinboardEl.innerHTML += createCardPhoto(photo);
    });

    const postCardsEl = document.querySelectorAll("#pinboard .card");
    console.log(postCardsEl);

    postCardsEl.forEach((card) => {
      console.log(card);

      // apertura schermata di overlay
      card.addEventListener("click", () => {
        overlay.classList.remove("d-none");
      });
    });
  });

// chiusura schermata di overlay
closeOverlay.addEventListener("click", () => {
  overlay.classList.add("d-none");
});
