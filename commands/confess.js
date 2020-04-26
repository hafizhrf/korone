const Discord = require('discord.js');
module.exports = {
  name: 'k!confess',
  description: 'Nembak...',
  execute(msg, args) {
    const confess = (user) => {
      let first = ''
      let second = ''
      let terima = [
        'iya boleh',
        'mau',
        'oke',
        'boleh',
        'yes',
        'ayo',
        'hai',
        'yaudah',
        'gas',
      ]
      let tolak = [
        'gak',
        'sorry',
        'maaf',
        'no',
        'gabisa',
        'gamau',
        'gak mau',
        'owh aja',
        'tapi',
        'oh aja',
        'skip',
        'nah'
      ]
      let serius = [
        'serius',
        'bener',
        'mimpi',
        'sama aku',
        'sama gw',
        'serius?',
        'bener?',
        'mimpi?',
        'sama aku?',
        'really',
        'real shit',
        'honto',
        'sama gw?'
      ]

      const iyaBenerList = [
        'Iya beneran, kamu mau gak?',
        'Mau gakkkkkk -_-',
        '......',
        'Aku serius ////',
        'hooh (///Σ///)'
      ]

      const tertolak = [
        'oh gitu ya.... ok deh',
        'ok, tapi aku gak akan nyerah gitu aja!',
        'kamu jahat',
        'T_T',
        'aaaaaah, i see....'
      ]

      const mantap = [
        'kyaaaaaaa (//∇//)!!!! ureshii',
        '-/////- awawawawawawawawawwaawawawawawawa',
        'HONTOOOUUUNI??????!?!?!?!',
        'URESHIIIII (⁄ ⁄^⁄ᗨ⁄^⁄ ⁄)',
        'iasdiqwnmdoqnsdijasndasildasdkjaslndasdnasdlkasdlasdasdjaksdj'
      ]
      const checkSecondArg = (second, secondArray) => {
        if (arrayHelper(terima, secondArray[0])) {
          if (arrayHelper(terima, second)) {
            return msg.channel.send(mantap[Math.floor(Math.random() * mantap.length)]);
          } else if (arrayHelper(tolak, second)) {
            return msg.channel.send(tertolak[Math.floor(Math.random() * tertolak.length)])
          } else {
            return msg.channel.send('oke aku anggap kamu setuju ya -///- hehe~')
          }
        } else {
          if (arrayHelper(tolak, second)) {
            return msg.channel.send(tertolak[Math.floor(Math.random() * tertolak.length)])
          } else if (arrayHelper(terima, second)) {
            return msg.channel.send(mantap[Math.floor(Math.random() * mantap.length)]);
          } else {
            return msg.channel.send('oke aku anggap kamu setuju ya -///- hehe~')
          }
        }
      }
      const arrayHelper = (array, text) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (text.includes(element)) {
            return true
          }
        }
        return false
      }
      if (user) {
        msg.channel.send(`ano.. ${user} kamu mau gak jadi pacar aku -///-`);
      } else {
        msg.reply('Kamu mau jadi pacar aku gak?', {
          files: ["https://z-m-scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/fr/cp0/e15/q65/92691416_640324903479259_7360401037020102656_n.jpg?_nc_cat=104&_nc_sid=110474&_nc_ohc=yBpwthK8Q4sAX8NVZO9&_nc_ad=z-m&_nc_cid=1230&_nc_zor=9&_nc_eh=847209b7f7bc298bb7aa0c5ee21c0989&_nc_ht=z-m-scontent-sin6-1.xx&_nc_tp=14&oh=67643101085124a0b4dd8bac4fea0517&oe=5EC8F581"]
        })
      }
      const firstRes = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
        time: 30000
      });
      firstRes.on('collect', firsts => {
        if (!first) {
          first = firsts.content.toLowerCase();
          let firstArray = first.split(" ");
          if (arrayHelper(terima, firstArray[0])) {
            if (arrayHelper(serius, first)) {
              msg.channel.send(iyaBenerList[Math.floor(Math.random() * iyaBenerList.length)])
              const secondRes = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
                time: 30000
              });
              secondRes.on('collect', seconds => {
                if (!second) {
                  second = seconds.content.toLowerCase();
                  let secondArray = second.split(" ");
                  checkSecondArg(second, secondArray)
                }
              })
            } else if (arrayHelper(tolak, first)) {
              return msg.channel.send(tertolak[Math.floor(Math.random() * tertolak.length)])
            } else if (arrayHelper(terima, first)) {
              return msg.channel.send(mantap[Math.floor(Math.random() * mantap.length)]);
            }
          } else {
            if (arrayHelper(serius, first)) {
              msg.channel.send(iyaBenerList[Math.floor(Math.random() * iyaBenerList.length)])
              const secondRes = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
                time: 30000
              });
              secondRes.on('collect', seconds => {
                if (!second) {
                  second = seconds.content.toLowerCase();
                  let secondArray = second.split(" ");
                  checkSecondArg(second, secondArray)
                }
              })
            } else if (arrayHelper(terima, first)) {
              return msg.channel.send(mantap[Math.floor(Math.random() * mantap.length)]);
            } else if (arrayHelper(tolak, first)) {
              return msg.channel.send(tertolak[Math.floor(Math.random() * tertolak.length)])
            }
          }
        }
      })
    }
    confess()
  },
};