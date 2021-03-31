require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const qs = require('querystring')

module.exports = {
  name: 'k!template',
  description: 'Membuat meme',
  execute(msg, args) {
    if(args.length < 1){
      msg.channel.send('Silahkan tulis argumen');
    }else{
      const template = [
        '200452379',
        '219542839',
        '219156202',
        '224263529',
        '237323164',
        '232181493',
        '243481668',
        '231538189'
      ]

      const pointing = [
        '237323164',
        '232181493',
        '243481668',
        '245856990',
        '231538189'
      ]
      const URL = encodeURI(`https://api.imgflip.com/caption_image`)
        const requestBody = {
          template_id: template[Math.floor(Math.random() * template.length)],
          username: process.env.IMGFLIP_USERNAME,
          password: process.env.IMGFLIP_PASSWORD,
          text0: 'ARGUMEN YANG BAGUS',
          text1: `TAPI ${args.join(' ')}`
        }
        if(args[0] == 'pointing' && args.length > 1){
          args.shift()
          requestBody.template_id = pointing[Math.floor(Math.random() * pointing.length)]
          requestBody.text0 = ''
          requestBody.text1 = args.join(' ')
        }

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        msg.channel.send('Tunggu sebentar ya~').then(message => {
          axios.post(URL, qs.stringify(requestBody), config).then(res => {
            message.edit('nih udah jadi')
            msg.channel.send({
              files: [res.data.data.url]
            })
          }).catch(err => {
            console.log(err);
            message.edit('Gagal membuat template');
          })
        })
      }
    },
  };
