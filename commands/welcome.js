const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with the Administrator Permissions`')
    const channel = args[0];
  
  let pchan = new Discord.RichEmbed()
  .setTitle(`~Welcome Channel~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Channel Yang Akan Digunakan Sebagai Autorole.`)
  .addField("Gunakan:", `autorole [nama role]`)
  .addField("Contoh:", `autorole Member`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!channel) return message.channel.send(pchan);

    db.set(`welChan_${message.guild.id}`, channel);
  
  let brole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setDescription("Berhasil Mengubah Role ✅")
  .setColor(`#16ff16`)
  .addField("Auto Role diubah menjadi:", `\`${channel}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(brole);
  
  
}

module.exports.help = {

  name: "welcome"
  }