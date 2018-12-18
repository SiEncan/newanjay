const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) =>{
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  if (!args[1]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  if (message.author.id !== '520782743412539404') return message.reply("Lu Mana Bisa Njeng.");

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  
  let pchan = new Discord.RichEmbed()
  .setTitle(`~Ngecit Bos?~`)
  .setDescription(`${message.author} Memberikan ${pUser} ${args[1]} cash 💰`)
  .setColor(`#ff0000`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

 message.channel.send(pchan);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });



}

module.exports.help = {
  name: "ngecit",
  usage: "ngecit @User [Jumlah Cash]"
}
