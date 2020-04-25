require('dotenv').config();
const axios = require('axios')
const moment = require('moment');
const Discord = require('discord.js');
const getApod = (msg, id = '') => {
  const URL = encodeURI(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_TOKEN}&date=${id}`)
  msg.channel.send('Tunggu sebentar ya~').then(message => {
    axios.get(URL).then(res => {
      const embed = {
        color: 3117311,
        footer: {
          text: res.data.date
        },
        image: {
          url: res.data.url
        },
        author: {
          name: res.data.title,
          url: res.data.hdurl,
        },
        description: res.data.explanation,
        fields: [{
          name: 'Copyright',
          value: res.data.copyright || 'Not found',
          inline: false
        }],
      }
      if (res.data.media_type === 'video') {
        embed.fields.push({
          name: 'Video Url',
          value: res.data.url || '-',
          inline: false
        })
        embed.author.url = res.data.url
      }
      message.edit(`Ini dia apod di tanggal ${res.data.date}`)
      msg.channel.send({
        embed: embed
      })
  
    }).catch(err => {
      console.log(err.response.data.msg);
      if (err.response.data.msg === 'Date must be between Jun 16, 1995 and Apr 20, 2020.') {
        message.edit('Tanggal hanya mencakup dari `16 Juni 1995` sampai `sekarang`');
      } else {
        message.edit('Format tanggal bermasalah, silahkan coba lagi');
      }
    })
  })
}
module.exports = {
  name: 'k!apod',
  description: 'Menampilkan gambar astronomi hari ini atau custom `k!apod YYYY-MM-DD`',
  execute(msg, args) {
    if (args.join(' ') === 'today') {
      return getApod(msg)
    } else {
      let year = ''
      let day = ''
      let month = ''
      msg.channel.send('Ketik tahun lahir kamu');
      const yearCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
        time: 10000
      });
      yearCollector.on('collect', years => {
        if (!year) {
          year = years.content
          msg.channel.send(`Masukan tanggal lahir kamu dalam angka`);
        }
        const dayCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
          time: 10000
        });
        dayCollector.on('collect', days => {
          if (!day) {
            day = days.content
            msg.channel.send(`Masukan bulan lahir kamu dalam angka`);
          }
          const monthCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
            time: 10000
          });
          monthCollector.on('collect', months => {
            month = months.content
            return getApod(msg, `${year}-${month}-${day}`)
          })
        })
      })
    }
  },
};