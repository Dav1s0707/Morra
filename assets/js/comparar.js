const senha = document.getElementById("senha")
const senha2 = document.getElementById("senha2")

function comparar(){
    if(senha.value!=senha2.value){
        senha2.setCustomValidity("70 70 mas n consegue")
    }else{
        senha2.setCustomValidity('')
    }

}

senha.onchange = comparar
senha2.onkeyup = comparar