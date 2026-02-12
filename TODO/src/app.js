const express = require("express")
const app = express();
const path =require("path");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.set("views","src/views")

const {readData,AddTask, DeleteTask, findTask, UpdateTask} = require("./Database/Todo")


app.get("/",(req,res)=>{
    res.render("Main",{Task:readData()})
})

app.get("/add",(req,res)=>{
    res.render("addTask",{error:null})
})

app.post("/add",(req,res)=>{
    const {task} = req.body;
    if(!task){
      return res.render("addTask",{error:"Task Must be Required"})
    }   
    AddTask(task)
    res.redirect("/")
})

app.get("/delete/:id", (req, res) => {
    const id = Number(req.params.id);

//    if (isNaN(id) || req.params.id.length !== 13) {
//     return res.redirect("/");
// }


    DeleteTask(id);
    res.redirect("/");
});


app.get("/update/:id",(req,res)=>{
    const id = req.params.id;
    //console.log(id)
    const user = findTask(Number(id))
    //console.log("User : ",user)
    res.render("update",{user})
})


app.post("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {task} = req.body;
    //console.log("ID : ",id)
    //console.log("Task : ",task)

    UpdateTask(Number(id),task)

    // res.redirect(`/update/${id}`)
    res.redirect(`/`)
})

// app.get("/delete/:id",(req,res)=>{
//     //console.log(req.params.id)
//     if(req.params.id<1000000000){
//         return res.render("Main",{error:"Not a valid Id "})
//     }
//     DeleteTask(Number(req.params.id))
//     res.redirect("/")
    
// })
module.exports = {app}
