// const img = document.getElementsByClassName("card-img-top");
// const title = document.getElementsByClassName("name");
// const description = document.getElementsByClassName("description");
// const price = document.getElementsByClassName("price");

// fetch("http://localhost:3000/api/teddies")
// .then(res => {
//     res.json().then(data => {
//         console.log(img)
//         img[0].src = data[0].imageUrl
//         console.log(data[0].name)
//         title[0].innerHTML = (data[0].name)
//         console.log(data[0].description)
//         description[0].innerHTML = (data[0].description)
//         console.log(data[0].price)
//         price[0].innerHTML = (data[0].price/100).toFixed(2) + " €"

//     })     
// })
// .catch(error => {
//     console.log(error)
//     document.getElementById('erreur').innerHTML = "Erreur lors de la récupération des données :("
// })



// Récupération des données + boucle
function fetchTeddies() {
    fetch("http://localhost:3000/api/teddies")
    .then(res => {
        console.log(res)
        if(!res.ok) {
            throw Error("ERROR");
        }
        return res.json();
    })
    .then(teddies => {
        console.log(teddies);
        console.log(teddies.length)

        for (let teddy of teddies) {
            let newElt = buildTeddyCard(teddy);
            console.log(buildTeddyCard(teddy));
            let elt = document.getElementById('cards-wrapper');
            elt.appendChild(newElt);
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById('erreur').innerHTML = "Erreur lors de la récupération des données :("
    });
}

// Création carte "teddy"
function buildTeddyCard(teddy) {
    const newElt = document.createElement("div");
    newElt.classList.add("card");
    newElt.innerHTML = `<img src="${teddy.imageUrl}" class="card-img-top" alt="Ourson ${teddy.name}">
                        <div class="card-body text-center">
                            <h5 class="card-title"><span class="name">${teddy.name}</span></h5>
                            <div class="card-text">
                            <p class="description">${teddy.description}</p>
                            <div>Prix: <span class="price">${(teddy.price/100).toFixed(2) + " €"}</span></div>
                            </div>
                            <a href="produit.html?id=${teddy._id}" class="btn btn-primary">Rencontrez ${teddy.name} !</a>
                        </div></span>`;
    return newElt;  
}

fetchTeddies();




