//Get teddy Id 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

function fetchTeddy() {
    // fetch("http://localhost:3000/api/teddies/" + id)
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(res => {
            console.log(res)
            if (!res.ok) {
                throw Error("ERROR");
            }
            return res.json();
        })
        .then(teddy => {
            console.log(teddy);
            let newElt = buildTeddyPage(teddy);
            console.log(newElt);
            let elt = document.getElementById('teddy');
            elt.appendChild(newElt);
        })
        .catch(error => {
            console.log(error);
            document.getElementById('erreur').innerHTML = "Erreur lors de la récupération des données :("
        });
}

// Create "teddy" page
function buildTeddyPage(teddy) {
    const newElt = document.createElement("div");
    newElt.classList.add("card");
    newElt.innerHTML = `<img class="card-img-top" src="${teddy.imageUrl}" alt="Ourson ${teddy.name}">
    <div class="card-body text-center">
    <h5 class="card-title"><span class="name">${teddy.name}</span></h5>
    <p class="description">${teddy.description}</p>
    <div class="price">Prix : ${(teddy.price / 100).toFixed(2) + " €"}</span></div>
    <form id="form">
        <div class="form-group custom">
            <label for ="Choix de couleurs pour ${teddy.name}">Choisissez sa couleur :</label> 
            <select id ="select-color" class="custom-select">${customTeddy(teddy)}</select>
        </div>
        <div class="form-group quantity">
            <label for ="Quantité de ${teddy.name}">Quantité :</label>
            <input class="form-control form-control-numbers" type="number" id="teddy-incart" min="1" max="10" value="1">
        </div>
        <button id="add-cart" type="submit" class="btn btn-secondary mt-3">Ajouter au panier</button>
    </form>
    </div>`;

    // Submit form
    const form = newElt.querySelector("#form")
    console.log(form)
    form.addEventListener("submit", function (event) {
        event.preventDefault()
        let teddyChoosen = handleAddToCart(newElt, teddy)
        if (window.confirm(teddyChoosen.teddyName + " " + teddyChoosen.teddyColor + ' a bien été ajouté. Souhaitez-vous consulter votre panier ?')) {
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        }
    })
    return newElt;
}

// Send data to local storage
function handleAddToCart(newElt, teddy) {
    let colorChoosen = newElt.querySelector("#select-color").value
    console.log(colorChoosen)
    let quantityChoosen = parseInt(newElt.querySelector('input').value)
    let teddyChoosen = {
        teddyName: teddy.name,
        teddyId: teddy._id,
        teddyColor: colorChoosen,
        teddyPrice: teddy.price,
        inCart: quantityChoosen,
    };
    console.log(teddyChoosen);

    let storedTeddies = JSON.parse(localStorage.getItem('storedTeddies'))
    console.log(storedTeddies)
    if (storedTeddies == null) {
        storedTeddies = []
        // if the cart is empty, we push the first item
        storedTeddies.push(teddyChoosen)
    } else {
        let exist = false;
        for (let storedTeddy of storedTeddies) {
            // if the item is already in the array we update the quantity
            if (teddyChoosen['teddyName'] == storedTeddy['teddyName'] && teddyChoosen['teddyColor'] == storedTeddy['teddyColor']) {
                console.log("exists")
                console.log(storedTeddy['inCart'])
                console.log(storedTeddy)
                storedTeddy.inCart = quantityChoosen
                console.log(storedTeddy)
                exist = true;
            }
        }
        if (!exist) {
            // if exist is still false, then it means the item is nowhere in the Array, so we add the new item
            storedTeddies.push(teddyChoosen)
        }
    }
    localStorage.setItem('storedTeddies', JSON.stringify(storedTeddies))
    return teddyChoosen
}

// custom options
function customTeddy(teddy) {
    const colors = teddy.colors;
    console.log(colors)
    console.log(colors.length)
    let custom = ``;
    for (let color of colors) {
        console.log(color)
        const newOpt = `<option value="${color}">${color}</option>`
        console.log(newOpt)
        custom = custom + newOpt;
    }
    return custom;
}

fetchTeddy();
