  const urban = require('relevant-urban'); // This is for fetching results
  const Discord = require('discord.js'); // This is for forming embeds
  const bot = new Discord.Client({disableEveryone: true});

// We can call our command handler here
exports.run = async (bot, message, args) => {

  if (!args[0]) return message.channel.send(`***Please specify some text!***`);

  let res = urban(args.join(' ')).catch(e => {

    return message.channel.send('***Sorry, that word was not found!***');
  });

  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField('Author', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`);


  message.channel.send(embed);

}

module.exports.help = {
  name: "urban"
}
