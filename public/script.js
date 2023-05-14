const main = document.querySelector('main')
let recipes

async function getRecipe() {
    const res = await fetch('/recipe')
    const response = await res.json()
    //localStorage.setItem("recipeStorage", JSON.stringify(response.docs[1]))
    recipes = response.docs

    main.innerHTML = ""
    for(let i = 0; i < recipes.length; i++) {
        createHTML(recipes[i])
        console.log(recipes[i])
    }

    openRecipe()
}

function createHTML(x) {
    const slide = document.createElement('div')
    slide.classList.add('slide')

    const image = document.createElement('div')
    image.classList.add('slide--img')
    image.innerHTML += '<img src="uploads/'+x.image+'.png">'
    
    slide.appendChild(image)

    image.onclick = function() {
        /*localStorage.setItem("recipeStorage", JSON.stringify(x))
        window.location.href = "recipe.html"*/
        console.log("aaa")
    }
    
    slide.innerHTML += `<h1>${x.name}</h1>`

    main.appendChild(slide)
}

function openRecipe() {
    const images = document.getElementsByClassName('slide--img')
    
    for(let i = 0; i < images.length; i++) {
        images[i].onclick = function() {
            localStorage.setItem("recipeStorage", JSON.stringify(recipes[i]))
            window.location.href = "recipe.html"
        }
    }
}

getRecipe()
