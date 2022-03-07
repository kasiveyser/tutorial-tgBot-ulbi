const TelegramApi = require('node-telegram-bot-api')

const token = "5205722874:AAEa_QNbQsZ5rhNLOrLaWboqldH0OKF2XuQ"
 
const bot = new TelegramApi(token, {polling: true})

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: "text button", callback_data: "in"}]
    ]
  })
}

const start = () => {

  bot.setMyCommands([
    {command: "/start", description: "описание"},
    {command: "/info", description: "описание"},
    {command: "/game", description: "description"}
  ])

  bot.on('message', async msg => {
    console.log(msg)
    const text = msg.text;
    const chatId = msg.chat.id;

    // await bot.sendMessage(chatId, `ты написал мне ${text}`)  

    if(text === "/start"){
      return bot.sendMessage(chatId, `привет, я учебный бот`)
    }

    if(text === "/info"){
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }

    if(text === "/game"){
      await bot.sendMessage(chatId, `угадай цифру от 0 до 9`);
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, `gaday`, gameOptions);
    }

    return bot.sendMessage(chatId, `моя твоя не понимать`)
  })
}

start();