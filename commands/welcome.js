const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission')
    const channel = args[0];
  
  let pchan = new Discord.RichEmbed()
  .setTitle(`~Welcome Channel~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Channel Yang Akan Digunakan Sebagai Welcome Channel.`)
  .addField("Gunakan:", `welcome [nama channel]`)
  .addField("Contoh:", `welcome Selamat-Datang`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!channel) return message.channel.send(pchan);

    db.set(`welChan_${message.guild.id}`, channel);
  
  let bchan = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setDescription("Berhasil Mengubah Channel ✅")
  .setColor(`#16ff16`)
  .addField("Welcome Channel diubah menjadi:", `\`${channel}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(bchan);
  
  
}

module.exports.help = {

  name: "welcome"
  }