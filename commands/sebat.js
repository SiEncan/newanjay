exports.run = async (client, message, level) => {

    message.channel.send('**Ngudud Dlu Ea Mamang**').then(async msg => {
        setTimeout(() => {
            msg.edit('🚬');
        }, 750);
        setTimeout(() => {
            msg.edit('🚬 ☁ ');
        }, 1000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁ ');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁ ');
        }, 2000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁');
        }, 2500);
        setTimeout(() => {
            msg.edit('🚬 ☁');
        }, 3000);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 3500);
        setTimeout(() => {
            msg.edit(`**Mantab Ea Mamang!!** :Dab: `);
        }, 4000);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "sebat",
    category: "Fun",
    description: "Smoke everyday :dab:",
    usage: "smoke"
};