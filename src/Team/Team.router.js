const express = require("express");
const Project = require("../Project/Project.modal");

const app = express.Router();

app.get("/:id", async (req, res) => {
 

  try {
    let id  = req.params.id;
    let projects = await Project.find({ projectAdmin : id }).populate('teamMembers');
    console.log(projects);
    // projects.forEach(x=> console.log(x.teamMembers));
    let arr = [];
    projects.forEach(x=> arr.push(...x.teamMembers));
    // console.log(arr);
    res.status(200).send(arr);

    // console.log(projects);
    // res.send('hahah');

    // let allmembers = [];
    // projects.forEach(x=>  allmembers.push(...x.teamMembers)  );
    // allmembers.map(x => {x}).forEach(x=> x.populate);

    // res.status(200).send(allmembers);
    console.log("");


  } catch (e) {
    res.status(401).send(e.message);
  }
});



module.exports= app;