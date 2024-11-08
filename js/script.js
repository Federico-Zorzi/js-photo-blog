const numOfCards = 6;
const pinboardEl = document.getElementById("pinboard");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("close-overlay");
let selectedIndex = -1;

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

fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${numOfCards}`)
  .then((response) => {
    // gestione dell'errore nel caso non funzionasse il collegamento dell'API
    if (response.status !== 200)
      throw new Error(
        "Errore di comunicazione del server! Riprovare più tardi..."
      );

    return response.json();
  })
  .then((photos) => {
    console.log(photos);

    // stampa delle cards
    photos.forEach((photo) => {
      pinboardEl.innerHTML += `
      <div class="col-12">
      ${createCardPhoto(photo)}
      </div>`;
    });

    // recupero array di nodi delle cards generati precedentemente
    const postCardsEl = document.querySelectorAll("#pinboard .card");

    postCardsEl.forEach((cardNode, index) => {
      // apertura schermata di overlay
      cardNode.addEventListener("click", () => {
        const cardSelected = document.getElementById("card-selected");
        cardSelected.innerHTML = ``;
        overlay.classList.remove("d-none");

        selectedIndex = index;
        // scomparsa card in background dopo la comparsa dell'overlay
        cardNode.classList.add(`d-none`);

        // stampa card nell'overlay
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
    // stampa alert di errore dovuto alla comunicazione del server non ok
    pinboardEl.innerHTML += `
    <div class="col-12 ">
      <div class="alert alert-danger" role="alert">
      ${error}
      </div>
    </div>`;
  });
