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
      if (args.join(' ').length == 6 && !isNaN(args.join(' '))) {
        console.log(args.join(' '));
        api.g(args.join(' ')).then(gallery => {
          const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setAuthor(gallery.title.english , gallery.getCover())
          .setFooter("Copyright Nhentai")
          msg.channel.send(embed)
        }).catch(err => {
          msg.channel.send('Doujin tidak ditemukan');
        })
      }else{
        api.search(args.join(' ')).then(res => {
          const embed = new MessageEmbed()
          .setColor(0xff0000)
          .setAuthor(res.results[0].title , res.results[0].thumbnail.s)
          .setFooter("Copyright Nhentai")
          msg.channel.send(embed)
        }).catch(err => {
          msg.channel.send('Doujin tidak ditemukan');
        })
      }
    }
  },
};
