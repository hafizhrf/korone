require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const formatNumber = require('../helpers/numbering');

module.exports = {
  name: 'k!whatanime',
  description: 'Mencari anime berdasarkan gambar',
  execute(msg, args) {
    var Attachment = (msg.attachments).array();
    // console.log(Attachment)
    if(Attachment.length < 1){
      msg.channel.send('Attachment gambar tidak ditemukan');
    }else{
      const URL = encodeURI(`https://trace.moe/api/search?url=${Attachment[0].url}`)
      msg.channel.send('Tunggu sebentar ya~').then(message => {
        axios.get(URL).then(res => {
          if (res.data.docs.length < 1) {
            message.edit('Anime tidak ditemukan');
          }else{
            const embed = {
              color: 3117311,
              footer: {
                text: 'Trace.moe'
              },
              image: {
                url: Attachment[0].url
              },
              author: {
                name:  res.data.docs[0].title,
                url:  `https://myanimelist.net/anime/${res.data.docs[0].mal_id}`,
              },
              fields: [
                {
                  name: 'Title',
                  value: res.data.docs[0].title_english,
                  inline: false
                },
                {
                  name: 'Similarity',
                  value: res.data.docs[0].similarity.toFixed(2),
                  inline: false
                },
                {
                  name: 'Episode',
                  value: res.data.docs[0].episode,
                  inline: false
                }
              ],
            }
            message.edit('Ini yang bisa Korone temukan.');
            msg.channel.send({embed: embed})
          }
        }).catch(err => {
          console.log(err)
          message.edit('Anime tidak ditemukan');
        })
      })
    }
  },
};
