const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) =>{
    let fetched = ops.active.get(message.guild.id);

    let urlembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Tidak Ada Musik Yang Sedang Diputar.`)
    .setFooter(message.author.tag)

    if(!fetched) return message.channel.send(urlembed);

    let paembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Kamu Harus Berada Dalam Voice Channel Yang Sama Dengan Bot.`)
    .setFooter(message.author.tag);

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(paembed);

    let patembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Musik Ini Tidak DiPause.`)
    .setFooter(message.author.tag);

    if(!fetched.dispatcher.paused) return message.channel.send(patembed);

    fetched.dispatcher.resume();

    let resumeembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#21e5ff`)
    .addField("Resume ▶️", `**Musik:** ${fetched.queue[0].songTitle} **Dilanjutkan**`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);

    message.channel.send(resumeembed);

  }

    module.exports.help = {
      name: "resume"
    }
