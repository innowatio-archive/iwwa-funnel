# Innowatio Rest API

## How to Run

After cloning the repository run:
npm install - for build dependencies
node index.js - to start the server on port 8012

# Insert Example
`curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"DataLettura\":\"2015-07-01T16:16:00Z\",\"IdVariabile\":\"AE1C\",\"Impianto\":\"ID1122\",\"Valore\":1234,\"Data\":\"2015-07-01T16:16:00Z\"}" "http://localhost:8012/api/misuras"`
