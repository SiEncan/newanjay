const db = require('quick.db');

module.exports.run = async (bot, message, args) =>{
  
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with the Administrator Permissions`')
    const role = args[0];
    if (!role) return message.channel.send('Provide a role');

    db.set(`autoRole_${message.guild.id}`, role);
    message.channel.send(`Set the auto-role to: \`${role}\``);
  
  
}

module.exports.help = {

  name: "autorole"
  }
