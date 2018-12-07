const search = require('yt-search');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops, info) =>{

  search(args.join(' '), function(err, res) {
    if(err) return message.channel.send('`Maaf, ada sesuatu yang salah.`');

    let videos = res.videos.slice(0, 5);
    
    let info = ytdl.getInfo(args[0]);
    
    let data = ops.active.get(message.guild.id) || {};

  if(!data.connection) data.connection = message.member.voiceChannel.join();

  if(!data.queue) data.queue = [];
  data.guildID = message.guild.id;

  data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id,
      length: info.length_seconds,
      author: info.author.name,
      thumbnail: info.thumbnail_url
  });
    
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
    
    let resp = '';
    for(var i in videos) {
       resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`${convert(info.length_seconds)}\n`;
    };

    resp += `\n**Ketik Angka Dari** \`1-${videos.length}\``;

    message.channel.send(resp)

    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
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
