# fx_query

We'll now as free server

In order to let telegram know that our bot has to talk to our server now's usrl whenever it receives any messages:

`curl -F "url=<our_server_url>/new-message"  https://api.telegram.org/bot<our_telegram_token>/setWebhook`

Ex:

`curl -F "url=https://nodefxquery-tvtepccvnm.now.sh/new-message"  https://api.telegram.org/bot689990809:AAFeUxR6wlnbH7YgIlhLeNeoDR0iHILMmlw/setWebhook`
