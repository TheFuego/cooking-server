const imageDiv = document.getElementById('image')
const nameDiv = document.getElementById('name')

imageDiv.onmouseover = function() {
    nameDiv.style.transition = "all 0.4s"
    nameDiv.style.opacity = "0.1"
}

imageDiv.onmouseleave = function() {
    nameDiv.style.opacity = "1"
}