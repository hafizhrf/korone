require('dotenv').config();
const axios = require('axios')
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const getApod = (msg, id = '') => {
  const URL = encodeURI(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_TOKEN}&date=${id}`)
    axios.get(URL).then(res => {
      // console.log(res);
      const embed = {
        color: 3117311,
        footer: {
          text: res.data.date
        },
        image: {
          url: res.data.url
        },
        author: {
          name:  res.data.title,
          url:  res.data.hdurl,
        },
        description: res.data.explanation,
        fields: [
          {
            name: 'Copyright',
            value: res.data.copyright || 'Not found',
            inline: false
          }
        ],
      }
      msg.channel.send({embed:embed})

    }).catch(err => {
      console.log(err.response.data.msg);
      if(err.response.data.msg === 'Date must be between Jun 16, 1995 and Apr 20, 2020.'){
        msg.channel.send('Tanggal hanya mencakup dari `16 Juni 1995` sampai `sekarang`');
      }else{
        msg.channel.send('Format tanggal harus `YYYY-MM-DD`');
      }
    })
}
module.exports = {
  name: 'k!apod',
  description: 'Menampilkan gambar astronomi hari ini atau custom `k!apod YYYY-MM-DD`',
  execute(msg, args) {
    if (args.length === 0) {
      getApod(msg)
    }else{
      getApod(msg, args.join(' '))
    }
  },
};
