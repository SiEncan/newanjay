const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Informasi Server")
    .setColor("#ff6100")
    .setThumbnail(sicon)
    .addField("Nama Server", message.guild.name)
    .addField("Dibuat Pada", message.guild.createdAt)
    .addField("Kamu Bergabung", message.member.joinedAt)
    .addField("Total Member", message.guild.memberCount)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);

    return message.channel.send(serverembed);
  }

 module.exports.help = {
      name: "serverinfo"
  }
