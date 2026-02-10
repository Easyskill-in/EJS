const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "..", "public")))

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("index", {
        Data:
            [
                {
                    username: "Easyskill",
                    id: 1
                },
                {
                    username: "Easyskill2",
                    id: 2
                },
                {
                    username: "Easyskill3",
                    id: 3
                }
            ]
    })
})


app.get("/about",(req,res)=>{
    res.render("about",{username:"MYNAME"})
})

app.get("/h",(req,res)=>{
    res.render("header",{data:"<h1>Hello</h1>"})
})

module.exports = { app }

// app.set("views","public")
// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"..","public","index.html"))
// })

//https://ember-change-44c.notion.site/EJS-with-Express-Complete-Notes-30314902ebd4802aba6ec95299370ebf