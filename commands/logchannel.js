const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args, channel) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Kamu Harus Memiliki Manage Roles Permission.");
	let log = JSON.parse(fs.readFileSync("./log.json", "utf8"));
	if (!args[0]) { // jika tidak ada argument makan autorole akan dimatikan
    
		log[message.guild.id] = {
			log: 0
		};
		fs.writeFile("./log.json", JSON.stringify(log), (err) => {
			if (err) console.log(err);
		});
    
    let prole = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setDescription(`Log Channel Dimatikan!`)
  .setColor(`#ff0000`)
  .addField("Error ❌", `Sertakan Channel Yang Akan Digunakan Sebagai Log Channel.`)
  .addField("Gunakan:", `autorole [nama role]`)
  .addField("Contoh:", `autorole Member`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
  message.channel.send(prole);

	}
  
	if (args[0]) { // jika ada argumen maka akan dijadikan autorole
		let roles = args.join(" ");
		let role = message.guild.roles.find("name", roles);
		log[message.guild.id] = {
			log: channel.id // yang diambil hanya id nya saja
		};
		fs.writeFile("./log.json", JSON.stringify(log), (err) => {
			if (err) console.log(err)
		});
    
    let brole = new Discord.RichEmbed()
  .setTitle(`~Log Channel~`)
  .setDescription("Berhasil Mengubah Channel ✅")
  .setColor(`#16ff16`)
  .addField("Log Channel diubah menjadi:", `**${log.name}**`)
  .addField("Log Channel Diubah Oleh:", `${message.author.username}`)
  .setTimestamp()
  .setFooter("Anjay Bot", bot.user.avatarURL);
  
    message.channel.send(brole);
	}
}

exports.help = {
	name: "logchannel"
}
