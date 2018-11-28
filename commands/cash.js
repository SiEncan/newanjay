const Discord = require("discord.js");
let coins =  require("../coins.json");

module.exports.run = async (bot, message, args) =>{

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setDescription("💰")
  .setColor("#13c10d")
  .addField("Cash Kamu:", uCoins)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(coinEmbed);

}

module.exports.help = {
  name: "cash"
}
