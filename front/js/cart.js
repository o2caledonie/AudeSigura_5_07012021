//Get data from localStorage
let storedTeddies = JSON.parse(localStorage.getItem('storedTeddies'))
console.log(storedTeddies)

// Cart setUp
const cart = document.getElementById('cart');
const cartTitle = document.createElement('h5');
cart.appendChild(cartTitle);
cartTitle.textContent = "Mes oursons :";
cartTitle.className = 'card-title mt-3 text-center';

const teddiesList = document.createElement('div');
cart.appendChild(teddiesList);
teddiesList.id = 'teddies-list';
teddiesList.className = 'col-9 col-md-6 col-lg-4'


if(storedTeddies == null || storedTeddies.length === 0) {
    // if cart is empty
    const noTeddies = document.createElement('p');
    teddiesList.appendChild(noTeddies);
    noTeddies.className = 'no-teddies';
    noTeddies.textContent = "Mon panier est vide ...";
} else {
    // Show teddies items
    let teddy = 0;
    for (storedTeddy of storedTeddies) {
        const teddyItem = document.createElement('div');
        teddiesList.appendChild(teddyItem);
        teddyItem.className = 'teddy-item';

    const teddyDetails = document.createElement('div');
    teddyItem.appendChild(teddyDetails);
    teddyDetails.className = "teddy-details";
    teddyDetails.textContent = storedTeddy.quantity + " " + storedTeddy.teddyName + " , " + storedTeddy.teddyColor;
    
    const teddyPrice = document.createElement('div');
    teddyItem.appendChild(teddyPrice);
    teddyPrice.id = teddy++;
    teddyPrice.className = 'teddy-price';
    teddyPrice.textContent = storedTeddy.teddyPrice/100 + " €";

    // Set "trash-teddy" button
    const trashTeddy = document.createElement('button');
    teddyPrice.appendChild(trashTeddy);
    trashTeddy.className = 'btn btn-trash-teddy';
    trashTeddy.type = 'button';
    trashTeddy.title = 'Supprimer cet ourson ?';
    trashTeddy.innerHTML = `<i class="fas fa-trash-alt" aria-hidden="true"></i>`;

    // Action : trash teddy      
    trashTeddy.addEventListener("click", function (event){
        event.preventDefault();
        let id = this.closest('.teddy-price').id;
        storedTeddies.splice(id, 1);

        //Update localStorage
        localStorage.setItem('storedTeddies', JSON.stringify(storedTeddies));
        JSON.parse(localStorage.getItem('storedTeddies'));

        alert('Cet ourson a bien été supprimé !');
        window.location.href = "cart.html";   
    });
    }
    
    // Display total price
    let arrayPrice = []
    for (storedTeddy of storedTeddies) {
        let item = storedTeddy.teddyPrice*storedTeddy.quantity;
        arrayPrice.push(item);
        console.log(arrayPrice)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const updatePrice = arrayPrice.reduce(reducer, 0);
    console.log(updatePrice);

    const totalprice = document.createElement('div');
    cart.appendChild(totalprice);
    totalprice.id = 'total-price';
    totalprice.className = 'text-center my-2';
    totalprice.innerHTML = `Montant total = ${updatePrice/100} €`;

    // Set "empty-cart" button
    const emptyCart = document.createElement('button');
    cart.appendChild(emptyCart);
    emptyCart.className = 'col-9 btn btn-primary my-2';
    emptyCart.setAttribute('type', 'button');
    emptyCart.title = 'Vider le panier';
    emptyCart.innerHTML = `Vider mon panier <i class="fas fa-trash-alt" aria-hidden="true"></i>`;

    // Action : empty cart
    emptyCart.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem('storedTeddies');
        alert('Votre panier a bien été vidé !')
        window.location.href = "cart.html";
    });

    // Set contact form
    const contactForm = document.createElement('form');
    cart.appendChild(contactForm);
    contactForm.id = 'contact';
    contactForm.innerHTML = `<p class="col m-3">Merci de remplir ce formulaire pour valider votre commande :</p>`
    
    // <div class="col m-3">
    //   <label for="first-name" class="form-label">Prénom</label>
    //   <input type="text" class="form-control" id="first-name" required>
    // </div>
    // <div class="col m-3">
    //   <label for="last-name" class="form-label">Nom</label>
    //   <input type="text" class="form-control" id="last-name" required>
    // </div>
    // <div class="col m-3">
    //   <label for="adress" class="form-label">Adresse</label>
    //   <input type="text" class="form-control" id="adress" required>
    // </div>
    // <div class="col m-3">
    //   <label for="city" class="form-label">Ville</label>
    //   <input type="text" class="form-control" id="city" required>
    // </div>
    // <div class="col m-3">
    //   <label for="email" class="form-label">email</label>
    //   <input type="text" class="form-control" id="Email" required>
    // </div>
    // <div class="col m-3 text-center">
    //   <button class="btn btn-secondary my-3" type="submit">Valider ma commande</button>
    // </div></p>

    // Fist-name field + validity

    const divField = document.createElement('div');
    contactForm.appendChild(divField);
    divField.className = 'col m-3';
    divField.innerHTML = `<label for="first-name" class="form-label">Prénom</label>`
    
    const firstName = document.createElement('input');
    firstName.setAttribute('class', 'form-control');
    firstName.setAttribute('id' , 'first-name')
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('pattern', '^[a-zA-Z]+$' );
    firstName.setAttribute('title', 'Seules les lettres sont autorisées');
    divField.appendChild(firstName);
    
    // Fonction de validité Prénom, Nom, Ville
    // function isvalid(value) {
    //     return /^[a-zA-Z]+$/.test(value);
    // }
    // pattern="^[a-zA-Z]+$" title = "Seules les lettres sont acceptées"
    


}
