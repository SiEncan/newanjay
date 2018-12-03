const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d
  if (!args[0]) return message.reply(`Gunakan: ${exports.help.usage}`, {code:'asciidoc'});
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Kamu Harus  Memiliki Administrator Permission.");
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Tidak bisa menemukan user.");
  let muterole = message.guild.roles.find(`name`, "Admin");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Tentukan Waktu!");

  await(tomute.addRole(muterole.id));
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let botembed = new Discord.RichEmbed()
  .setTitle("~Admin~")
  .setDescription(`${mUser}`)
  .setColor("#ff6100")
  .addField("Akan Menjadi Admin Selama", `${ms(ms(mutetime))}`)
  message.channel.send(botembed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    let botembed = new Discord.RichEmbed()
    .setTitle("~Admin~")
    .setDescription(`${mUser}`)
    .setColor("#ff6100")
    .addField("Sudah Tidak Menjadi Admin", `Waktu Telah Habis`)
    .setTimestamp()
    .setFooter("Anjay Bot", bot.user.avatarURL);
    return message.channel.send(botembed);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "admin",
  usage: "admin @user (Waktu), Contoh: admin @user 60s"
}
