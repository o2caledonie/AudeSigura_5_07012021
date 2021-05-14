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
        console.log(newElt);
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
    newElt.innerHTML = `<img class="card-img-top" src="${teddy.imageUrl}" alt="Ourson ${teddy.name}">
    <div class="card-body text-center">
    <h5 class="card-title"><span class="name">${teddy.name}</span></h5>
    <p class="description">${teddy.description}</p>
    <div class="price">Prix : ${(teddy.price/100).toFixed(2) + " €"}</span></div>
    <form>
        <div class="custom">
            <label for ="Choix de couleurs pour ${teddy.name}">Choisissez sa couleur :</label> 
            <select id ="select-color" class="custom-select">${customTeddy(teddy)}</select>
            </div>
    </form>
    <button id="add-cart" type="button" class="btn btn-secondary mt-3">Ajouter au panier</button>
    </div>`;

    // Récupération des données et envoi au panier
    const button = newElt.querySelector("#add-cart")
    console.log(button)
    button.addEventListener("click", function (event){
        event.preventDefault();

        let colorChoosen = newElt.querySelector("#select-color").value
        console.log(colorChoosen)
        let teddyChoosen = {
            teddyName : teddy.name,
            teddyId : teddy._id,
            teddyColor : colorChoosen,
            teddyPrice : teddy.price,
            inCart : 1,
        };
        console.log(teddyChoosen);
    
        let storedTeddies = JSON.parse(localStorage.getItem('storedTeddies'))
        console.log(storedTeddies)
        if (storedTeddies == null) {
            storedTeddies = []
            storedTeddies.push(teddyChoosen)
        } else {
            for(storedTeddy of storedTeddies) {
                console.log(storedTeddy)
                console.log(teddyChoosen)
                if (teddyChoosen['teddyColor'] != storedTeddy['teddyColor'] && teddyChoosen['teddyColor'] != storedTeddy['teddyColor']){
                    console.log("doesn't exist")
                    storedTeddies.push(teddyChoosen)
            
                    
                } else {
                    console.log("exist")
                    storedTeddy.inCart += 1;
                    
                  }
                  
                // if (teddyChoosen['teddyColor'] == storedTeddy['teddyColor'] && teddyChoosen['teddyColor'] == storedTeddy['teddyColor']){
                //     console.log("exists")
                //     storedTeddy.inCart += 1;
                //     break
                    
                // } else {
                //     console.log("doesn't exist")
                //     storedTeddies.push(teddyChoosen)
                    
                //   }
                
            }
                
          }    
            
        
        
             
       
        localStorage.setItem('storedTeddies', JSON.stringify(storedTeddies))
        
        if (window.confirm(teddy.name + " " + colorChoosen + ' a bien été ajouté. Souhaitez-vous consulter votre panier ?')) { 
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        }
        console.log(storedTeddies)
        
    })
    return newElt;  
}


// options de customisation
function customTeddy(teddy) {
    const colors = teddy.colors;
        console.log(colors)
        console.log(colors.length)
    let custom = ``;
        for(let color of colors){
        console.log(color) 
        const newOpt = `<option value="${color}">${color}</option>`
        console.log (newOpt)
        custom = custom + newOpt;  
        }
        
    return custom;   
}
    


fetchTeddy();
