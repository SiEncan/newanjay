const search = require('yt-search');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) =>{

  search(args.join(' '), async function(err, res) {
    if(err) return message.channel.send('`error.`');
    
    let convert = (input) => {
    let h = input >= 3600 ? Math.floor(input / 3600) : 0;
    input %= 3600;
    let m = input >= 60 ? Math.floor(input / 60) : 0;
    let s = input % 60;
    
    h = check(h);
    m = check(m);
    s = check(s);

    return h + ":" + m + ":" + s;
}

let check = (input) => {
    return input < 10 ? "0" + input : input;

}
    
    let videos = res.videos.slice(0, 5);
    let resp = '';
    for(var i in videos) {
       resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`  **Durasi: [${convert(videos[1].seconds)}]**\n`;
      
    console.log(videos)
    };

    resp += `\n**Ketik Angka Dari ** \`1-${videos.length}\``;

    message.channel.send(resp)
    
    
    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 && m.author.id === message.author.id;
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

