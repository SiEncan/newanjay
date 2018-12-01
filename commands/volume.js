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

    if(isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Gunakan: volume [1-200]');

    fetched.dispatcher.setVolume(args[0]/100);

    let volumeembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#21e5ff`)
    .addField("Volume 🔊", `Volume Telah Diubah Menjadi: **${args[0]}**`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);

    message.channel.send(volumeembed);


  }

    module.exports.help = {
      name: "volume",
   }
