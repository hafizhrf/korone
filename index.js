require('dotenv').config();

const Discord = require('discord.js');
const botCommands = require('./commands');
const bot = new Discord.Client();
var express = require('express');
var app = express();

bot.commands = new Discord.Collection();
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('with Okayu :3')
});

bot.on('message', msg => {
  if (!msg.author.bot) {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'k!help'){
      let fields = []
      bot.commands.map((val) => {
        fields.push({ name: "`"+val.name+"`", value: val.description })
      })
      const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Korone command list')
      .addFields(fields)
      return msg.channel.send(embed)
    }

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
