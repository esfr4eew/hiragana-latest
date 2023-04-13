const { Telegraf } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bot = new Telegraf('5994781202:AAGCdZRdXl_5VzPCp04_MzGoddCtIkFA_NE');

bot.start(ctx => {
    console.log(ctx.update.message.from)
})

app.post('/create', (req, res) => {
    const {
        firstName,
        lastName,
        company,
        addr1,
        addr2,
        city,
        country,
        zip,
        contact,
        email,
        additional,
        orderId
    } = req.body
    const adminId = 5035086715;
    bot.telegram.sendMessage(adminId, `
firstName: ${firstName}
lastName: ${lastName}
company: ${company}
addr1: ${addr1}
addr2: ${addr2}
city: ${city}
country: ${country}
zip: ${zip}
contact: ${contact}
email: ${email}
additional: ${additional}
orderId  : ${orderId}
    `);
    res.send('ok')
})

// запускаем сервер Express
app.listen(4444, () => {
    console.log('Бот запущен на порту 4444');
});

// запускаем бота Telegraf
bot.launch();
