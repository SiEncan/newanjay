const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        message.channel.send(`_**Link Untuk Invite Bot Ini**_:\n\n ${link}`);
      }).catch(err => {
        console.log(err.stack);
      });
}

module.exports.help = {
    name: "invitebot",
    aliases: ["inviteme", "inv"]
}
