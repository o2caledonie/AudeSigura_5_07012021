// / Get order ID
let orderId = localStorage.getItem('resOrder');
console.log(orderId);

// Get total cart price
let totalCartPrice = localStorage.getItem('totalCartPrice');
console.log(totalCartPrice);

// Order card setUp
const order = document.getElementById('order');
const orderTitle = document.createElement('h4');
order.appendChild(orderTitle);
orderTitle.textContent = "Nous avons le plaisir de vous annoncer que votre commande a bien été enregistrée";
orderTitle.className = 'card-title mt-3 text-center';

// order Recap
const recap = document.createElement('div');
order.appendChild(recap);
recap.className = 'card text-center';
recap.innerHTML = `<h5 class="card-header">Récapitulatif de votre commande :</h5>
<div class="card-body">
<p class="card-text">Numéro de commande : ${orderId}</p>
<p class="card-text">Montant total de votre commande : ${totalCartPrice / 100} €</p>`;

// Thanks
const thanks = document.createElement('p');
order.appendChild(thanks);
thanks.className = 'text-center m-3';
thanks.textContent = "Orinoco vous remercie pour votre commande. A très bientôt !"