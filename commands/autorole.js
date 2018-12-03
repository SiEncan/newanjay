const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Maaf kamu tidak bisa menggunakan perintah ini!");
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!args[0]) { // jika tidak ada argument makan autorole akan dimatikan
		autorole[message.guild.id] = {
			role: 0
		};
		fs.writeFile("./autorole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err);
		});
		message.channel.send(`**${message.author.username}** autorole sudah dimatikan!`);
	}
	if (args[0]) { // jika ada argumen maka akan dijadikan autorole
		let roles = args.join(" ");
		let role = message.guild.roles.find("name", roles);
		autorole[message.guild.id] = {
			role: role.id // yang diambil hanya id nya saja
		};
		fs.writeFile("./autorole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err)
		});
		message.channel.send(`**${message.author.username}** autorole diset ke **${role.name}**`);
	}
}

exports.help = {
	name: "autorole"
}
