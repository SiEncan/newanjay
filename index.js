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
    let status = [`Ketik *help`, `Melayani ${bot.users.size} User 👥`, `https://discord.gg/WaNhKGF`, `Berada di ${bot.guilds.size} Server 🌏`, `Default Prefix: (*)`]
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random)
}

bot.on("ready", () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    setInterval(changing_status, 5000);

});

bot.on("guildMemberAdd", async member => {
    let role = member.guild.roles.find("name", "Member");
    member.addRole(role).catch(console.error);
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} Joined The Server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome-to-your-destiny");
  welcomechannel.send(`WOW! , ${member} Has Arrived To Their Destiny!`);
});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} Left The Server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome-to-your-destiny");
  welcomechannel.send(`${member} Has Left The Server.`);

})

bot.on('voiceStateUpdate', async (oldMember, newMember) => {
  // Here I'm storing the IDs of their voice channels, if available
  let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.name : null;
  let newChannel = newMember.voiceChannel ? newMember.voiceChannel.name : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
  let log = oldMember.guild.channels.find('name', 'log');
  if (oldMember.guild.me.hasPermission('MANAGE_CHANNELS') && !log) {
      await oldMember.guild.createChannel('log', 'text');
    }
    if (!log) {
        return console.log('The logs channel does not exist and cannot be created')
    }

  if (oldChannel == undefined) {
    const joinvembed = new Discord.RichEmbed()
        .setTitle('~Join Voice Channel~')
        .addField("User:", `${newMember}`)
        .addField("Voice Channel:", `${newChannel}`)
        .setColor(`#00ff19`)
        .setTimestamp();

    log.send(joinvembed);
  } else if (newChannel == undefined) {
      const leavevembed = new Discord.RichEmbed()
          .setTitle('~Leave Voice Channel~')
          .addField("User:", `${newMember}`)
          .addField("Voice Channel:", `${oldChannel}`)
          .setColor(`#ff0a0a`)
          .setTimestamp();
    log.send(leavevembed);
  } else if (oldChannel !== null && newChannel !== null) {
    const switchvembed = new Discord.RichEmbed()
        .setTitle('~Pindah Voice Channel~')
        .addField("User:", `${newMember}`)
        .addField("Dari Channel:", `${oldChannel}`)
        .addField("Ke:", `${newChannel}`)
        .setColor(`#00e5ff`)
        .setTimestamp();

    log.send(switchvembed);

  }
});

bot.on('messageDelete', async (message) => {
    const log = message.guild.channels.find('name', 'log');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !log) {
        await message.guild.createChannel('log', 'text');
    }
    if (!log) {
        return console.log('The logs channel does not exist and cannot be created')
    }
    const logembed = new Discord.RichEmbed()
        .setTitle('**~Pesan Dihapus~**')
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField("Pesan:", `${message.content}`)
        .addField("Di Channel:", `${message.channel}`)
        .addField("Dikirim Oleh:", `${message.author.tag}`)
        .setColor(`#ff0a0a`)
        .setFooter(`ID:${message.channel.id}`)
        .setTimestamp();

    log.send(logembed);
})



bot.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === 'log');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("**~Channel Dibuat~**")
		.setColor("#00ff00")
		.addField("Tipe Channel:",`**${channel.type} channel**`)
    .addField("Nama Channel:" ,`**${channel}**`)
		.setTimestamp(new Date());
	logs.send(cembed)
});

bot.on("channelDelete", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'log');
	if (!logs) return console.log("Can't find logs channel.");

	const cembed = new Discord.RichEmbed()
  .setTitle("**~Channel Dihapus~**")
  .setColor("#ff0a0a")
  .addField("Tipe Channel:",`**${channel.type} channel**`)
  .addField("Nama Channel:" ,`**#${channel.name}**`)
  .setTimestamp(new Date());
	logs.send(cembed)
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
  .setDescription(`<@${message.author.id}>`)
  .setColor("#13c10d");

  message.channel.send(coinEmbed)
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
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

bot.login(botconfig.token);
