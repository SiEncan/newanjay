const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');
const fs = require("fs");
let coins = require("../coins.json");

exports.run = async (client, message, args, tools) => {

  let cooldown = 8.64e+7,
      amount = 300;
  let sCoins = coins[message.author.id].coins;

  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastDaily));

    message.channel.send(`Kamu Telah Mengambil Daily Cash Hari ini, Silahkan Ambil Lagi Besok. Waktu Tersisa: **${timeObj.hours} Jam ${timeObj.minutes} Menit**!`);

  } else {
    message.channel.send(`Kamu Telah Mendapatkan ${amount} Cash 💰 dari Daily Cash`);
    let sCoins = coins[message.author.id].coins;
    db.set(`lastDaily_${message.author.id}`, Date.now());
    coins[message.author.id] = {
      coins: sCoins + amount
    };

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });
    
    }

}

  module.exports.help = {
    name: "dailycash"
  }
