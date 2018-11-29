const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) =>{
  message.member.voiceChannel.join();

  let joinembed = new Discord.RichEmbed()
  .setColor(`#21e5ff`)
  .addField("Voice Channel", `Terhubung Ke "**${message.member.voiceChannel.name}**"`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(joinembed);

}

  module.exports.help = {
    name: "join"
  }
