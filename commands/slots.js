const Discord = require('discord.js');
let coins = require("../coins.json");
const fs = require("fs");

exports.run = async (client, message, args) => {
  
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
    let sCoins = coins[message.author.id].coins;
  if(sCoins < args[0]) return message.reply(`Cash Yang Kamu Miliki Tidak Cukup!, Kamu Harus Mempunyai Minimal ${args[0]} Cash 💰`);

    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈", ":tomato:", ":green_apple:", ":pineapple:", ":melon:"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let result4 = Math.floor((Math.random() * slots.length));
    let result5 = Math.floor((Math.random() * slots.length));
    let result6 = Math.floor((Math.random() * slots.length));
    let result7 = Math.floor((Math.random() * slots.length));
    let result8 = Math.floor((Math.random() * slots.length));
    let result9 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let aicon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter(message.author.username, aicon)
            .setTitle(':slot_machine:Slots:slot_machine:')
            .addField('----------------', `|${slots[result4]}${slots[result5]}${slots[result6]}|`)
            .addField(`|${slots[result1]}${slots[result2]}${slots[result3]}| <--`, `|${slots[result7]}${slots[result8]}${slots[result9]}|`)
            .addField(`----------------`, `Kamu Menang :smiley: `)
            .setColor("#f4e842");
        message.channel.send(wEmbed);
      
      coins[message.author.id] = {
      coins: sCoins + parseInt(args[0]) * 2
    };
      
    } else {
        let embed = new Discord.RichEmbed()
            .setFooter(message.author.username, aicon)
            .setTitle(':slot_machine:Slots:slot_machine:')
            .addField('----------------', `|${slots[result4]}${slots[result5]}${slots[result6]}|`)
            .addField(`|${slots[result1]}${slots[result2]}${slots[result3]}| <--`, `|${slots[result7]}${slots[result8]}${slots[result9]}|`)
            .addField(`----------------`, `Kamu Kalah `)
            .setColor("#f4e842");
        message.channel.send(embed);
      
      let sCoins = coins[message.author.id].coins;
      coins[message.author.id] = {
      coins: sCoins - parseInt(args[0])
    };
    }

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });
}


exports.conf = {
    aliases: []
};

exports.help = {
    name: 'slots',
    description: 'Slot Machine',
    usage: 'slots [Jumlah Cash]'
}