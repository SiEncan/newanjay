const Discord = require("discord.js");
const randomPuppy = require("random-puppy");
const request = require("snekfetch");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) {
        message.reply(`🔞 Command Ini Hanya Dapat DiGunakan Di NSFW Channel!`);
    } else {
        let sReddits = ["hentai"];
        let s = sReddits[Math.round(Math.random() * (sReddits.length - 1))];

        try {
            randomPuppy(s)
              .then(async url => {
                let fileType = url.slice(-3);

                if (fileType == "gif") {
                  request.get(url).then(async r => {
                    let x = await fs.writeFile("./download.gif", r.body);
                    message.channel.send({
                      file: "./nsfw.gif"
                    });
                  });
                } else {
                  request.get(url).then(async r => {
                    message.channel.send({
                      file: r.body
                    });
                  });
                }
              });
          } catch (e) {



          }
    }
}

module.exports.help = {
    name: "hentai"
}
