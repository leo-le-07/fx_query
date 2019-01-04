var express = require('express')
const logger = require('morgan');
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

const botToken = '689990809:AAFeUxR6wlnbH7YgIlhLeNeoDR0iHILMmlw';

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  console.log('insideeeee')
  return res.status(200).send({
    message: 'Welcome to the beginning of nothingness.!',
  });
})

app.post('/start_bot', async function(req, res) {
  try {
    const { message } = req.body

    if (!message) return res.end();

    const messageLower = message.text.toLowerCase();
    console.log("message", messageLower);

    const sendMessage = (content) => (
      axios
        .post(
          "https://api.telegram.org/bot689990809:AAFeUxR6wlnbH7YgIlhLeNeoDR0iHILMmlw/sendMessage",
          {
            chat_id: message.chat.id,
            text: content
          }
        )
        .then(response => {
          // We get here if the message was successfully posted
          console.log('Message posted')
          res.end('ok')
        })
        .catch(err => {
          // ...and here if it was not
          console.log('Error :', err)
          res.end('Error :' + err)
        })
    );
    const getPair = (query) => {
      const pair = query.toUpperCase();
      return pair;
    };
    const response = await axios.get("https://forex.1forge.com/1.0.1/quotes?pairs="+getPair(messageLower)+"&api_key=W5rK1e0lzK1FNLU75E8KbkPhMLq1zADu");
    const { symbol, bid, ask, price } = response.data[0];
    const content = symbol + " - price " + price + " ("+bid+"-"+ask+")";
    return sendMessage(content);
  } catch(e) {
    const errorMessage = "Loi roi!!!."
    console.log('=== ERROR: ', e);
    return sendMessage(errorMessage);
  }
});

// Finally, start our server
app.listen(3333, function() {
  console.log('Telegram app listening on port 3333!')
})
