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
  .setTitle("~List Command~")
  .setDescription(`Commands:`)
  .setColor("#51c7ff")
  .addField(":gear: Moderator", `\`clear\` \`kick\` \`ban\` \`mute\` \`autorole\` \`logchannel\` \`prefix\` \`welcome\``)
  .addField(":moneybag: Ekonomi", `\`cash\` \`pay\` \`dailycash\``)
  .addField("<:casi:521161385095462913> Gamble", `\`gamble\` \`slots\``)
  .addField("🎶 Music", `\`join\` \`leave\` \`play/p\` \`skip/s\` \`pause\` \`resume\` \`queue\` \`volume\` \`lirik\``)
  .addField("<:18o:521168534026584094> NSFW", `\`ass\` \`hentai\` \`tinytits\` \`gif\``)
  .addField("botinfo",`Menampilkan Informasi Bot`)
  .addField("level",`Menampilkan Level Kamu`)
  .addField("say",`Membuat bot mengetik apa yang kamu katakan`)
  .addField("serverinfo",`Menampilkan Informasi Server`)
  .addField("ping",`Menampilkan Ping Kamu`)
  .addField("ask",`Menjawab Pertanyaan`)

  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(helpembed);

}

module.exports.help = {
  name: "help"
}
