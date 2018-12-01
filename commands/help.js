const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  let helpembed = new Discord.RichEmbed()
  .setTitle("~General Help~ 🌐")
  .setDescription(`Commands:`)
  .setColor("#51c7ff")
  .addField("help",`Menampilkan Menu Ini`)
  .addField("botinfo",`Menampilkan Informasi Bot`)
  .addField("cash",`Menampilkan Cash yang kamu punya`)
  .addField("pay",`Mengirim User lain cash`)
  .addField("gamble", `Berjudi menggunakan cash`)
  .addField("level",`Menampilkan Level Kamu`)
  .addField("say",`Membuat bot mengetik apa yang kamu katakan`)
  .addField("serverinfo",`Menampilkan Informasi Server`)
  .addField("clear",`Menghapus Pesan`)
  .addField("kick",`Kick User, "kick @user (alasan)"`)
  .addField("ban",`Ban User, "ban @user (alasan)"`)
  .addField("mute",`Mute User`)
  .addField("ping",`Menampilkan Ping Kamu`)
  .addField("ask",`Menjawab Pertanyaan`)
  .addField("join",`Memasukkan Bot Ke Voice Channel`)
  .addField("leave",`Mengeluarkan Bot Dari Voice Channel`)
  .addField("prefix",`Mengeluarkan Bot Dari Voice Channel`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(helpembed);
  
  let helpnsfw = new Discord.RichEmbed()
  .setTitle(`~NSFW Help~ 🎶`)
  .setDescription(`Commands:`)
  .setColor(`#51c7ff`)
  .addField("play", `Memutar Musik, "play (link Musik)" atau "play (Judul Musik)"`)
  .addField("pause",`Menjeda Musik Yang Sedang Diputar`)
  .addField("resume",`Melanjutkan Musik Yang Sedang DiJeda`)
  .addField("volume",`Mengatur Volume Musik`)
  .addField("queue",`Menampilkan Antrian Musik`)
  .addField("skip",`Melewati Musik Yang Sedang Diputar`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(helpnsfw);

  let helpmusic = new Discord.RichEmbed()
  .setTitle(`~Music Help~ 🎶`)
  .setDescription(`Commands:`)
  .setColor(`#51c7ff`)
  .addField("play/p", `Memutar Musik`)
  .addField("pause",`Menjeda Musik Yang Sedang Diputar`)
  .addField("resume",`Melanjutkan Musik Yang Sedang DiJeda`)
  .addField("volume",`Mengatur Volume Musik`)
  .addField("queue",`Menampilkan Antrian Musik`)
  .addField("skip/s",`Melewati Musik Yang Sedang Diputar`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(helpmusic);

  let prefixembed = new Discord.RichEmbed()
  .setTitle(`Prefix`)
  .setColor(`#51c7ff`)
  .addField("Server Prefix:", prefix, true)
  .addField("Gunakan:", `prefix<command>`)
  .addField("Cara Mengganti Prefix:", `*prefix <prefix yang diinginkan>`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  return message.channel.send(prefixembed);

}

module.exports.help = {
  name: "help"
}
