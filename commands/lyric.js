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

const createQuery = args => {
  if (args === 'np') {
    const query = getArtistTitle(data.current, {
      defaultArtist: ' '
    });
    console.log(query)
    return query.join(' ')
  } else return args.slice(1).join(' ');
};

exports.run = function(bot, message, args) {
  data = bot.data;

  if (!args[0]) return message.reply(`Usage: ${exports.help.usage}`, {code:'asciidoc'});

  const query = createQuery(args[0]);
  searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
    .then(songData => {
      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle(`Lyrics for: ${songData[0]}`)
        .setDescription(songData[1]);
      return message.channel.send({embed});
    })
    .catch(err => {
      message.channel.send(`No lyrics found for: ${query} 🙁`, {code:'asciidoc'});
      console.warn(err);
    });
};

}
exports.help = {
  name: 'lyrics',
  description: 'Fetches lyrics for a song.',
  usage: 'lyrics [np | search query]'
};
