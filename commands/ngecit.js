const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) =>{
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  if (message.author.id !== '500457305834389529') return;

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} Telah Memberi ${pUser} ${args[1]} cash.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });



}

module.exports.help = {
  name: "ngecit",
  usage: "ngecit @User [Jumlah Cash]"
}
