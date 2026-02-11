const path = require("path")
const fs = require("fs")

const mypath = path.join(__dirname,"Data.json")

function writeData(data){
    const mydata = JSON.stringify(data,null,2)
    fs.writeFileSync(mypath,mydata)
}

function readData(){
    const data = fs.readFileSync(mypath,"utf-8")
    console.log(data)
    return JSON.parse(data);
}

function AddTask(data){

    const AllTask = readData()
    AllTask.push({task:data,id:Date.now()})
    writeData(AllTask)
}

function findTask(id){
    const AllTask = readData()
    const data = AllTask.find((value)=>{
        return value.id===id
    })
    if(!data){
        console.log("No Data")
        return;
    }
    console.log(data)
   
}

function DeleteTask(id){
    const AllTask = readData()
    const newTask = AllTask.filter((value)=>{
        return value.id !== id
    })
    writeData(newTask)
}

function UpdateTask(id,data){
      const AllTask = readData();
      const newTask = AllTask.map((value)=>{
        if(value.id === id){
            return {...data,id}
        }else{
            return value
        }
      })
      writeData(newTask)
}


module.exports = {readData,writeData,AddTask,DeleteTask,UpdateTask,findTask}