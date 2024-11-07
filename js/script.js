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

    let selectedIndex = -1;
    const postCardsEl = document.querySelectorAll("#pinboard .card");

    postCardsEl.forEach((cardNode, index) => {
      // movimento per rotazione cards a tot gradi
      cardNode.addEventListener("mouseover", () => {
        cardNode.style.transform = "rotate(10deg)";
      });

      // movimento per rotazione cards in posizione di riposo
      cardNode.addEventListener("mouseout", () => {
        cardNode.style.transform = "rotate(0deg)";
      });

      // apertura schermata di overlay
      cardNode.addEventListener("click", () => {
        const cardSelected = document.getElementById("card-selected");
        cardSelected.innerHTML = ``;
        overlay.classList.remove("d-none");

        selectedIndex = index;
        // scomparsa card in background dopo la comparsa dell'overlay
        cardNode.classList.add(`d-none`);

        // stampa card per visualizzarla nell'overlay
        cardSelected.innerHTML = createCardPhoto(photos[selectedIndex]);
      });
    });

    // chiusura schermata di overlay
    closeOverlay.addEventListener("click", () => {
      overlay.classList.add("d-none");

      // ricomparsa card in background dopo la sparizione dell'overlay
      postCardsEl[selectedIndex].classList.remove("d-none");
      selectedIndex = -1;
    });
  })
  .catch((error) => {
    alert("link API non corretto, verificare come è stata scritta l'API");
  });
