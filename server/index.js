const express = require('express')
const cors = require('cors')
const ctrl = require('./controllers/listController')
// const axios = require('axios')

const app = express()
const PORT = 4444

app.use(cors())
app.use(express.json())

app.delete('/api/delete/:id', ctrl.removeItem)
app.put('/api/items/:id', ctrl.editItem)
app.get('/api/items', ctrl.getItems)
app.post('/api/items', ctrl.addItem)

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))