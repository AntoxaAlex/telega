const bot = require("../helpers/installTelegramBot")
const auth = require("../helpers/auth")
const axios = require("axios")
const path = require("path")
const userController = {
    start:async (msg,match) => {
        const {id} = msg.chat
        const pollingInterval = match[0].split(" ")[2]
        console.log(pollingInterval)
        try {
            if(!auth(id,match) && !pollingInterval){
                await bot.sendMessage(id,"Wrong credentials")
            }else{
                const config= {
                    headers: {
                        "Content-Type":"application/json"
                    }
                }
                const res = await axios.post(`http://localhost:5000/start/${pollingInterval}`,config)
                await bot.sendMessage(id,res.data.res)
            }
        }catch (e) {
            await bot.sendMessage(id,`Error: ${e.message}`)
            throw new Error(e)
        }
    },
    stop:async (msg) => {
        const {id} = msg.chat
        try {
            const config= {
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post(`http://localhost:5000/stop`,config)
            await bot.sendMessage(id,res.data.res)
        }catch (e) {
            await bot.sendMessage(id,`Error: ${e.message}`)
            throw new Error(e)
        }
    },
    getBalance:async (msg,match) => {

    },
    logBotWork:async (msg,match) => {
        const {id} = msg.chat
        try {
            await bot.sendDocument(id,"C:\\Users\\antox\\Desktop\\Projects\\telega\\src\\logs\\logs.log")
        }catch (e) {
            await bot.sendMessage(id,`Error: ${e.message}`)
            throw new Error(e)
        }
    }
}

module.exports = userController