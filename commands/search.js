const search = require('yt-search');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) =>{

  search(args.join(' '), async function(err, res) {
    if(err) return message.channel.send('`error.`');
    
    
    let videos = res.videos.slice(0, 5);
    let resp = '';
    for(var i in videos) {
       resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`  **Durasi: [${videos[i].timestamp}]**\n`;
    };

    resp += `\n**Ketik Angka Dari ** \`1-${videos.length}\``;

    message.channel.send(resp)
    
    
    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 && m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter);

    collector.videos = videos;

    collector.once('collect', function(m) {
    
      let commandFile = require(`./play.js`);
      commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
    }).then(msg => msg.delete());
    

  })
  
}

  module.exports.help = {
    name: "search"
  }

