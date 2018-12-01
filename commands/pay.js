const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) =>{
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  if(message.mentions.users.first() === message.author) return message.reply("Ott.. Tidak Bisa.");
  if(!coins[message.author.id]){
    return message.reply("Kamu Tidak Memiliki Cash!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[1]) return message.reply("Cash Yang Kamu Miliki Tidak Cukup!");

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
  name: "pay",
  usage: "pay @User [Jumlah Cash]"
}
