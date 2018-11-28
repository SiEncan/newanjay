const Discord = require("discord.js");
const Coins = require("../coins.json");
const coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if (message.author.id !== '178657593030475776') return;
  //Grab all of the users in said server
  Coins.find({
    serverID: message.guild.id
  }).sort([
    ['Coins', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);

    let embed = new Discord.RichEmbed()
      .setTitle("Cash Leaderboard")
    //if there are no results
    if (res.length === 0) {
      embed.setColor("#ff0000");
      embed.addField("Data Tidak Ditemukan", "Silahkan Mengetik Untuk Mendapatkan Cash!")
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor("#5c89bf");
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Tidak Ditemukan"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Cash**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Cash**: ${res[i].coins}`);
        }
      }
    } else {
      //more than 10 results
      embed.setColor("#5c89bf");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Tidak Ditemukan"
        if (member === "User Tidak Ditemukan") {
          embed.addField(`${i + 1}. ${member}`, `**Cash**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Cash**: ${res[i].coins}`);
        }
      }
    }

    message.channel.send(embed);
  })
}
module.exports.help = {
  name: "cashlead",
  alias: "cashleaderboard"
}
