const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {

  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  
  let sCoins = coins[message.author.id].coins;
  if(sCoins < args[0]) return message.reply(`Cash Yang Kamu Miliki Tidak Cukup!, Kamu Harus Mempunyai Minimal ${args[0]} Cash 💰`);
  
  randomNumber = Math.floor(Math.random() * (3 - 1) + 1);
  console.log(randomNumber);
  if(randomNumber==2){
  
  let winEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle(`Kamu Telah Memenangkan Gamble 😃`)
  .setColor("#26ff4a")
  .addField("Kamu Mendapatkan:", `${args[0]} Cash 💰`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
    
  message.channel.send(winEmbed);
    
    coins[message.author.id] = {
      coins: sCoins + parseInt(args[0])
    };
  }else{
  let loseEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle(`Kamu Telah Kalah Gamble ☹️`)
  .setColor("#ff3b00")
  .addField("Kamu Kehilangan:", `${args[0]} Cash 💰`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(loseEmbed);
    
    let sCoins = coins[message.author.id].coins;
    coins[message.author.id] = {
      coins: sCoins - parseInt(args[0])
    };
  }

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });



}

  module.exports.help = {
    name: "gamble",
    usage: 'gamble [Banyak Cash Yang Ingin Kamu Gamble]'
  }
