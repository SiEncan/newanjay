const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission')
    const text = args[0];
  
  let pchan = new Discord.RichEmbed()
  .setTitle(`~Welcome-Leave Channel~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Channel Yang Akan Digunakan Sebagai Welcome dan Leave Channel.`)
  .addField("Gunakan:", `welcome [nama channel]`)
  .addField("Contoh:", `welcome Selamat-Datang`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!text) return message.channel.send(pchan);

    db.set(`welText_${message.guild.id}`, text);
  
  let bchan = new Discord.RichEmbed()
  .setTitle(`~Welcome-Leave Channel~`)
  .setDescription("Berhasil Mengubah Channel ✅")
  .setColor(`#16ff16`)
  .addField("Welcome-Leave Channel diubah menjadi:", `\`${text}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(bchan);
  
  
}

module.exports.help = {

  name: "welcometext"
  }