const Discord = require('discord.js');
const getArtistTitle = require('get-artist-title');
const axios = require('axios');
const cheerio = require('cheerio');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args, ops) => {

const baseURL = `https://api.genius.com/search?access_token=${botconfig.genius}`;
let data = ops.active.get(message.guild.id) || {};

const scrapeLyrics = path => {
  return axios.get(path)
    .then(response => {
      let $ = cheerio.load(response.data);
      return [$('.header_with_cover_art-primary_info-title').text().trim(), $('.lyrics').text().trim()];
    })
    .catch(err => {
      console.warn(err);
    });
};

const searchLyrics = url => {
  return Promise.resolve(axios.get(url, {'Authorization': `Bearer ${botconfig.genius}`})
    .then(response => checkSpotify(response.data.response.hits))
    .then(path => scrapeLyrics(path))
    .catch(err => {
      console.warn(err);
    })
  );
};

const checkSpotify = hits => {
  return hits[0].result.primary_artist.name === 'Spotify' ? hits[1].result.url : hits[0].result.url;
};


exports.run = function(bot, message, args) {
  data = bot.data;

  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
 
  const query = args.slice(0).join(" ");
  searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
    .then(songData => {
      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setDescription(songData[1].slice(0, 1999));
       message.channel.send(embed);
    
    const cembed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setDescription(songData[1].slice(2000))   
        .setFooter(`Direquest Oleh ${message.author.username}`, message.author.avatarURL)
        .setTimestamp();
      return message.channel.send(cembed);
  
    });
};

}
exports.help = {
  name: 'lirik',
  usage: 'lirik [Judul Musik]'
};
