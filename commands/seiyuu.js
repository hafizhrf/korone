require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');

const seiyuu = {
  name: 'k!seiyuu',
  description: 'Menampilkan Seiyuu',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis nama Seiyuu yang diinginkan');
    }else{
      const URL = encodeURI(`https://api.jikan.moe/v3/search/person?q=${args.join(' ')}&limit=1`)
      axios.get(URL).then(res => {
        if (res.data.results.length < 1) {
          msg.channel.send('Seiyuu tidak ditemukan');
        }else{
          const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setAuthor(res.data.results[0].name , res.data.results[0].image_url)
          .setFooter("Copyright Myanimelist", "https://cdn.myanimelist.net/images/faviconv5.ico")
          .setImage(res.data.results[0].image_url)
          .setURL(res.data.results[0].url)
          msg.channel.send(embed)
        }
      }).catch(err => {
        msg.channel.send('Seiyuu tidak ditemukan');
      })
    }
  },
};

export default seiyuu;
