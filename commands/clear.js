const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{
  
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Kamu Harus Memiliki Manage Message Permission.");
  let numberofmessages = parseInt(args[0]) + 1;
    if(!args[0]) return message.channel.send(numbermessagesembed);
    message.channel.bulkDelete(numberofmessages).then(() => {
        message.channel.send(`Membersihkan ${args[0]} Pesan.`).then(msg => msg.delete(2000));
    });
}

module.exports.help = {
  name: "clear",
  usage: "clear [banyak pesan yang ingin di hapus]"
}
