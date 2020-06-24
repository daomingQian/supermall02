const express = require("express")
const app = express()

app.use(express.static("public"))

app.listen("3200",()=>{
    console.log("3200的老铁行动了")
})

