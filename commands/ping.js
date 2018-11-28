const Discord = require('discord.js')

exports.run = async (bot, message, args, color) => {

    let start = Date.now(); message.reply(message.channel.id, 'Pong! ').then(message => {
    let diff = (Date.now() - start);
    let API = (bot.ping).toFixed(2)

        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor(0xff2f2f)
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        .setTimestamp()
        .setFooter("Anjay Bot", bot.user.avatarURL)
        message.edit(embed);

    });

}

exports.help = {
    name: 'ping',
}
