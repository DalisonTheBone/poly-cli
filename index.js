
// Librarys
const readline = require("readline")
const iconv = require("iconv-lite");
const { program } = require('commander')
require('dotenv').config()

// CLI Commands
program
    .option('-n, --nickname <nickname>', 'output extra debugging')
    .option('-b, --botid <botid>', 'small pizza size')
    .option('-c, --cookie <type>', 'flavour of pizza')

program.parse(process.argv);

// Constants
const BASE_URL = "https://api.polybuzz.ai/"
const OPTIONS  = program.opts();
const COOKIE   = OPTIONS.cookie   || process.env.COOKIE
const NICKNAME = OPTIONS.nickname || process.env.NICKNAME || "User"
const BOTID    = OPTIONS.botid    || process.env.BOTID

// Exit the program if not setup properly
if (!BOTID || !COOKIE) {
    console.warn(`One or more not included but should be.\nBOTID: ${BOTID || "Not Included."}\nCOOKIE: ${COOKIE || "Not Included."}`)
    process.exit()
}

// Functions
async function MessageAi(BotId, Text, SelectId) {
    
    let ResponceString = ""
    let MessageData = `currentChatStyleId=1&mediaType=2&needLive2D=2&secretSceneId=${BotId}&speechText=${Text}`

    if (SelectId) {

        MessageData = `currentChatStyleId=1&mediaType=2&needLive2D=2&secretSceneId=${BotId}&speechText=${Text}&selectId=${SelectId}`

    }

    const res = await fetch(BASE_URL + "api/conversation/msgbystream", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/x-www-form-urlencoded",
            "cookie": COOKIE
        },
        "body": MessageData,
        "method": "POST"
    })

    const buffer = await res.arrayBuffer()
    const decodedResponse = iconv.decode(Buffer.from(buffer), "utf-8");
    const fragments = decodedResponse.trim().split(/(?<=})\s*(?={)/)

    const ParsedJson = fragments.map((fragment) => {

        return JSON.parse(fragment)

    })

    for (let i=0; i<ParsedJson.length; i++) {

        const Token = ParsedJson[i]

        ResponceString = ResponceString + Token.content

    }

    return decodeURIComponent(ResponceString)

}

async function GetBotData(BotId) {
    
    const res = await fetch(BASE_URL + "api/conversation/init", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": COOKIE
        },
        "body": "secretSceneId=" + BotId,
        "method": "POST"
    })

    const Data = await res.json()
    //console.log(Data)

    const newData =  {
        "CharacterName": Data.data.sceneName,
        "Intro": Data.data.sceneBrief,
        "FirstMessage": Data.data.speechText
    }

    return newData

}

async function GetChatHistory(BotId, PageSize, PageNumber) {
    
    const res = await fetch(BASE_URL + "api/conversation/record", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": COOKIE
        },
        "body": "secretSceneId=" + BotId + "&rn=" + PageSize || 20 + "&pn=" + PageNumber || 1,
        "method": "POST"
    })

    const Data = await res.json()
    const msglist = Data.data.msgList

    const ResponceData = {

        "HasMoreMessages": Data.data.hasMore == 1,
        "MessageList": msglist,
        "MessageCount": msglist.length

    }

    return ResponceData

}

async function loop(BotId, BotName, Nickname) {

    const Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    Interface.question(`${Nickname}: `, async Message => {

        const AiResponce = await MessageAi(BotId, Message)
        console.log(`\n${BotName}: ${AiResponce}\n`)

        Interface.close()

        loop(BotId, BotName, Nickname)

    })

}

async function start(BotId, Nickname) {

    const BotData = await GetBotData(BotId)
    const SentMessages = await GetChatHistory(BotId, 1000000)
    const MessageList  = SentMessages.MessageList
    const MessageCount = SentMessages.MessageCount
    const BotName = BotData.CharacterName

    console.log(`Talking To: ${BotName}\nIntro: ${BotData.Intro}\n\n`)
    console.log(`${BotName}: ${BotData.FirstMessage}\n`)

    for (i=1; i<MessageCount; i++) {

        const MessageBlock = MessageList[MessageCount - (i + 1)]
        const Message = MessageBlock.content
        
        if (MessageBlock.role == 1) {

            console.log(`${Nickname}: ${Message}\n`)

        } else {

            console.log(`${BotName}: ${Message}\n`)

        }

    }

    loop(BotId, BotName, Nickname)

}

// Code
console.clear()
start(BOTID, NICKNAME)
