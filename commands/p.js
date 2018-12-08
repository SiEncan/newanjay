const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) =>{

  let voiceCembed = new Discord.RichEmbed()
  .setTitle(`**Music** 🎶`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Kamu Harus Berada di Dalam Voice Channel.`)
  .setFooter(message.author.tag)

  if(!message.member.voiceChannel) return message.channel.send(voiceCembed);

  let urlembed = new Discord.RichEmbed()
  .setTitle(`**Music** 🎶`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Tolong Sertakan Judul Musik Yang Ingin Diputar.`)
  .setFooter(message.author.tag)

  if(!args[0]) return message.channel.send(urlembed);

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) {
    let commandFile =  require(`./search.js`);
    return commandFile.run(bot, message, args, ops);
  }

  let info = await ytdl.getInfo(args[0]);
  
  let data = ops.active.get(message.guild.id) || {};

  if(!data.connection) data.connection = await message.member.voiceChannel.join();

  if(!data.queue) data.queue = [];
  data.guildID = message.guild.id;

  data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id,
      length: info.length_seconds,
      author: info.author.name,
      view: info.player_response.videoDetails.viewCount,
      id: info.video_id,
      authorl: info.author.channel_url
  });

  if(!data.dispatcher) play(bot, ops, data, message, info);
  else {

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

let num = (number, dec = 1, min = 1000) => {
  if (number === undefined || number === null) throw new Error(`Error: ${number} is not a number`)
  if (isNaN(number)) throw new Error(`Error: ${number} is not a number`)
  if (number > Number.MAX_SAFE_INTEGER) throw new Error(`Error: Number is too big`)
  if (number < min) return String(number)
  let str = String(number)
  let length = str.length
  let formatted = Number(str.substr(0, length % 3 !== 0 ? length % 3 : 3) + '.' + str.substr(length % 3 !== 0 ? length % 3 : 3)).toFixed(dec)
  return formatted + (length > 15 ? 'qd' : length > 12 ? 'T' : length > 9 ? 'B' : length > 6 ? 'M' : length > 3 ? 'K' : '')
}


    let queueembed = new Discord.RichEmbed()
    .setTitle(`**${info.title}**`)
    .setURL(`${info.video_url}`)
    .setAuthor("Ditambahkan Ke Dalam Antrian 🎶:")
    .setColor(`#21e5ff`)
    .addField("Durasi Musik:", `${convert(info.length_seconds)}`, true)
    .addField("Diupload Oleh:", `**[${info.author.name}](${info.author.channel_url})**`, true)
    .addField("Direquest Oleh:", `${message.author.tag}`, true)
    .addField("Viewer:", `${num(info.player_response.videoDetails.viewCount, 2)}`, true)
    .setThumbnail(`https://img.youtube.com/vi/${info.video_id}/hqdefault.jpg`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);


      message.channel.send(queueembed);

  }

  ops.active.set(message.guild.id, data);

}

async function play(bot, ops, data, message, args, info) {

    bot.channels.get(data.queue[0].announceChannel)

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

let num = (number, dec = 1, min = 1000) => {
  if (number === undefined || number === null) throw new Error(`Error: ${number} is not a number`)
  if (isNaN(number)) throw new Error(`Error: ${number} is not a number`)
  if (number > Number.MAX_SAFE_INTEGER) throw new Error(`Error: Number is too big`)
  if (number < min) return String(number)
  let str = String(number)
  let length = str.length
  let formatted = Number(str.substr(0, length % 3 !== 0 ? length % 3 : 3) + '.' + str.substr(length % 3 !== 0 ? length % 3 : 3)).toFixed(dec)
  return formatted + (length > 15 ? 'qd' : length > 12 ? 'T' : length > 9 ? 'B' : length > 6 ? 'M' : length > 3 ? 'K' : '')
}


    let playembed = new Discord.RichEmbed()
    .setTitle(`**${data.queue[0].songTitle}**`)
    .setURL(`https://www.youtube.com${data.queue[0].url}`)
    .setAuthor("Memainkan Musik 🎶:")
    .setColor(`#21e5ff`)
    .addField("Durasi Musik:", `${convert(data.queue[0].length)}`, true)
    .addField("Diupload Oleh:", `**[${data.queue[0].author}](${data.queue[0].authorl})**`, true)
    .addField("Direquest Oleh:", `${data.queue[0].requester}`, true)
    .addField("Viewer:", `${num(data.queue[0].view, 2)}`, true)
    .setThumbnail(`https://img.youtube.com/vi/${data.queue[0].id}/hqdefault.jpg`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);

    bot.channels.get(data.queue[0].announceChannel).send(playembed)

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
      finish(bot, ops, this);
    });

}

function finish(bot, ops, dispatcher) {

  let fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if(fetched.queue.length > 0) {

    ops.active.set(dispatcher.guildID, fetched);

    play(bot, ops, fetched);

  } else {

      ops.active.delete(dispatcher.guildID);

      let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

  }

}

  module.exports.help = {
    name: "p"
  }
