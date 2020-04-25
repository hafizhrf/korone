require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'k!korone',
  description: 'Menampilkan random Korone gif',
  execute(msg, args) {
    const URL = encodeURI(`https://api.tenor.com/v1/random?q=inugami korone&key=${process.env.TENOR_TOKEN}&limit=1`)
      axios.get(URL).then(res => {
        // console.log(res.data);
        const embed = {
          color: 3117311,
          footer: {
            text: 'Copyright Tenor'
          },
          image: {
            url: res.data.results[0].media[0].gif.url
          }
        }
        msg.channel.send({embed:embed})
      }).catch(err => {
        // console.log(err);
        msg.channel.send('Error');
      })
    },
  };
