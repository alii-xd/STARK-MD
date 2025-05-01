let handler = async (m, { conn, args, usedPrefix, command }) => {
let pp = ''
m.react('⏳')
	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let str = `*🍭 sᴛᴀʀᴋ ᴍᴅ ᴜᴘᴛɪᴍᴇ*\n\n*🧃 ʙᴏᴛ ᴀᴄᴛɪᴠᴇ ᴅᴜʀᴀᴛɪᴏɴ*\n *${muptime}⏰*`
    conn.sendMessage(m.chat, {
      text: str,
      contextInfo: {
      
      mentionedJid: [m.sender],
      isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363318387454868@newsletter',
                newsletterName: '🧃⋋̳͡⊱𝐒𝐓𝐀𝐑𝐊 𝐌𝐃٭⳺֟፝͜⳻٭',
                serverMessageId: -1
            },
      forwardingScore: 999,
      externalAdReply: {
      title: "𝐑𝐔𝐍𝐍𝐈𝐍𝐆 💨",
      body: "ʀᴜɴɪɴɢ sɪɴᴄᴇ",
      thumbnailUrl: 'https://files.catbox.moe/2sssq3.jpg',
      sourceUrl: 'https://github.com/itx-alii-raza/ALI-MD',
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
      m.react('✅')
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime', 'run']
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
