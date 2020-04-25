const Discord = require('discord.js');

module.exports = {
  name: 'k!woof',
  description: 'Menggongong...',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send("Siapa yang mau digongongin?");
      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
      console.log(msg)
      collector.on('collect', message => {
        message.channel.send(`Woof Woooof!! ${message.content}`);
      })
    }else{
      msg.channel.send(`Woof Wooof!!! ${args[0]}`);
    }
  },
};
