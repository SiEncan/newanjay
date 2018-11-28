const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Informasi Bot")
    .setColor("#ff6100")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .setTimestamp();

    return message.channel.send(botembed);
  }

  module.exports.help = {

  name: "botinfo"
  }
