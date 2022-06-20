const revelar = document.getElementById("revelar")
const senha = document.getElementById("senha")

function revelarSenha(){
    const tipo = senha.getAttribute('type')
    if (tipo == "password"){
        senha.setAttribute('type','text')
        revelar.setAttribute('class','bi bi-bug btn')
    }else{
        senha.setAttribute('type','password')
        revelar.setAttribute('class','bi bi-bug-fill btn')
    }
}
revelar.onclick = revelarSenha