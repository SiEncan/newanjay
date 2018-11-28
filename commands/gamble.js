const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (client, message, args) => {

  let amount = 250;

  randomNumber = Math.floor(Math.random() * (3 - 1) + 1);
  console.log(randomNumber);
  if(randomNumber==2){
  let sCoins = coins[message.author.id].coins;
  if(sCoins < amount) return message.reply("Cash Yang Kamu Miliki Tidak Cukup!, Kamu Harus Mempunyai Minimal 300 Cash 💰");

    message.channel.send(`Kamu Telah Memenangkan Gamble, dan Mendapatkan ${amount} Cash 💰`);
    coins[message.author.id] = {
      coins: sCoins + amount
    };
  }else{
    message.channel.send(`Kamu Telah Kalah Gamble, dan Kehilangan ${amount} Cash 💰`);
    let sCoins = coins[message.author.id].coins;
    coins[message.author.id] = {
      coins: sCoins - amount
    };
  }

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });



}

  module.exports.help = {
    name: "gamble"
  }
