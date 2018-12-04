const Discord = require('discord.js');
const API = require('genius-lyrics.js').API; // Get the API class.
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args, ops) => {
const api = new API({
  token: 'wzedX0q1Xeo_ABN3SLEBO7KynY22gMBn3nBxorzsm0Cgw7Ez1EmbPEMEoV14XKMZ', // Genius requires you to request w/ an Bearer Token, so idk why lol
  user_agent: 'lyrics.js/Test/0.1.5' // Put your user agent there. The default one will be (lyrics.js/Prod/{version})
});
 
api.getSong('id').then((body) => console.log(body));
api.getArtist('id').then((body) => console.log(body));

}
exports.help = {
  name: 'lyrics',
  description: 'Fetches lyrics for a song.',
  usage: 'lyrics [np | search query]'
};
