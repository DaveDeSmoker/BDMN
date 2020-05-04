const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    var icon = message.guild.iconURL;

    var membersEmbed = new discord.RichEmbed()
        .setTitle("SERVER")
        .setColor("#000000")
        .setThumbnail(icon)
        .setDescription(`**Hackers**\n ${message.guild.memberCount}`)
        .setTimestamp()
        .setFooter('BDMN - Members', botIcon);



    return message.channel.send(membersEmbed);


}

module.exports.help = {
    name: "hackers"
}
