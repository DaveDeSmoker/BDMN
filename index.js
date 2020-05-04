const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");


const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("ERROR: Geen files");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`)

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("with HACKS", {type: "PLAYING"});
});

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", "Visitors");

    if (!role) return;

    member.addRole(role);

});

// bot.on("guildMemberAdd"), member => {
//     const channel = member.guild.channels.find(name,"welcome")


// });
   } 
    if (command === `${prefix}database`) {
        var botIcon = bot.user.displayAvatarURL;

        var database = new discord.RichEmbed()
            .setDescription("DATABASE")
            .setColor("#ee0000")
            .addField("Site: ", "COMING SOON")
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);

        return message.channel.send(database);
  }





bot.login(process.env.token);
