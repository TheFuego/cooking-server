const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

async function sendSearch() {
    const data = {string: search.value}
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/search', options)
    const response = await res.json()
    console.log(response)
}

async function getSearch() {
    const res = await fetch('/search')
    const response = await res.json()
    result = response

    console.log(result)
}

searchBtn.onclick = function() {
    sendSearch()

    setTimeout(function(){ 
        getSearch()
    }, 1000);
}
