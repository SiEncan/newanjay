const express = require('express');
const http = require('http');
const app = express();
// 5 Minute Ping Times
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require ("fs");
const db = require('quick.db');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
const active = new Map();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require (`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

function changing_status() {
    let status = [`Ketik *help`, `Melayani ${bot.users.size} User 👥`, `Berada di ${bot.guilds.size} Server 🌏`, `Default Prefix: (*)`]
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random, { type: 'STREAMING', url: `https://www.twitch.tv/Anjay.Corp`});
}

bot.on("ready", () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    setInterval(changing_status, 5000);

});

bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) {
		autorole[member.guild.id] = {
			autorole: botconfig.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return;
	member.addRole(role);
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member} Joined The Server.`);
  const welChan = await db.fetch(`welChan_${member.guild.id}`);
  
  const channel = await member.guild.channels.find(channel => channel.name.toLowerCase() === welChan.toLowerCase()  || channel.id === welChan.toLowerCase());
    if (!channel) return console.log("Tidak bisa menemukan welcome channel");

  channel.send(`🎉   Selamat Datang ${member}!   🎉`);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} Left The Server.`);
  const welChan = await db.fetch(`welChan_${member.guild.id}`);
  
  const channel = await member.guild.channels.find(channel => channel.name.toLowerCase() === welChan.toLowerCase()  || channel.id === welChan.toLowerCase());
    if (!channel) return console.log("Tidak bisa menemukan welcome channel");

  channel.send(`${member} Telah Keluar Dari Server.`);

})

       
bot.on('voiceStateUpdate', async (oldMember, newMember) => {
  // Here I'm storing the IDs of their voice channels, if available
  let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.name : null;
  let newChannel = newMember.voiceChannel ? newMember.voiceChannel.name : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
  const logChan = await db.fetch(`logChan_${oldMember.guild.id}`);
  const channel = await oldMember.guild.channels.find(channel => channel.name.toLowerCase() === logChan.toLowerCase()  || channel.id === logChan.toLowerCase());
  
    if (!channel) return console.log("Tidak bisa menemukan log channel");

  if (oldChannel == undefined) {
    const joinvembed = new Discord.RichEmbed()
        .setTitle('~Join Voice Channel~')
        .addField("User:", `${newMember}`)
        .addField("Voice Channel:", `${newChannel}`)
        .setColor(`#00ff19`)
        .setTimestamp();

    channel.send(joinvembed);
  } else if (newChannel == undefined) {
      const leavevembed = new Discord.RichEmbed()
          .setTitle('~Leave Voice Channel~')
          .addField("User:", `${newMember}`)
          .addField("Voice Channel:", `${oldChannel}`)
          .setColor(`#ff0a0a`)
          .setTimestamp();
    channel.send(leavevembed);
  } else if (oldChannel !== null && newChannel !== null) {
    const switchvembed = new Discord.RichEmbed()
        .setTitle('~Pindah Voice Channel~')
        .addField("User:", `${newMember}`)
        .addField("Dari Channel:", `${oldChannel}`)
        .addField("Ke:", `${newChannel}`)
        .setColor(`#00e5ff`)
        .setTimestamp();

    channel.send(switchvembed);

  }
});



bot.on('messageDelete', async (message) => {
    const logChan = await db.fetch(`logChan_${message.guild.id}`);
    const channel = await message.guild.channels.find(channel => channel.name.toLowerCase() === logChan.toLowerCase()  || channel.id === logChan.toLowerCase());
  
    if (!channel) return console.log("Tidak bisa menemukan log channel");
    const logembed = new Discord.RichEmbed()
        .setTitle('**~Pesan Dihapus~**')
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField("Pesan:", `${message.content}`)
        .addField("Di Channel:", `${message.channel}`)
        .addField("Dikirim Oleh:", `${message.author.tag}`)
        .setColor(`#ff0a0a`)
        .setFooter(`ID:${message.channel.id}`)
        .setTimestamp();

    channel.send(logembed);
})



bot.on("channelCreate", async channel => {
  const logChan = await db.fetch(`logChan_${channel.guild.id}`);
  const chan = await channel.guild.channels.find(chan => chan.name.toLowerCase() === logChan.toLowerCase()  || chan.id === logChan.toLowerCase());
	if (!chan) return console.log("Tidak bisa menemukan log channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("**~Channel Dibuat~**")
		.setColor("#00ff00")
		.addField("Tipe Channel:",`**${channel.type} channel**`)
    .addField("Nama Channel:" ,`**${channel}**`)
		.setTimestamp(new Date());
	chan.send(cembed)
});

bot.on("channelDelete", async channel => {
	const logChan = await db.fetch(`logChan_${channel.guild.id}`);
  const chan = await channel.guild.channels.find(chan => chan.name.toLowerCase() === logChan.toLowerCase()  || chan.id === logChan.toLowerCase());
	if (!chan) return console.log("Tidak bisa menemukan log channel.");

	const cembed = new Discord.RichEmbed()
  .setTitle("**~Channel Dihapus~**")
  .setColor("#ff0a0a")
  .addField("Tipe Channel:",`**${channel.type} channel**`)
  .addField("Nama Channel:" ,`**#${channel.name}**`)
  .setTimestamp(new Date());
	chan.send(cembed)
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") {
    let loembed = new Discord.RichEmbed()
    .setTitle("Direct Message To The Bot")
    .addField(`Sent By:`,`<@${message.author.id}>`)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .addField(`Message: `,message.content)
    .setFooter(`DM Bot Messages | DM Logs`)
    .setTimestamp();

    bot.users.get("500457305834389529").send(loembed)
  }


  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed =  new Discord.RichEmbed()
  .setAuthor(`+${coinAmt} Cash 💰`)
  .setDescription(`${message.author.username}`)
  .setColor("#13c10d");

  message.channel.send(coinEmbed).then(msg => msg.delete(3000));
  }

  let xpAdd = Math.floor(Math.random() * 10) + 1;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle("Naik Level!")
    .setColor("#fff200")
    .addField("Level Sekarang:", curlvl + 1);

    message.channel.send(lvlup)
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let ops = {
      active: active
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot,message,args,ops);

});

bot.login(process.env.TOKEN);
