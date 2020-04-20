require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const formatNumber = require('../helpers/numbering');

module.exports = {
  name: 'k!manga',
  description: 'Menampilkan statistik manga',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis manga yang diinginkan');
    }else{
      const URL = encodeURI(`https://api.jikan.moe/v3/search/manga?q=${args.join(' ')}&limit=1`)
      axios.get(URL).then(res => {
        if (res.data.results.length < 1) {
          msg.channel.send('Manga tidak ditemukan');
        }else{
          const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setDescription(res.data.results[0].synopsis)
          .setAuthor(res.data.results[0].title , res.data.results[0].image_url)
          .setFooter("Copyright Myanimelist", "https://cdn.myanimelist.net/images/faviconv5.ico")
          .setImage(res.data.results[0].image_url)
          .addField("Type", res.data.results[0].type, false)
          .addField("Volumes", res.data.results[0].volumes, false)
          .addField("Chapters", res.data.results[0].chapters, false)
          .addField("Score", res.data.results[0].score, false)
          .addField("Members", formatNumber(res.data.results[0].members), false)
          .addField("Publishing", res.data.results[0].publishing ? 'Yes' : 'No', false)
          msg.channel.send(embed)
        }
      }).catch(err => {
        msg.channel.send('Manga tidak ditemukan');
      })
    }
  },
};
