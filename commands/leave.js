const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let voiceCembed = new Discord.RichEmbed()
  .setColor(`#ff0000`)
  .addField("Error ❌", `Kamu Harus Berada di Dalam Voice Channel.`)
  .setFooter(message.author.tag)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if(!message.member.voiceChannel) return message.channel.send(voiceCembed);

  let voicesCembed = new Discord.RichEmbed()
  .setColor(`#ff0000`)
  .addField("Error ❌", `Bot Tidak Dalam Voice Channel`)
  .setFooter(message.author.tag)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if(!message.guild.me.voiceChannel) return message.channel.send(voicesCembed);

  let paembed = new Discord.RichEmbed()
  .setColor(`#ff0000`)
  .addField("Error ❌", `Kamu Harus Berada Dalam Voice Channel Yang Sama Dengan Bot.`)
  .setFooter(message.author.tag)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(paembed);

  message.guild.me.voiceChannel.leave();

  let palembed = new Discord.RichEmbed()
  .setColor(`#ff0000`)
  .addField("Voice Channel", `Meninggalkan "**${message.member.voiceChannel.name}**"...`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(palembed)

}
  module.exports.help = {
    name: "leave"
  }
