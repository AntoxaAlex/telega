const TelegramBot = require("node-telegram-bot-api");
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

module.exports = bot