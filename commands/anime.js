require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const formatNumber = require('../helpers/numbering');

const anime = {
  name: 'k!anime',
  description: 'Menampilkan statistik anime',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis anime yang diinginkan');
    }else{
      const URL = encodeURI(`https://api.jikan.moe/v3/search/anime?q=${args.join(' ')}&limit=1`)
      axios.get(URL).then(res => {
        if (res.data.results.length < 1) {
          msg.channel.send('Anime tidak ditemukan');
        }else{
          const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setDescription(res.data.results[0].synopsis)
          .setAuthor(res.data.results[0].title , res.data.results[0].image_url)
          .setFooter("Copyright Myanimelist", "https://cdn.myanimelist.net/images/faviconv5.ico")
          .setImage(res.data.results[0].image_url)
          .addField("Type", res.data.results[0].type, false)
          .addField("Episodes", res.data.results[0].episodes, false)
          .addField("Score", res.data.results[0].score, false)
          .addField("Members", formatNumber(res.data.results[0].members), false)
          .addField("Rating", res.data.results[0].rated, false)
          msg.channel.send(embed)
        }
      }).catch(err => {
        msg.channel.send('Anime tidak ditemukan');
      })
    }
  },
};

export default anime
