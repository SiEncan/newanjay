const Discord = require("discord.js");
const randomPuppy = require("random-puppy");
const request = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) {
        message.reply(`🔞 Command Ini Hanya Dapat DiGunakan Di NSFW Channel!`);
    } else {
        let sReddits = ["hentai"];
        let s = sReddits[Math.round(Math.random() * (sReddits.length - 1))];

        try {
            randomPuppy(s)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor(0xffa500)
                    .setImage(url)
                    .setTimestamp()
                    .setFooter(`Direquest Oleh ${message.author.username}`, message.author.avatarURL);
                message.channel.send({ embed });
        })
          } catch (e) {


              message.channel.send(nsmbed);
          }
    }
}

module.exports.help = {
    name: "hentai"
}
