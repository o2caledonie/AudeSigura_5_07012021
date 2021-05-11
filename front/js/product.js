//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

function fetchTeddy() {
    fetch("http://localhost:3000/api/teddies/" + id)
    .then(res => {
        console.log(res)
        if(!res.ok) {
            throw Error("ERROR");
        }
        return res.json();
    })

    .then(teddy => {
        console.log(teddy);
        let newElt = buildTeddyPage(teddy);
        console.log(buildTeddyPage(teddy));
        let elt = document.getElementById('teddy');
        elt.appendChild(newElt);  
        
        const colors = teddy.colors;
        console.log(colors)
        for (let i of colors) {
            let color = customTeddy(i);
            console.log(customTeddy(i));
            let opt = document.getElementsByClassName('custom-select');
            opt.appendChild(color);
        }
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
    newElt.innerHTML = `<img class="card-img-top" src="${teddy.imageUrl}" alt="Ourson ${teddy.name}">
    <div class="card-body text-center">
    <h5 class="card-title"><span class="name">${teddy.name}</span></h5>
    <p class="description">${teddy.description}</p>
    <div class="price">Prix : ${(teddy.price/100).toFixed(2) + " €"}</span></div>
    <form>
        <div class="custom">
            <label for ="Choix de couleurs pour ${teddy.name}">Choisissez sa couleur :</label> 
            <select class="custom-select"></select>
            </div>
    </form>
    <a href="#" class="btn btn-primary">Ajouter au panier</a>
    </div>`;
    return newElt;  
}

// options de customisation
function customTeddy(i) {
    const newOpt = document.createElement("option");
    newOpt.innerHTML = `${teddy.colors}`
    return newOpt
}
    


/* <option selected="tan">Brun</option>
    <option value="chocolate">Chocolat</option>
    <option value="black">Noir</option>
    <option value="white">Blanc</option> */
fetchTeddy();
