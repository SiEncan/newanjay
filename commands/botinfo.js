const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let totalSeconds = (bot.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
  
  
  let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("~Informasi Bot~")
    .setColor("#ff6100")
    .setThumbnail(bicon)
    .addField("Nama Bot", bot.user.username)
    .addField("Uptime:", `${hours} Jam ${minutes} Menit ${seconds} Detik`)
    .addField("Berada di", `${bot.guilds.size} Server 🌏`)
    .addField("Melayani", `${bot.users.size} User 👥`)
    .addField("Dibuat Oleh", `Skinnymanᵛᵉʳᶦᶠᶦᵉᵈ ✓#5654`)
    .addField("Dibuat Pada Tanggal", `Jumat, 2 November 2018`);

    return message.channel.send(botembed);
  }

  module.exports.help = {

  name: "botinfo"
  }
