const botName = "Q11-Bot";
const token = "Nzc2NzY2NDE0NjUxOTE2MzM5.X65qGA.QllsXBu362lRmDxRs4f3JbRMjaM"; 

const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const prefix = "!Q11";


bot.on("ready", async () => {
	
	console.log(`${botName} Loaded!`);
	bot.user.setActivity("!Q11 help for commandlist !");
	setInterval(() => {
		let midnight = new Date();
		midnight.setHours(24, 0, 0, 0);
		if (Date.now() >= midnight.getTime()) {
			category = bot.guild.channels.cache.find(c => c.name == "temporäre-kanäle" && c.type == "category");
			category.children.forEach(channel => {
				channel.delete();
			});
		}
	}, 60000)

}); 

bot.on('guildMemberAdd',  member => {
	console.log("new member => assigning role")
	member.roles.add('776506109921460237');
});

bot.on("message", async message => {

	if(message.author.bot) return;

	if(!message.content.startsWith(prefix)) return;

    if(message.content === `${prefix} help`) {
		message.channel.send("command list: !Q11 help\nrandom number x to y: !Q11 randomNumber <x> <y>\ncreate temporary channel: !Q11 createTempChannel <name> <type(text or voice)> ");
	}
	
	if(message.content === `${prefix} getRoles`) {
		console.log(message.guild.roles.cache);
	}

	if((message.content.split(" ")[0] + " " + message.content.split(" ")[1]) === `${prefix} randomNumber`) {
		min = Math.ceil(parseInt(message.content.split(" ")[2]));
		max = Math.floor(parseInt(message.content.split(" ")[3]));
		message.channel.send(Math.floor(Math.random() * (max - min + 1)) + min);
	}

	if((message.content.split(" ")[0] + " " + message.content.split(" ")[1]) === `${prefix} createTempChannel`) {
		categoryID  = message.guild.channels.cache.find(c => c.name == "temporäre-kanäle" && c.type == "category").id;
		message.guild.channels.create("temp-"+(message.content.split(" ")[2]), {
			type: message.content.split(" ")[3],
		}).then((channel) => {
			channel.setParent(categoryID);
		});
	}

	/*if (message.content === `${prefix} deleteSubChannels`) {
		category = message.guild.channels.cache.find(c => c.name == "temporäre-kanäle" && c.type == "category");
		category.children.forEach(channel => {
			channel.delete();
		});
	}*/

});



bot.login(token);