/*const recipe = {
    ingredients: [
        "950 g brašna",
        "1/2 l vode",
        "80 ml ulja",
        "2 kašičice soli",
        "2 kašičice šećera",
        "1/2 kockice kvasca"
    ],
    steps: [
        "U toploj vodi vodi staviti kašičicu šećera i izdrobiti kvasac. Sačekati da naraste. U brašno staviti so, ostatak šećera, ulje, i vodu sa kvascem. Umesiti testo (ako je potrebno dodati još brašna). Podeliti testo na 2 dela i ostaviti da naraste (odprilike 15-ak minuta).",
        "Oba pleha dobro premazati uljem (da se ne bi testo zalepilo) i razvući testo rukama. Po testu sipatu kečap i ravnomerno razmazati.",
        "Zatim staviti: šunku (na polukrugove), čajnu kobasicu, slaninicu, pečurke (na listiće), masline (količina po želji). Na svaku 1/8 testa rabiti jaje (po želji). Posuti sa origanom i obilno nastrugati kačkavalj.",
        "Staviti da se peče u prethodno zagrejanu rernu na 190 stepeni."
    ],
    name: "Testo za picu",
    author: "DG",
    img: {},
    desc: "Postoji mnoštvo recepata za testo za pizzu, od najednostavnijeg hlebnog pa sa raznim dodacima i raznim vrstama brašna. Pre mnogo godina sam negde na internetu pronašla ovaj recept, zapisala i probala i više ne eksperimentišem. Jednostavno najpribližnije italijanskom. Evo želim da ga podelim sa vama."
}*/

const section = document.querySelector('section')
const aside = document.querySelector('aside')
const info = document.getElementsByClassName('info')
let recipe
let image

if(localStorage.recipeStorage != undefined) {
    recipe = JSON.parse(localStorage.recipeStorage)
}


function createHTML(x){
    for(let i = 0; i < x.steps.length; i++){
        let count = i+1
        section.innerHTML += '<div class="step"> <div class="step--line"> </div> <h3>'+count+'</h3> <p>'+x.steps[i]+'</p> </div>'
    }

    const list = document.createElement('ul')

    for(let i = 0; i < x.ingredients.length; i++){
        const ingredient = document.createElement('li')
        ingredient.textContent = x.ingredients[i]
        list.appendChild(ingredient)
    }

    aside.appendChild(list)

    info[0].textContent = x.name
    info[1].textContent = x.author
    info[2].textContent = `${x.time} minutes`
    info[3].textContent = x.desc

    console.log(x);
    document.getElementById('image').innerHTML = '<img src="uploads/'+x.image+'.png">';
}

createHTML(recipe)
