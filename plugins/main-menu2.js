import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
const {
    proto,
    generateWAMessage,
    areJidsSameUser,
    prepareWAMessageMedia
} = (await import('@whiskeysockets/baileys')).default
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'

import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Africa/Nairobi').format('HH')
let wib = moment.tz('Asia/Karachi').format('HH:mm:ss')

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

    let user = global.db.data.users[m.sender]
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')
    let totaluser = Object.values(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(850)
    let greeting = ucapan()
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

    let str = `❤️ *hey ${name}, ${greeting}! Welcome to my menu!* 🥳
*╭═══〘 𝐒𝐓𝐀𝐑𝐊 𝐌𝐃 〙═══⊷❍*
‎*┋ ⬡│━━❮❮ BUTTON CMD❯❯━━*
‎*┋ ⬡│ɴᴀᴍᴇ : sᴛᴇᴀᴋ*
‎*┋ ⬡│ᴛᴏᴛᴀʟ : 𝟶𝟶+ ғᴇᴀᴛᴜʀᴇs*
‎*┋ ⬡│ɴᴇᴛᴡᴏʀᴋ : ʟᴛᴇ*
‎*┋ ⬡│ᴠᴇʀsɪᴏɴ : ʙᴇᴛᴀ*
‎*┋ ⬡│ᴏᴡɴᴇʀ : ᴀʟɪ ɪɴxɪᴅᴇ*
‎*┋ ⬡│ʜᴏsᴛᴇʀ: sᴛᴀʀᴋ ᴘʟᴀᴛғᴏʀᴍ*
‎*┋ ⬡│ᴍᴏᴅᴇ: UNKOWN*
‎*┋ ⬡│ᴘʀᴇғɪx: MULTI-PREFIX*
‎*┋ ⬡│ᴜᴘᴛɪᴍᴇ: ${uptime}*
‎*┋ ⬡│ᴛᴏᴅᴀʏ's ᴅᴀᴛᴇ: ${date}*
‎*┋ ⬡│ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ: ${wib}*
‎*┋ ⬡│©𝐒𝐓𝐀𝐑𝐊 𝐌𝐃 𝐁𝐎𝐓*
‎*╰──────────────────✑*
*ᴛʜᴀɴᴋ ʏᴏᴜ ғᴏʀ ᴄʜᴏᴏsɪɴɢ sᴛᴀʀᴋ ᴍᴅ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʟɪ ɪɴxɪᴅᴇ*
*─═✧═─ 𝐒𝐓𝐀𝐑𝐊 𝐁𝐎𝐓 ─═✧═─*`

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: str
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "*ᴜsᴇ ᴛʜᴇ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴs*"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                            image: { url: 'https://files.catbox.moe/z2880t.jpg' }
                        }, { upload: conn.waUploadToServer })),
                        title: null,
                        subtitle: null,
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                 "name": "single_select",
                "buttonParamsJson": 
                                "{\"title\":\"TAP TO OPEN\",\"sections\":[{\"title\":\"BOT COMING SOON STARK MD\",\"highlight_label\":\"STARK TECH INC\",\"rows\":[{\"header\":\"\",\"title\":\"💀 BOT MENU\",\"description\":\"The Bot's secret control panel. What's your command, oh great one?\",\"id\":\".botmenu\"},{\"header\":\"\",\"title\":\"🍥 OWNER MENU\",\"description\":\"The sacred scroll only for the chosen one. Yep, that's you, Boss!\",\"id\":\".ownermenu\"},{\"header\":\"\",\"title\":\"📜 GROUP MENU\",\"description\":\"Group shenanigans central! Unite, chat, conquer!\",\"id\":\".groupmenu\"},{\"header\":\"\",\"title\":\"📥 DOWNLOAD MENU\",\"description\":\"'DL' stands for 'Delicious Loot'. Come grab your goodies!\",\"id\":\".dlmenu\"},{\"header\":\"\",\"title\":\"🎉 FUN MENU\",\"description\":\"The bot's party hat. Games, jokes and instant ROFLs. Let's get this party started!\",\"id\":\".funmenu\"},{\"header\":\"\",\"title\":\"💰 ECONOMY MENU\",\"description\":\"Bling bling! Your personal vault of virtual economy. Spend or save? Choose wisely!\",\"id\":\".economymenu\"},{\"header\":\"\",\"title\":\"🎮 GAMES MENU\",\"description\":\"Enter the gaming arena. May the odds be ever in your favor!\",\"id\":\".gamemenu\"},{\"header\":\"\",\"title\":\"🎨 STICKER MENU\",\"description\":\"A rainbow of stickers for your inner artist. Make your chats pop!\",\"id\":\".stickermenu\"},{\"header\":\"\",\"title\":\"🧰 TOOL MENU\",\"description\":\"Your handy-dandy toolkit. What's your pick, genius?\",\"id\":\".toolmenu\"},{\"header\":\"\",\"title\":\"🎩 LOGO MENU\",\"description\":\"Create a logo that screams YOU. Or whispers. You choose the volume.\",\"id\":\".logomenu\"},{\"header\":\"\",\"title\":\"🌙 NSFW MENU\",\"description\":\"The After Dark menu. But remember, sharing adult secrets must be consent-based.\",\"id\":\".nsfwmenu\"}]}]}" 
                },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": "{\"display_text\":\"📍 PING\",\"id\":\".main\"}"
                            },
                             {
                                "name": "quick_reply",
                                "buttonParamsJson": "{\"display_text\":\"👑 OWNER \",\"url\":\"https://api.whatsapp.com/send?phone=+923003588997&text=\",\"merchant_url\":\"https://api.whatsapp.com/send?phone=+923003588997&text=\"}"
                            },
                            {
                          
                                "name": "cta_url",
                                "buttonParamsJson": "{\"display_text\":\"🪀 SUPPORT\",\"url\":\"https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h\",\"merchant_url\":\"https://api.whatsapp.com/send?phone=+923003588997&text=\"}"
                            }
                        ]
                    })
                })
            }
        }
    }, {})

    // Sending audio with image and context info
    await conn.sendMessage(m.chat, {
        audio: { url: 'https://github.com/SilvaTechB/silva-md-bot/raw/main/media/Menu.mp3' },
        image: { url: 'https://i.imgur.com/RDhF6iP.jpeg' }, // Change this to a dynamic thumbnail URL
        caption: str,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: false,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363200367779016@newsletter',
                newsletterName: 'SILVA MD BOT 💖',
                serverMessageId: 143
            }
        }
    })

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
}

handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help', 'h', 'commands']

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
    const time = moment.tz('Asia/Karachi').format('HH')
    let res = "happy early in the day☀️"
    if (time >= 4) {
        res = "Good Morning 🥱"
    }
    if (time >= 10) {
        res = "Good Afternoon 🫠"
    }
    if (time >= 15) {
        res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
        res = "Good Night 🌙"
    }
    return res
}
