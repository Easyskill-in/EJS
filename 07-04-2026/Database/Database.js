const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "Data.json")

function ReadData() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    // const data = fs.readFileSync(filePath, "utf-8")
    // return JSON.parse(data)
}

function WriteData(data) {
    const users = ReadData()
    users.push(data)
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
    return true
}

function DeleteData(id) {
    const users = ReadData()
    const newUsers = users.filter((value, index) => {
        return value.id !== id
    })
    fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2))
}

function FindById(id) {
    const users = ReadData()
    const User = users.find((value, index) => {
        return value.id === id
    })
    return User
}


function UpdateData(id, newData) {
    const users = ReadData()
    const newUsers = users.map((value, index) => {
        if (value.id === id) {
            return { ...newData, id }
        } else {
            return value
        }
    })
    fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2))
}


module.exports = { ReadData, WriteData, DeleteData, FindById, UpdateData }