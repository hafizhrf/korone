module.exports = {
  name: 'k!panjangtitid',
  description: 'Mengukur titid...',
  execute(msg, args) {
    // if(!msg.channel.nsfw){
    //   return msg.channel.send('Command ini hanya bisa digunakan di NSFW Channel');
    // }
    let id = Math.floor(Math.random() * 100);
    if(args.length < 1){
      if(id > 80){
        msg.reply(`Panjang titidmu adalah ${id}cm, gokil aku suka :flushed:`);
      }else if(id > 60){
        msg.reply(`Panjang titidmu adalah ${id}cm, boleh lah aku suka :flushed:`);
      }else if(id > 30){
        msg.reply(`Panjang titidmu adalah ${id}cm, b aja`);
      }else{

        msg.reply(`Panjang titidmu adalah ${id}cm, ih pendek`);

      }
    }else{
      if(id > 80){
        msg.channel.send(`Panjang titid ${args[0]} adalah ${id}cm, gokil aku suka :flushed:`);
      }else if(id > 60){
        msg.channel.send(`Panjang titid ${args[0]} adalah ${id}cm, boleh lah aku suka :flushed:`);
      }else if(id > 30){
        msg.channel.send(`Panjang titid ${args[0]} adalah ${id}cm, b aja`);
      }else{

        msg.channel.send(`Panjang titid ${args[0]} adalah ${id}cm, ih pendek`);

      }
    }
  },
};
