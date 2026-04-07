const express = require('express');
const { WriteData, ReadData, DeleteData, FindById, UpdateData } = require('../Database/Database');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { name: 'Easyskill' });
});

app.get("/form", (req, res) => {
    res.render("form")
})

app.post("/submit", (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    WriteData({ username: username, password: password, id: Date.now() })
    res.redirect("/users")
})


app.get("/users", (req, res) => {
    console.log(ReadData().length)
    res.render("users", { users: ReadData() })
})

app.post("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log("ID : ", id, 239463246)
    DeleteData(id)
    res.redirect("/users")
})


app.get("/update/:id", (req, res) => {
    const user = FindById(Number(req.params.id))
    res.render("update", { user })
})
app.post("/update/:id", (req, res) => {
    const { username, password } = req.body
    UpdateData(Number(req.params.id), { username, password })
    res.redirect("/users")
})
// app.get("/greet/:name", (req, res) => {
//     console.log(req.params)
//     res.send(`Hello,${req.params.name}!`)
// })


module.exports = app;