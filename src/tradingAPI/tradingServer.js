const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const monitorPrice = require("./helpers/startTrading")
const botInit = require("./helpers/botInit")

require('dotenv').config({path:"C:\\Users\\antox\\Desktop\\Projects\\telega\\.env"})

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

let intervalID
let web3
let uniswapFactoryContract
let kyberRateContract

const PORT = process.env.PORT

app.post("/start/:pollingInterval",(req,res)=>{
    const pollingInterval = req.params.pollingInterval
    intervalID = setInterval(async ()=>{
       await monitorPrice(web3,uniswapFactoryContract,kyberRateContract)
    },pollingInterval)
    res.json({res:"Start trading..."})
})

app.post("/stop",(req, res)=>{
    clearInterval(intervalID)
})


app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
    botInit().then(result=>{
        web3 =result.web3
        uniswapFactoryContract = result.uniswapFactoryContract
        kyberRateContract = result.kyberRateContract

    }).catch(err=>{
        throw new Error(err.message)
    })
})