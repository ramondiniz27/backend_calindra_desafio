const express  = require('express');
const bodyParser = require('body-parser')
const routes = require('./src/config/routes/routes')

const app = express()
const port  = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('ok')
})
app.use('/', routes)
app.listen(port, () =>{
  console.log(`API is running on port ${port}`)
})