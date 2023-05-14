const form = document.getElementById("form");
const image = document.getElementById("img");
const input = document.getElementById("input");
const imgForm = document.getElementById("imgForm");
const inputField = document.getElementById("input-field");
const ingredients = document.getElementById("ingredients");
const submitBtn = document.getElementById("submitBtn");
const nextStep = document.getElementById("nextStep");
const mainList = document.getElementsByClassName('inputs')

let recipe = {
    ingredients: [],
    steps: []
}

let imageData


function timeStamp() {
    const date = new Date()

    const day = String(date.getDate())
    const month = String(date.getMonth()+1)
    const year = String(date.getFullYear())

    return day + "_" + month + "_" + year
}

input.addEventListener("keypress", function(x){
    if(x.key == "Enter" || x.key == "," && input.value != ""){
        console.log('added', input.value)
        const newIngredient = document.createElement('div')
        newIngredient.classList.add('ingredient')
        newIngredient.textContent = input.value
        
        const xButton = document.createElement('button')
        xButton.textContent = '✖'
        newIngredient.appendChild(xButton)
        xButton.onclick = function(){
            newIngredient.remove()
        }

        inputField.insertBefore(newIngredient, input);

        input.value = ""
    }
})

nextStep.onclick = function(){
    const newStep = document.createElement('div')
    newStep.classList.add('step-container')
    newTextarea = document.createElement('textarea')
    newTextarea.classList.add('steps')
    newStep.appendChild(newTextarea)

    let counter = document.getElementsByClassName('step-container').length + 1
    newStep.innerHTML += '<h1 class="step-counter-h1">'+counter+'</h1>'

    const xButton = document.createElement('button')
    xButton.textContent = '✖'
    newStep.appendChild(xButton)

    form.insertBefore(newStep, nextStep);

    xButton.onclick = function(){
        newStep.remove()
        const steps = document.getElementsByClassName('step-counter-h1')
        for(let i = 0; i < steps.length; i++){
            let counter = i+2
            steps[i].innerHTML = counter
            console.log(steps[i])
        }
    }
}

async function saveRecipe() {
    const stepsList = document.getElementsByClassName('steps')
    const ingredientsList = document.getElementsByClassName('ingredient')

    for(let i = 0; i < ingredientsList.length; i++){
        recipe.ingredients.push(ingredientsList[i].innerHTML.split('<')[0])
    }
    for(let i = 0; i < stepsList.length; i++){
        recipe.steps.push(stepsList[i].value)
    }
    recipe.name = mainList[0].value
    recipe.author = mainList[1].value
    recipe.time = mainList[2].value
    recipe.desc = document.getElementById('desc').value

    let imgString = recipe.name + "_" + recipe.author
    recipe.image = imgString.replaceAll(" ", "_") + "_" + timeStamp()
    console.log(recipe.image)

    localStorage.setItem("recipeStorage", JSON.stringify(recipe))
    return recipe
}

async function sendData() {
    const data = await saveRecipe()
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/api', options)
    const response = await res.json()
    console.log(response)
}

async function sendImage() {
    const formData = new FormData(imgForm);
    //console.log(formData)

    const options = {
        method: 'POST',
        body: formData
    };

    const res = await fetch('/photo', options)
    const response = await res.json()
    console.log(response.message)
    
    alert("Recipe submited!");
}

submitBtn.onclick = async function(){
    const stepsList = document.getElementsByClassName('steps')
    const ingredientsList = document.getElementsByClassName('ingredient')
    let canSave = true

    for(let i = 0; i < mainList.length; i++){
        switch(mainList[i].value){
            case '' :
                canSave = false
        }
    }

    for(let i = 0; i < stepsList.length; i++){
        switch(stepsList[i].value){
            case '' :
                canSave = false
        }
    }

    switch(document.getElementById('desc').value){
        case '' :
            canSave = false
    }

    switch(ingredientsList.length){
        case 0 :
            canSave = false
    }

    switch(image.files[0]){
        case undefined :
            canSave = false
    }

    if(canSave == true){
        sendData()
        setTimeout(function(){ 
            sendImage()
        }, 1000);
        form.innerHTML="<h1>Submiting...<h1>"
        //window.location.href = "recipe.html"
    }else if(canSave == false){
        alert("You must fill all fields")
    }
}