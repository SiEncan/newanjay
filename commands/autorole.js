const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Kamu Harus Memiliki Manage Roles Permission.");
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!args[0]) { // jika tidak ada argument makan autorole akan dimatikan
    let prole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Role Yang Akan Digunakan Sebagai Autorole.`)
  .addField("Gunakan:", `autorole [nama role]`)
  .addField("Contoh:", `autorole Member`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!role) return message.channel.send(prole);
    
		autorole[message.guild.id] = {
			role: 0
		};
		fs.writeFile("./autorole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err);
		});
		message.channel.send(`**${message.author.username}** autorole sudah dimatikan!`);
	}
  
	if (args[0]) { // jika ada argumen maka akan dijadikan autorole
    let brole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setDescription("Berhasil Mengubah Role ✅")
  .setColor(`#16ff16`)
  .addField("Auto Role diubah menjadi:", `\`${role}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(brole);
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

const db = require('quick.db');
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Kamu Harus Memiliki Administrator Permission.')
    const role = args[0];
  
  let prole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Nama Role Yang Akan Digunakan Sebagai Autorole.`)
  .addField("Gunakan:", `autorole [nama role]`)
  .addField("Contoh:", `autorole Member`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);

  if (!role) return message.channel.send(prole);

exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Kamu Harus Memiliki Manage Roles Permission.");
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
    db.set(`autoRole_${message.guild.id}`, role);
  
  let brole = new Discord.RichEmbed()
  .setTitle(`~Autorole~`)
  .setDescription("Berhasil Mengubah Role ✅")
  .setColor(`#16ff16`)
  .addField("Auto Role diubah menjadi:", `\`${role}\``)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(brole);
  
  
}

exports.help = {
	name: "autorole"
}
module.exports.help = {

  name: "autorole"
  }