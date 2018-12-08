const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) =>{

  search(args.join(' '), async function (err, res) {
    if(err) return message.channel.send('`error.`');

    let videos = res.videos.slice(0, 5);
    
    let resp = '';
    for(var i in videos) {
       resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
    };

    resp += `\n**Ketik Angka Dari** \`1-${videos.length}\``;

    message.channel.send(resp)
    
    try {
						var filter = await message.channel.awaitMessages(m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 && m.author.id === message.author.id, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
            const collector = message.channel.createMessageCollector(filter);
					}

    const collector = message.channel.createMessageCollector(filter);

    collector.videos = videos;

    collector.once('collect', function(m) {
    
      let commandFile = require(`./play.js`);
      commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
      
    });
    

  });
  
}

  module.exports.help = {
    name: "search"
  }

