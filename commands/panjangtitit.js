module.exports = {
  name: 'k!panjangtitid',
  description: 'Mengukur titid...',
  execute(msg, args) {
    let id = Math.floor(Math.random() * 100);
    if(args.length < 1){
      msg.reply("Panjang titidmu adalah ${id}cm");
    }else{
      msg.channel.send(`Panjang titid ${args[0]} adalah ${id}cm`);
    }
  },
};
