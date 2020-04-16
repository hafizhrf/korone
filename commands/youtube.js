require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const formatNumber = require('../helpers/numbering');
module.exports = {
  name: 'k!youtube',
  description: 'Menampilkan statistik channel youtube',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis channel youtube yang diinginkan');
    }else{
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${args.join(' ')}&type=channel&key=${process.env.YOUTUBE_TOKEN}`).then(response => {
        if (response.data.items.length < 1) {
          msg.channel.send('Channel youtube tidak ditemukan');
        }else{
          axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${process.env.YOUTUBE_TOKEN}&id=${response.data.items[0].id.channelId}`).then(res => {
            const embed = new MessageEmbed()
            .setColor(0xff0000)
            .setDescription(res.data.items[0].snippet.title)
            .setAuthor(res.data.items[0].snippet.title , res.data.items[0].snippet.thumbnails.default.url)
            .setURL(`https://www.youtube.com/channel/${args[0]}`)
            .setDescription(res.data.items[0].snippet.description)
            .setFooter("Copyright Youtube", "https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png")
            .addField("Subscribers", formatNumber(res.data.items[0].statistics.subscriberCount), true)
            .addField("Total Viewers", formatNumber(res.data.items[0].statistics.viewCount), true)
            .addField("Total Video", formatNumber(res.data.items[0].statistics.videoCount), true)
            msg.channel.send(embed)
          }).catch(() => {
            msg.channel.send('Error saat menampilkan statistik');
          })
        }
      })
    }
  },
};
