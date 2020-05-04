const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    try{

        var embedHelp = new discord.RichEmbed()
        .setTitle("__**DATABASE**__")
        .setColor("#660066")
        .setDescription("\nCOMING SOON :)")
        .setTimestamp()
        .setFooter('BDMN Database', botIcon);

        message.author.send(embedHelp);

    message.reply("View your private messages for the commands!").then(message => message.delete(10000));

    }catch (error) {
        message.channel.send("Er is iets fout gegaan!");

    }

}

module.exports.help = {
    name: "database"
}
