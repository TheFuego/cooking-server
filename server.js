const express = require('express')
const Datastore = require('nedb')
const app = express()
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, `${name}.png`)
  }
})

const upload = multer({ storage: storage })
const port = 5000


let name = "default"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))
app.use(express.json())

const database = new Datastore('recipes.db')
database.loadDatabase()

app.post('/api', (req, res) => {
  let request = req.body
  database.insert(request)

  console.log(request)
  name = req.body.image

  res.json({ message: 'Recipe sent' }) 
  
})

app.post('/photo', upload.single('photo'), function (req, res, next) {
  console.log(req.body.image)
  res.send({message: "Photo sent"})
})

let search

app.post('/search', (req, res) => {
  search = req.body
  console.log(search)

  res.json({ message: 'Search sent' }) 
  
})

app.get('/recipe', (req, res) => {
  database.find({}, (err, docs) => {
    res.json({docs})
  })
})

app.get('/search', (req, res) => {
  let searchFor = search.string
  console.log(searchFor)

  database.find({name: searchFor}, (err, docs) => {
    console.log(docs)
    res.json({docs})
  })
})