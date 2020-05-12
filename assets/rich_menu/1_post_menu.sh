curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer uAWA2NBeYBjXTqld2PQ5dLuUD7ppVroQdEFGQx9s8DQtaF+iWlnRMVxGjK7Y2wLriNFRd1SUCO77v0+aKk722mhZY6Z856aOEI2DqPeLnwH4qGdw517BVAahckkb9bZ//+KeWO++mOfVnUuCIj9mPQdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
  "size": {
    "width": 2500,
    "height": 843
  },
  "selected": true,
  "name": "menu",
  "chatBarText": "Menu",
  "areas": [
    {
      "bounds": {
        "x": 70,
        "y": 58,
        "width": 726,
        "height": 726
      },
      "action": {
        "type": "postback",
        "text": "簡易診断",
        "data": "{\"action\":\"diagnosis\", \"status\":\"start\"}"
      }
    },
    {
      "bounds": {
        "x": 891,
        "y": 58,
        "width": 726,
        "height": 726
      },
      "action": {
        "type": "postback",
        "text": "予約",
        "data": "{\"action\":\"booking\", \"status\":\"start\"}"
      }
    },
    {
      "bounds": {
        "x": 1712,
        "y": 62,
        "width": 726,
        "height": 722
      },
      "action": {
        "type": "postback",
        "text": "連絡",
        "data": "{\"action\":\"contact\", \"status\":\"start\"}"
      }
    }
  ]
}'
