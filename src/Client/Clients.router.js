const express = require('express');
const Client = require('./Clients.modal');


const app = express.Router();


app.get('/', async (req, res)=>{
    try{
        const clients = await Client.find({}, {description: 0})
        res.status(200).send(clients);
    }
    catch(e){
        console.log(e);
        res.status(400).send('Error');
    }
})
app.post('/', async (req, res)=>{
    try{
        const newClient = await Client.create(req.body);
        res.status(200).send(newClient);
    }
    catch(e){
        res.status(401).send(e.message);
    }
})

app.patch('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
       let updatedClient = await Client.findByIdAndUpdate(id, req.body, {new: true});
       res.status(200).send(updatedClient);
    }
    catch(e){
        res.status(401).send(e.message);
    }
})

app.delete("/:id" , async (req, res)=>{
    try{
        const id = req.params.id;
        const del = await  Client.findByIdAndDelete(id);
        res.status(200).send(del);
    }
    catch(e){
        res.status(401).send(e.message)
    }
})

module.exports = app;


// const authMiddleware = async(req, res, next) => {
//     const token = req.headers.token;
//     if (token) {
//       try {
//           let [id, email, password] = token.split(':');
//           const user = await User.findById(id);
//           if(user.email==email && user.password==password){
//               next();
//           }
//           else{
//               res.status(401).send("Missing Permission");
//           }
//       } catch {}
//     } else {
//       return res.status(401).send("user not found");
//     }
//   };

//   app.get("/", async (req, res) => {
//     const users = await User.find({}, { password: 0 });
//     return res.send(users);
//   });

//   app.post("/", async (req, res) => {
//     try {
//       const createdUser = await User.create(req.body);
//       return res.send(createdUser);
//     } catch (e) {
//       console.log(e.message);
//       console.log("haha");
//     }
//   });

//   app.use(authMiddleware);

//   app.get("/:id", async (req, res) => {
//       let {id} = req.params;
//       const user = await User.findById(id);
//       return res.send(user);
//   });

//   app.delete("/:id", async (req, res) => {
//       let {id} = req.params;
//       await User.deleteOne({_id: id});
//       res.send("successful")
//   });

//   module.exports = app;
