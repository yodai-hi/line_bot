#!/bin/bash
. .env

curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H "Authorization: Bearer $(eval echo "${RICH_TOKEN}")" \
-H 'Content-Type: application/json' \
-d @assets/menu.json \
| jq -r '.richMenuId' \
| cat \
| { read -r url ; curl -v -X POST https://api-data.line.me/v2/bot/richmenu/"$url"/content \
-H "Authorization: Bearer $(eval echo "${RICH_TOKEN}")" \
-H "Content-Type: image/png" \
-T ./assets/menu.png; \
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/"$url" \
-H "Authorization: Bearer $(eval echo "${RICH_TOKEN}")"; }
