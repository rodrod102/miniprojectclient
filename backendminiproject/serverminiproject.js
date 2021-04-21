let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());
 
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
 
let vegetations = {
   list: [
       { "id": 1, "name": "rose", "price": 50 },{"id": 2, "name": "ruk", "price": 40}
       ]
}
 
router.route('/vegetation')
   .get((req, res) => res.json(vegetations))
 
   .post((req, res) => {
       console.log(req.body)
       let newVegetation = {}
       newVegetation.id = (vegetations.list.length)?vegetations.list[vegetations.list.length - 1].id + 1:1
       newVegetation.name = req.body.name
       newVegetation.price = req.body.price
       vegetations = { "list": [...vegetations.list, newVegetation] }
       res.json(vegetations)
   })
 
router.route('/vegetation/:vegetation_id')
   .get((req, res) => {
       const vegetation_id = req.params.vegetation_id
       const id = vegetations.list.findIndex(item => +item.id === +vegetation_id)
       res.json(vegetations.list[id])
   })
   .put((req, res) => {
       const vegetation_id = req.params.vegetation_id
       const id = vegetations.list.findIndex(item => +item.id === +vegetation_id)
       vegetations.list[id].name = req.body.name
       vegetations.list[id].price = req.body.price
       res.json(vegetations)
   })
 
   .delete((req, res) => {
       const vegetation_id = req.params.vegetation_id
       console.log('bearId: ',vegetation_id)
       vegetations.list = vegetations.list.filter(item => +item.id !== +vegetation_id)
       res.json(vegetations)
   })
 
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8000, () => console.log('server is running...'))