
//Get data from localStorage
let storedTeddies = JSON.parse(localStorage.getItem('storedTeddies'))
console.log(storedTeddies)

// Send data to server
function sendData(data) {
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data),

    })

        .then(res => {
            console.log(res)

            if (!res.ok) {
                throw Error("ERROR");
            }
            return res.json();
        })

        .then(resOrder => {
            console.log(resOrder)
            console.log(resOrder.orderId)
            localStorage.setItem('resOrder', resOrder.orderId)
            console.log(resOrder)

            let products = resOrder.products
            // let total = 0
            // for (product of products){
            //     console.log(product.price)
            //     total = total + product.price
            // }
            // console.log(total)
            let reducer = function (total, product) {
                return total + product.price
            }
            let total = products.reduce(reducer, 0)
            console.log(total)
            localStorage.setItem('totalCartPrice', total)
            localStorage.removeItem('storedTeddies')
            window.location = 'order.html'
        })

        .catch(error => {
            console.log(error);
            document.getElementById('erreur').innerHTML = "Erreur lors de l'envoi des données au serveur :("

        });
};

// send cart total price to localStorage
// localStorage.setItem('updatePrice', updatePrice);
// const cartTotalPrice = localStorage.getItem('updatePrice');
// console.log(cartTotalPrice);

// Cart setUp
const cart = document.getElementById('cart');
const cartTitle = document.createElement('h5');
cart.appendChild(cartTitle);
cartTitle.textContent = "Mes oursons :";
cartTitle.className = 'card-title mt-3 text-center';

const teddiesList = document.createElement('div');
cart.appendChild(teddiesList);
teddiesList.id = 'teddies-list';
teddiesList.className = 'col-11 col-md-6 col-lg-4'


if (storedTeddies == null || storedTeddies.length === 0) {
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

        let teddyLink = `product.html?id=${storedTeddy.teddyId}`
        const teddyDetails = document.createElement('a');
        teddyItem.appendChild(teddyDetails);
        teddyDetails.className = "teddy-details";
        teddyDetails.setAttribute ('href', teddyLink);
        // teddyDetails.innerHTML = `<input class="form-control form-control-numbers" type="number" id="teddy-incart" min="1" max="10" value="${storedTeddy.inCart}">${storedTeddy.teddyName}, ${storedTeddy.teddyColor}`
        teddyDetails.textContent = storedTeddy.inCart + "   " + storedTeddy.teddyName + " , " + storedTeddy.teddyColor;



        const teddyPrice = document.createElement('div');
        teddyItem.appendChild(teddyPrice);
        teddyPrice.id = teddy++;
        teddyPrice.className = 'teddy-price';
        teddyPrice.textContent = (storedTeddy.teddyPrice) * (storedTeddy.inCart) / 100 + " €";

        // Set "trash-teddy" button
        const trashTeddy = document.createElement('button');
        teddyPrice.appendChild(trashTeddy);
        trashTeddy.className = 'btn btn-trash-teddy';
        trashTeddy.type = 'button';
        trashTeddy.title = 'Supprimer cet ourson ?';
        trashTeddy.innerHTML = `<i class="fas fa-trash-alt" aria-hidden="true"></i>`;

        // Action : trash teddy      
        trashTeddy.addEventListener("click", function (event) {
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
        let item = (storedTeddy.teddyPrice * storedTeddy.inCart) / 100;
        arrayPrice.push(item);
        console.log(arrayPrice)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const updatePrice = arrayPrice.reduce(reducer, 0);
    console.log(updatePrice);

    const totalPrice = document.createElement('div');
    cart.appendChild(totalPrice);
    totalPrice.id = 'total-price';
    totalPrice.className = 'text-center my-2';
    totalPrice.innerHTML = `Montant total = ${updatePrice} €`;


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

    // Set first-name field
    const divFirstName = document.createElement('div');
    contactForm.appendChild(divFirstName);
    divFirstName.className = 'col m-3';

    const labelFirstName = document.createElement('label');
    divFirstName.appendChild(labelFirstName);
    labelFirstName.setAttribute('for', 'first-name');
    labelFirstName.className = 'form-label';
    labelFirstName.textContent = 'Prénom : ';

    const firstName = document.createElement('input');
    divFirstName.appendChild(firstName);
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('class', 'form-control');
    firstName.id = "first-name"
    firstName.required = true;

    // Set last-name field
    const divLastName = document.createElement('div');
    contactForm.appendChild(divLastName);
    divLastName.className = 'col m-3';

    const labelLastName = document.createElement('label');
    divLastName.appendChild(labelLastName);
    labelLastName.setAttribute('for', 'last-name');
    labelLastName.className = 'form-label';
    labelLastName.textContent = 'Nom : ';

    const lastName = document.createElement('input');
    divLastName.appendChild(lastName);
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('class', 'form-control');
    lastName.id = "last-name"
    lastName.required = true;

    // Set address field
    const divAddress = document.createElement('div');
    contactForm.appendChild(divAddress);
    divAddress.className = 'col m-3';

    const labelAddress = document.createElement('label');
    divAddress.appendChild(labelAddress);
    labelAddress.setAttribute('for', 'address');
    labelAddress.className = 'form-label';
    labelAddress.textContent = 'Adresse : ';

    const address = document.createElement('input');
    divAddress.appendChild(address);
    address.setAttribute('type', 'text');
    address.setAttribute('class', 'form-control');
    address.id = "address"
    address.required = true;

    // Set city field
    const divCity = document.createElement('div');
    contactForm.appendChild(divCity);
    divCity.className = 'col m-3';

    const labelCity = document.createElement('label');
    divCity.appendChild(labelCity);
    labelCity.setAttribute('for', 'city');
    labelCity.className = 'form-label';
    labelCity.textContent = 'Ville : ';

    const city = document.createElement('input');
    divCity.appendChild(city);
    city.setAttribute('type', 'text');
    city.setAttribute('class', 'form-control');
    city.id = "city"
    city.required = true;

    // Set email field
    const divEmail = document.createElement('div');
    contactForm.appendChild(divEmail);
    divEmail.className = 'col m-3';

    const labelEmail = document.createElement('label');
    divEmail.appendChild(labelEmail);
    labelEmail.setAttribute('for', 'email');
    labelEmail.className = 'form-label';
    labelEmail.textContent = 'Email : ';

    const email = document.createElement('input');
    divEmail.appendChild(email);
    email.setAttribute('type', 'text');
    email.setAttribute('class', 'form-control');
    email.id = "email"
    email.required = true;

    // Validity check : first-name, last-name, city
    function isValid(value) {
        return /^[a-zA-Z '.-]*$/.test(value);
    };

    firstName.addEventListener('change', function (event) {
        if (isValid(firstName.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    });

    lastName.addEventListener('change', function (event) {
        if (isValid(lastName.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    });

    city.addEventListener('change', function (event) {
        if (isValid(city.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    });

    // Validity check : post address
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    };

    address.addEventListener('change', function (event) {
        if (validAddress(address.value)) {
        } else {
            alert("Aucun symbole n'est autorisé.")
            event.preventDefault()
        }
    });

    // Validity check : email
    function validEmail(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    };

    email.addEventListener('change', function (event) {
        if (validEmail(email.value)) {
        } else {
            alert("Veuillez saisir une adresse mail valide (exemple : user@mail.com).")
            event.preventDefault()
        }
    });

    // Set "submit-form" button
    const divSubmit = document.createElement('div');
    contactForm.appendChild(divSubmit);
    divSubmit.className = 'col m-3 text-center';

    let submit = document.createElement('button');
    divSubmit.appendChild(submit);
    submit.type = 'submit';
    submit.className = 'btn btn-secondary my-3';
    submit.id = 'valid';
    submit.textContent = "Valider ma commande";

    // Action : if form is valid
    submit.addEventListener("click", function (event) {
        if (
            isValid(firstName.value) &&
            isValid(lastName.value) &&
            validAddress(address.value) &&
            isValid(city.value) &&
            validEmail(email.value)
        ) {
            event.preventDefault();

            // Create object : "contact" 
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }
            console.log(contact);

            // Create object : "products" 
            let products = [];
            for (storedTeddy of storedTeddies) {
                let itemsId = storedTeddy.teddyId;
                console.log(itemsId);
                let itemsNb = storedTeddy.inCart;
                console.log(itemsNb)
                for (let i = 0; i < itemsNb; i++) {
                    console.log(itemsId)
                    products.push(itemsId)
                }

            }
            console.log(products);

            // Create object : "contact" + "products"

            let send = {
                contact,
                products,
            }
            console.log(send)

            sendData(send);

        }


    });

}
