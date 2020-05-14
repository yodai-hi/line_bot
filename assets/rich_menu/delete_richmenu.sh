#!/bin/bash
. .env

curl -v -X DELETE https://api.line.me/v2/bot/user/all/richmenu \
-H "Authorization: Bearer $(eval echo "${RICH_TOKEN}")"
