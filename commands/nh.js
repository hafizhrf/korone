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
      if (args.join(' ') === 'random') {
        api.random().then(gallery => {
          const embed = {
            color: 6101172,
            footer: {
              text: "Copyright nhentai.net"
            },
            image: {
              url: gallery.images.cover.t
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
          console.log(err);
          msg.channel.send('Doujin tidak ditemukan');
        })
      }else if (args.join(' ').length === 6 && !isNaN(args.join(' '))) {
        api.g(args.join(' ')).then(gallery => {
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
              url: `https://nhentai.net/g/${args.join(' ')}`,
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
      }else{
        api.search(args.join(' ')).then(res => {
          api.g(res.results[0].id).then(gallery => {
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
                url: `https://nhentai.net/g/${res.results[0].id}`,
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
        }).catch(err => {
          msg.channel.send('Doujin tidak ditemukan');
        })
      }
    }
  },
};
