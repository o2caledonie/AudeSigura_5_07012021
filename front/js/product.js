//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

function fetchTeddies() {
    fetch("http://localhost:3000/api/teddies/" + id)
    .then(res => {
        console.log(res)
        if(!res.ok) {
            throw Error("ERROR");
        }
        return res.json();
    })

    .then(teddies => {
        console.log(teddies);
        console.log(teddies.colors);
        let newElt = buildTeddyPage(teddy);
        console.log(buildTeddyPage(teddy));
        let elt = document.getElementById('teddy');
        elt.appendChild(newElt);
    })

    .catch(error => {
        console.log(error);
        document.getElementById('erreur').innerHTML = "Erreur lors de la récupération des données :("
    });
}

// Création page "teddy"
function buildTeddyPage(teddy) {
    const newElt = document.createElement("div");
    newElt.classList.add("card");
    newElt.innerHTML = `<img class="card-img-top" src="${teddy.imageUrl}" alt="Card image">
    <div class="card-body">
      <h4 class="card-title">Norbert</h4>
      <p class="card-text">Description</p>
      <div>Prix: <span class="price">29 euros</span></div>
      <form>Choisissez sa couleur : 
        <select class="custom-select-lg">
          <option selected="tan">Brun</option>
          <option value="chocolate">Chocolat</option>
          <option value="black">Noir</option>
          <option value="white">Blanc</option>
        </select>
      </form>
      <a href="#" class="btn btn-primary">Ajouter au panier</a>
    </div>`;
    return newElt;  
}

fetchTeddies();
