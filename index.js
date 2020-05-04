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
var swearWords = ["kanker","discord.gg","kkr","aids","downie","homo","kalf","hoer","slet","bitch","porno","pornhub","xnxx","porn","youtube.com"];

bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type === "dn") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, arguments);


    var msg = message.content.toLowerCase();

   for(var i = 0; i < swearWords.length; i++){

        if(msg.includes(swearWords[i])) {

            message.delete();

            return message.channel.send("Dont send that message!").then(msg => msg.delete(5000));

        }



   } 

    if (command === `${prefix}database`) {
        var botIcon = bot.user.displayAvatarURL;

        var database = new discord.RichEmbed()
            .setDescription("DATABASE")
            .setColor("#000000")
            .addField("Site: ", "COMING SOON")
            .setTimestamp()
            .setFooter('BDMN - Database', botIcon);

        return message.channel.send(database);
  }
});




bot.login(process.env.token);
