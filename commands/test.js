const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{

  let replies = ["Died! 💀", "Survived! 😃",];

  let jawaban =  Math.floor((Math.random() * replies.length));

  let ballembed =  new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#9c12b7")
  .addField("Jawaban", replies[jawaban]);

  message.channel.send(ballembed);

}

  module.exports.help = {
    name: "test"
  }
