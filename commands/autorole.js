const db = require('quick.db');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission.')
    const role = args[0];
  
  let prole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Role Yang Akan Digunakan Sebagai Autorole.`)
  .addField("Gunakan:", `autorole [nama role]`)
  .addField("Contoh:", `autorole Member`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!role) return message.channel.send(prole);

    db.set(`autoRole_${message.guild.id}`, role);
  
  let brole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setDescription("Berhasil Mengubah Role ✅")
  .setColor(`#16ff16`)
  .addField("Auto Role diubah menjadi:", `\`${role}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(brole);
  
  
}

module.exports.help = {

  name: "autorole"
  }
