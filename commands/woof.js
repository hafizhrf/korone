module.exports = {
  name: 'k!woof',
  description: 'Menggongong...',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send("Silahkan masukan user yang ingin di takuti, misal `k!woof @risu`");
    }else{
      msg.channel.send(`Woof Wooof!!! ${args[0]}`);
    }
  },
};
