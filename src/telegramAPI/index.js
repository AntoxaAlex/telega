const bot= require("./helpers/installTelegramBot")
const {start,stop,getBalance,logBotWork} = require("./controllers/userController")

bot.onText(/\/start(.+)/,start)
bot.onText(/\/stop/,stop)
bot.onText(/\/balance/,getBalance)
bot.onText(/\/logs/,logBotWork)


