let handler = async (m, { conn, args, command }) => {
  let user;
  if (m.isGroup) {
    user = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : m.sender;
  } else {
    user = m.chat;
  }

  try {
    const pp = await conn.profilePictureUrl(user, 'image');
    const name = await conn.getName(user);

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `👤 *ʜᴇʀᴇ ɪs ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ.*`,
      contextInfo: {
        mentionedJid: [user],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '🧃⋋̳͡⊱𝐒𝐓𝐀𝐑𝐊 𝐌𝐃٭⳺֟፝͜⳻٭',
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Couldn't fetch profile picture.`);
  }
};

handler.help = ['spp', 'sprofilepic', 'getpp'];
handler.tags = ['tools'];
handler.command = /^(spp|sprofilepic|getpp)$/i;

export default handler;
