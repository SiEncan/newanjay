const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) =>{
  
  const embed = new Discord.RichEmbed()
    .setTitle('Done.')
    .setDescription(`Restarted in **${Math.floor(bot.ping)}**ms`);
  if (message.author.id !== '500457305834389529') return;
  message.channel.send(embed).then(() => {
  process.exit(1);
})
};

    module.exports.help = {
      name: "restart"
    }