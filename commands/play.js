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
      thumbnail: info.thumbnail_url
  });

  if(!data.dispatcher) play(bot, ops, data, message, info);
  else {

    let convert = (input) => {
    let m = input >= 60 ? Math.floor(input / 60) : 0;
    let s = input % 60;

    m = check(m);
    s = check(s);

    return m + ":" + s;
}

let check = (input) => {
    return input < 10 ? "0" + input : input;

}

    let queueembed = new Discord.RichEmbed()
    .setTitle(`**${info.title}**`)
    .setURL(`${info.video_url}`)
    .setAuthor("Ditambahkan Ke Dalam Antrian 🎶:")
    .setColor(`#21e5ff`)
    .addField("Durasi Musik:", `${convert(info.length_seconds)}`, true)
    .addField("Diupload Oleh:", `${info.author.name}`, true)
    .addField("Direquest Oleh:", `${message.author.tag}`)
    .setThumbnail(`${info.thumbnail_url}`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);


      message.channel.send(queueembed);

  }

  ops.active.set(message.guild.id, data);

}

async function play(bot, ops, data, message, args, info) {

    bot.channels.get(data.queue[0].announceChannel)

    let convert = (input) => {
    let m = input >= 60 ? Math.floor(input / 60) : 0;
    let s = input % 60;

    m = check(m);
    s = check(s);

    return m + ":" + s;
}

let check = (input) => {
    return input < 10 ? "0" + input : input;

}



    let playembed = new Discord.RichEmbed()
    .setTitle(`**${data.queue[0].songTitle}**`)
    .setURL(`https://www.youtube.com${data.queue[0].url}`)
    .setAuthor("Memainkan Musik 🎶:")
    .setColor(`#21e5ff`)
    .addField("Durasi Musik:", `${convert(data.queue[0].length)}`, true)
    .addField("Diupload Oleh:", `${data.queue[0].author}`, true)
    .addField("Direquest Oleh:", `${data.queue[0].requester}`)
    .setThumbnail(`${data.queue[0].thumbnail}`)
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
      if(vc) vc.leave();

  }

}

  module.exports.help = {
    name: "play"
  }
