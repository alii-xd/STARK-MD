let handler = async (m, { conn, args, groupMetadata }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `*✳️ Tag or mention users*`
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
  let warn = global.db.data.users[who].warn
  if (warn > 0) {
    global.db.data.users[who].warn -= 1
    m.reply(`*⌈⚠️ DELWARN ⌋*
         
*▢ WARNS: -1*
*▢ WARNS TOTAL:* *${warn - 1}*`)
//    m.reply(`✳️ An admin lowered their warning, now you have *${warn - 1}*`, who)
  } else if (warn == 0) {
    m.reply('*✳️ The user has no warning*')
  }
}
handler.help = ['delwarn @user']
handler.tags = ['group']
handler.command = ['delwarn', 'resetwarn']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
