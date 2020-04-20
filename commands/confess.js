module.exports = {
  name: 'k!confess',
  description: 'Nembak...',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send("Silahkan masukan user yang ingin di confess, misal `k!confess @risu`");
    }else{
      msg.channel.send(`ano.. ${args[0]} kamu mau gak jadi pacar aku -///-`);
    }
  },
};
