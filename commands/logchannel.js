const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission')
    const channel = args[0];
  
  let pchan = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Channel Yang Akan Digunakan Sebagai Log Channel.`)
  .addField("Gunakan:", `logchannel [nama channel]`)
  .addField("Contoh:", `logchannel logs`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!channel) return message.channel.send(pchan);

    db.set(`logChan_${message.guild.id}`, channel);
  
  let bchan = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setDescription("Berhasil Mengubah Channel ✅")
  .setColor(`#16ff16`)
  .addField("Log Channel diubah menjadi:", `\`${channel}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(bchan);
  
  
}

module.exports.help = {

  name: "logchannel"
  }