const pinboardEl = document.getElementById("pinboard");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("close-overlay");

/**
 *
 * @param {object} photoEl inserire oggetto della foto per comporre la card
 * @returns
 */
const createCardPhoto = (photo) => {
  return `       
            <div class="card h-100 w-100 rounded-0 m-auto">
              <img src="${photo.url}" class="card-img-top pt-3 px-3" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  ${photo.title}
                </p>
              </div>
              <img src="./img/pin.svg" alt="pin" class="pin" />
            </div>
          `;
};

fetch("https://jsonplaceholder.typicode.com/photos?_limit=6")
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);

    // stampa delle cards
    photos.forEach((photo) => {
      pinboardEl.innerHTML += `
        <div class="col-12 col-md-4">
          ${createCardPhoto(photo)}
        </div>`;
    });

    const postCardsEl = document.querySelectorAll("#pinboard .card");
    console.log(postCardsEl);

    postCardsEl.forEach((cardNode, index) => {
      // apertura schermata di overlay
      cardNode.addEventListener("click", () => {
        const cardSelected = document.getElementById("card-selected");
        cardSelected.innerHTML = ``;
        overlay.classList.remove("d-none");

        // stampa card per visualizzarla nell'overlay
        cardSelected.innerHTML = createCardPhoto(photos[index]);
      });
    });
  });

// chiusura schermata di overlay
closeOverlay.addEventListener("click", () => {
  overlay.classList.add("d-none");
});
