//Get teddies in cart from localStorage
function getTeddiesCountInCart(){
    let storedTeddies = JSON.parse(localStorage.getItem('storedTeddies'))
    console.log(storedTeddies)
    let teddiesCountInCart = 0;
    if (storedTeddies === null){
        return teddiesCountInCart;
    }
    for(let storedTeddy of storedTeddies) {
        let teddiesCount = parseInt(storedTeddy.inCart);
        teddiesCountInCart = teddiesCountInCart + teddiesCount
    }
    
    console.log(teddiesCountInCart)
    return teddiesCountInCart;
}

// Update DOM
function updateTeddiesCount(total, selector) {
    const badge = document.querySelector(selector);
    badge.innerHTML = total;
}

// Update Cart Count
function updateCartCount(){
    let total = getTeddiesCountInCart();
    let selector = '.badge';
    updateTeddiesCount(total,selector);
}

updateCartCount()