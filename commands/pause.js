const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) =>{
    let fetched = ops.active.get(message.guild.id);

    let peembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Tidak Ada Musik Yang Sedang Diputar.`)
    .setFooter(message.author.tag);

    if(!fetched) return message.channel.send(peembed);

    let paembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Kamu Harus Berada Dalam Voice Channel Yang Sama Dengan Bot.`)
    .setFooter(message.author.tag);

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(paembed);

    if(fetched.dispatcher.paused) return message.channel.send('**Musik Ini Sudah DiPause.**');

    fetched.dispatcher.pause();

    let pauseembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#21e5ff`)
    .addField("Pause ⏸️", `**Musik:** ${fetched.queue[0].songTitle} **Dijeda**`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);

    message.channel.send(pauseembed);

  }

    module.exports.help = {
      name: "pause"
    }
