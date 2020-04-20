require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const nHentaiAPI = require('nhentai-api-js');
let api = new nHentaiAPI();

module.exports = {
  name: 'k!nh',
  description: 'Menampilkan r18 doujin',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis dojin yang diinginkan / ketik `k!nh random` untuk menampilkan random dojon');
    }else{
      api.search(args.join(' ')).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
      // axios.get(URL).then(res => {
      //   if (res.data.results.length < 1) {
      //     msg.channel.send('Manga tidak ditemukan');
      //   }else{
      //     const embed = new MessageEmbed()
      //     .setColor(0xff0000)
      //     .setDescription(res.data.results[0].synopsis)
      //     .setAuthor(res.data.results[0].title , res.data.results[0].image_url)
      //     .setFooter("Copyright Myanimelist", "https://cdn.myanimelist.net/images/faviconv5.ico")
      //     .setImage(res.data.results[0].image_url)
      //     .addField("Type", res.data.results[0].type, false)
      //     .addField("Volumes", res.data.results[0].volumes, false)
      //     .addField("Chapters", res.data.results[0].chapters, false)
      //     .addField("Score", res.data.results[0].score, false)
      //     .addField("Members", formatNumber(res.data.results[0].members), false)
      //     .addField("Publishing", res.data.results[0].publishing ? 'Yes' : 'No', false)
      //     msg.channel.send(embed)
      //   }
      // }).catch(err => {
      //   msg.channel.send('Manga tidak ditemukan');
      // })
    }
  },
};
