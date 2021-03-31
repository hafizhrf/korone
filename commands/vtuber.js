require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const formatNumber = require('../helpers/numbering');

module.exports = {
  name: 'k!vtuber',
  description: 'Menampilkan data dari Virtual Youtuber yang dipilih',
  execute(msg, args) {
    let fields = [
      'Background',
      'Personality'
    ]
    if(args.length < 1){
      msg.channel.send('Silahkan tulis channel vtuber yang diinginkan');
    }else{
      const URL = encodeURI(`https://virtualyoutuber.fandom.com/api/v1/Search/List?query=${args.join(' ')}&limit=1`)
      msg.channel.send('Tunggu sebentar ya~').then(message => {
        axios.get(URL).then(response => {
          if (response.data.items.length < 1) {
            message.edit('Virtual Youtuber tidak tidak ditemukan');
          }else{
            axios.get(`https://virtualyoutuber.fandom.com/api/v1/Articles/AsSimpleJson?id=${response.data.items[0].id}`).then(res => {
              const embed = {
                author: {
                  name: res.data.sections[0].title,
                },
                fields: [
                ],
                color: 3122943,
                footer: {
                  icon_url: "https://i.dlpng.com/static/png/6965866_preview.png",
                  text: "Powered by Fandom"
                },
              }
              res.data.sections.shift()
              res.data.sections.map(res => {
                if(fields.includes(res.title.replace(/\s/g, ''))){
                  let contentText = ""
                  if (res.content.length > 0) {
                    res.content.map(content => {
                      if (content.type == 'paragraph') {
                        contentText += `${content.text} \n`
                      }else{
                        content.elements.map(element => {
                          contentText += `- ${element.text} \n\n`
                        })
                      }
                    })
                  }
                  if(contentText){
                    embed.fields.push({
                      name: res.title,
                      value: contentText,
                      inline: false
                    })
                  }
                }
              })
              axios.get(`https://virtualyoutuber.fandom.com/api/v1/Articles/Details?ids=${response.data.items[0].id}`).then(details => {
                if (details.data.items[response.data.items[0].id].thumbnail) {
                  embed.author.icon_url = details.data.items[response.data.items[0].id].thumbnail
                }
                message.edit('Ini hasilnya!')
                msg.channel.send({embed:embed})
              })
            }).catch((err) => {
              console.log(err);
              message.edit('Error saat menampilkan data vtuber');
            })
          }
        })
      })
    }
  },
};
