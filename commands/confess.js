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
        'y',
        'k',
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
        'g',
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
        'maji',
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
        '//0_0//'
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
        msg.reply('Kamu mau jadi pacar aku gak?')
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
            }else{
              return msg.channel.send('dahlah, gajelas')
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
            }else{
              return msg.channel.send('apaan sih gajelas, aku nanya serius tau... hmmph')
            }
          }
        }
      })
    }
    confess()
  },
};
