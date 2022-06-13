#!/bin/bash

# Use tokei to generate metrics.json
echo $(tokei ./src -o json > metrics.json)

TOKEN="${GITHUB_TOKEN:-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}"
echo $TOKEN
exit 0
OWNER="hpicgs"
REPO="github-software-analytics-embedding"

IMG_PATH="sample.png"
PAYLOAD="{\"content\": \"$(base64 -w 0 $IMG_PATH)\", \"encoding\": \"base64\"}"
echo $PAYLOAD > "$IMG_PATH.json"

# Create BLOB for the metrics
create_blob=$(curl -X POST -H "Authorization: token $TOKEN" -H "Content-Type: application/json" -d @metrics.json "https://api.github.com/repos/$OWNER/$REPO/git/blobs")
echo $create_blob

# Create BLOB for the image
create_blob=$(curl -X POST -H "Authorization: token $TOKEN" -H "Content-Type: application/json" -d @$IMG_PATH.json "https://api.github.com/repos/$OWNER/$REPO/git/blobs")
echo $create_blob


#FILE_SHA="b304b71d8cf7a709831b4b2e0842c6218cd96fe5"
#curl -H "Accept: application/vnd.github.v3+json" -H "Authorization: token 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" https://api.github.com/repos/hpicgs/github-software-analytics-embedding/git/blobs/b304b71d8cf7a709831b4b2e0842c6218cd96fe5
