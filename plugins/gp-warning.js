let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @user`
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
  let name = conn.getName(m.sender)
  let warn = global.db.data.users[who].warn
  if (warn < war) {
    global.db.data.users[who].warn += 1
    m.reply(
      `
*⌈⚠️ WARNING ⌋*

*╭───────────────┄┈*
*├▢ Admin:* ${name}
*├▢ User:* @${who.split`@`[0]}
*├▢ Warns:* ${warn + 1}/${war}
*├▢ Reason:* ${text}
*╰───────────────┄┈*`,
        null,
      { mentions: [who] }
    )

  } else if (warn == war) {
    global.db.data.users[who].warn = 0
    m.reply(`⛔ The user exceeded the *${war}* warnings will therefore be removed`)
    await time(3000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(
      `♻️ You were removed from the group *${groupMetadata.subject}* because you have been warned *${war}* times`,
      who
    )
  }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn']
handler.desc = 'Warn a user'
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}




