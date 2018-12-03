const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission')
    const text = args[0];
  
  let ptext = new Discord.RichEmbed()
  .setTitle(`~Welcome Text~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Text Yang Akan Digunakan Sebagai Welcome Text.`)
  .addField("Gunakan:", `welcometext [text]`)
  .addField("Contoh:", `welcome Selamat Datang Di Server Ini`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!text) return message.channel.send(ptext);

    db.set(`welText_${message.guild.id}`, text);
  
  let btext = new Discord.RichEmbed()
  .setTitle(`~Welcome Text~`)
  .setDescription("Berhasil Mengubah Welcome Text ✅")
  .setColor(`#16ff16`)
  .addField("Welcome Text diubah menjadi:", `\`${text}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(btext);
  
  
}

module.exports.help = {

  name: "welcometext"
  }