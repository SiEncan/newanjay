const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("🔞 Command Ini Hanya Dapat DiGunakan Di NSFW Channel!")

    const subreddits = [
        "NSFW_GIF",
        "nsfw_gifs",
        "porninfifteenseconds",
        "60FPSPorn",
        "porn_gifs",
        "nsfw_Best_Porn_Gif",
        "LipsThatGrip",
        "adultgifs"
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor(0xffa500)
                    .setImage(url)
                    .setTimestamp()
                    .setFooter(`Direquest Oleh ${message.author.username}`, message.author.avatarURL);
                message.channel.send({ embed });
        })
}


  module.exports.help = {
    name: "gif"
  }
