const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let helloembed = new Discord.RichEmbed()
  .setColor("#ffff00")
  .addField("Halo kontol", `<@${message.author.id}>`)

  return message.channel.send(helloembed);
}

module.exports.help = {

name: "halo"
}
