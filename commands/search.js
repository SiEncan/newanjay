const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) =>{
  
  search(args.join(' '), function(err, res) {
    if(err) return message.channel.send('`Maaf, ada sesuatu yang salah.`');

    let videos = res.videos.slice(0, 5);
    
    let resp = '';
    for(var i in videos) {
       resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
    };

    resp += `\n**Ketik Angka Dari** \`1-${videos.length}\``;
    resp += `\n**Ketik "__cancel__" Untuk Membatalkan Permintaan**`;

    message.channel.send(resp)
    
    
    const filter = m => (m.content) && m.content < videos.length+1 && m.content > 0;
    const collector = message.channel.createMessageCollector(filter);
    message.channel.awaitMessages(filter, {
    max: 1,
    time: 10000
  }).then(collected => {
    collected.delete(15000);
    if (collected.first().content === 'cancel') {
      return message.reply("Permintaan Dibatalkan.");
      
    }
    
    
    collector.videos = videos;

    collector.once('collect', function(m) {
    
      let commandFile = require(`./play.js`);
      commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
      
    });
    
  
  }).catch(err => {
    message.reply("Waktu Pemilihan Habis Permintaan Dibatalkan").then(r => r.delete(5000));
    console.log("Waktu Pemilihan Habis. Message await cancelled.");
  });
  
  })
  
}

  module.exports.help = {
    name: "search"
  }
