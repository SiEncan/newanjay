const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) =>{
    let fetched = ops.active.get(message.guild.id);

    let urlembed = new Discord.RichEmbed()
    .setTitle(`**Music** 🎶`)
    .setColor(`#ff0000`)
    .addField("Error ❌", `Tidak Ada Musik Yang Sedang Diputar.`)
    .setFooter(message.author.tag)

    if(!fetched) return message.channel.send(urlembed);

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let resp = `__**Sedang Diputar**__:\n**${nowPlaying.songTitle}** -- **Direquest Oleh:** *${nowPlaying.requester}*\n\n__**Antrian**__:\n`;

    for (var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}** -- **Direquest Oleh:** *${queue[i].requester}*\n`;

    }

    message.channel.send(resp);

  }

    module.exports.help = {
      name: "queue"
    }
