const TelegramApi = require('node-telegram-bot-api')
 
const {gameOptions, againOptions, token} = require("./options.js")

const bot = new TelegramApi(token, {polling: true})

const chats = {};




// console.log(bot.getMe());

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `угадай цифру от 0 до 9`);
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `gaday`, gameOptions);
}

const start = () => {

  bot.setMyCommands([ // список команд 
    {command: "/start", description: "Приветствие"},
    {command: "/info", description: "описание"},
    {command: "/game", description: "description"}
  ])

  bot.on('message', async msg => {
    console.log(msg);
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
      startGame(chatId);
    }

    // return bot.sendMessage(chatId, `моя твоя не понимать`)
  })

  bot.on("callback_query", msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === "/again"){
      return startGame(chatId);
    }
    if(data == chats[chatId]) {
      return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions)
    } else {
      return bot.sendMessage(chatId, `Правильная цифра ${chats[chatId]}`, againOptions)
    }
    // console.log(msg);
  })
}

start();