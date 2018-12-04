const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Kamu Harus Memiliki Manage Roles Permission.");
	let logchannel = JSON.parse(fs.readFileSync("./logchannel.json", "utf8"));
	if (!args[0]) { // jika tidak ada argument makan autorole akan dimatikan

		logchannel[message.guild.id] = {
			logs: 0
		};
		fs.writeFile("./logchannel.json", JSON.stringify(logchannel), (err) => {
			if (err) console.log(err);
		});

    let pchan = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Log Channel DiMatikan!`)
  .addField("Gunakan:", `logchannel [nama channel]`)
  .addField("Contoh:", `logchannel logs`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  message.channel.send(pchan);

	}

	if (args[0]) { // jika ada argumen maka akan dijadikan autorole
		let channel = args.join(" ");
		let log = message.guild.channels.find("name", channel);
		logchannel[message.guild.id] = {
			log: log.id // yang diambil hanya id nya saja
		};
		fs.writeFile("./logchannel.json", JSON.stringify(logchannel), (err) => {
			if (err) console.log(err)
		});

    let brole = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setColor(`#16ff16`)
  .addField("Berhasil Mengubah Channel ✅", `Log Channel DiAktifkan`)
  .addField("Log Channel Diubah Menjadi:", `**${log.name}**`)
  .addField("Log Channel Diubah Oleh:", `${message.author.username}`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

    message.channel.send(brole);
	}
}

exports.help = {
	name: "logchannel"
}