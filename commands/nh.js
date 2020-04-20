require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const nHentaiAPI = require('nhentai-api-js');
let api = new nHentaiAPI();
const getDoujin = (id, msg) => {
  api.g(id).then(gallery => {
    const embed = {
      color: 6101172,
      footer: {
        text: "Copyright nhentai.net"
      },
      image: {
        url: gallery.getCover()
      },
      author: {
        name: gallery.title.english,
        url: `https://nhentai.net/g/${gallery.id}`,
      },
      fields: [
        {
          name: 'Pages',
          value: gallery.num_pages,
          inline: false
        }
      ],
    }
    let tags = ''
    gallery.tags.map(res => {
      tags += `${res.name}, `
    })
    embed.fields.push({
      name: "Tags",
      value: tags.slice(0,-2),
      inline: false
    })
    msg.channel.send({embed:embed})
  }).catch(err => {
    msg.channel.send('Doujin tidak ditemukan');
  })
}

module.exports = {
  name: 'k!nh',
  description: 'Menampilkan r18 doujin',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis dojin yang diinginkan / ketik `k!nh random` untuk menampilkan random dojon');
    }else{
      if (args.join(' ') === 'random') {
        let id = Math.floor(Math.random() * 300000);
        getDoujin(id, msg)
      }else if (args.join(' ').length === 6 && !isNaN(args.join(' '))) {
        getDoujin(args.join(' '), msg)
      }else{
        api.search(args.join(' ')).then(res => {
          getDoujin(res.results[0].id, msg)
        }).catch(err => {
          msg.channel.send('Doujin tidak ditemukan');
        })
      }
    }
  },
};
