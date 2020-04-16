require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'k!youtube',
  description: 'Get specific youtube channel stat!',
  execute(msg, args) {
    // console.log(args);
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${process.env.YOUTUBE_TOKEN}&id=${args[0]}`).then(res => {
      const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setDescription(res.data.items[0].snippet.title)
      .setAuthor(res.data.items[0].snippet.title , res.data.items[0].snippet.thumbnails.default.url)
      .setURL(`https://www.youtube.com/channel/${args[0]}`)
      .setDescription(res.data.items[0].snippet.description)
      .setFooter("Copyright Youtube", "https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png")
      .addField("Subscribers", res.data.items[0].statistics.subscriberCount, true)
      .addField("Total Viewers", res.data.items[0].statistics.viewCount, true)
      .addField("Total Video", res.data.items[0].statistics.videoCount, true)
      msg.channel.send(embed)
    }).catch(() => {
      msg.channel.send('Youtube Channel not found');
    })
  },
};
