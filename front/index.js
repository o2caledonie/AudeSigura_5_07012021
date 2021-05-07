const img = document.getElementsByClassName("card-img-top");

fetch("http://localhost:3000/api/teddies")
.then(res => {
    if(res.ok){
        res.json().then(data => {
            img.src = data[0].imageUrl
        })
    } else {
        console.log("ERREUR");
        document.getElementById('erreur').innerHTML = "Erreur :("
    }
})
    