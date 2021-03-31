module.exports = {
  name: 'k!adutitid',
  description: 'Mengadu Titid...',
  execute(msg, args) {
    // if(!msg.channel.nsfw){
    //   return msg.channel.send('Command ini hanya bisa digunakan di NSFW Channel');
    // }
    let users = []
    msg.mentions.users.map(value => {
      users.push(value)
    })

    let janken = [
      ':hand_splayed:',
      ':fist:',
      ':v:'
    ]
    const checkJanken = (j1, j2) => {
      switch (j1) {
        case ':hand_splayed:':
          if(j2 == ':fist:'){
            return true
          }else{
            return false
          }
        break;
        case ':fist:':
          if(j2 == ':v:'){
            return true
          }else{
            return false
          }
        break;
        case ':v:':
          if(j2 == ':hand_splayed:'){
            return true
          }else{
            return false
          }
        break;
        default:

      }
    }
    let user1Janken =  janken[Math.floor(Math.random() * janken.length)]
    janken2 = janken.filter(e => {
       return e !== user1Janken
    })

    let user2Janken =  janken2[Math.floor(Math.random() * janken2.length)]

    let hp1 = 100
    let hp2 = 100
    let turn = checkJanken(user1Janken, user2Janken)
    const showEmbed = (message) => {
      const embed = {
        title: `Titid ${users[0].username} VS Titid ${users[1].username}`,
        color: 3117311,
        fields: [{
            name: `HP Titid `+users[0].username,
            value: (hp1 < 1) ? 0 : hp1,
            inline: true
          },
          {
            name: `HP Titid `+users[1].username,
            value: (hp2 < 1) ? 0 : hp2,
            inline: true
          }
        ],
      }
      if(message){
        return message.edit({
          embed: embed
        })
      }else{
        return msg.channel.send({
          embed: embed
        })
      }
    }

    const winner = (selectedUser) => {
      const embed = {
        title: `Pemenang adu didit :partying_face: :partying_face: ${selectedUser.username}#${selectedUser.discriminator}`,
        color: 3117311,
        thumbnail: {
          url: selectedUser.avatarURL()
        },
        author: {
          name: selectedUser.username,
          icon_url: selectedUser.avatarURL()
        },
      }
      return msg.channel.send({
        embed: embed
      })
    }

    if (users[0] && users[1]) {
      msg.channel.send(`Sedang jankenpon untuk menentukan first turn...`)
      setTimeout(() => {
        const embeds = {
          title: `First turn dimenangkan oleh ${turn ? users[0].username : users[1].username}!`,
          color: 3117311,
          fields: [{
              name: users[0].username,
              value: user1Janken,
              inline: true
            },
            {
              name: users[1].username,
              value: user2Janken,
              inline: true
            }
          ],
        }
        msg.channel.send({
          embed: embeds
        })
        showEmbed().then(message => {
          const whiles = () => {
            let dmg = Math.floor(Math.random() * 30)
            if (Math.random() >= 0.9){
              dmg = Math.floor(Math.random() * (60 - 40 + 1) + 40);
            }
            if(dmg > 0){
              setTimeout(() => {
                if (!turn) {
                  hp1 = hp1 - dmg
                  turn = true
                  msg.channel.send(`Titid ${users[0].username} terkena ${dmg} demage ${dmg >= 40 ? '| ***CRITICAL HIT!!***' : ''}`)
                  if (hp1 > 0) {
                    whiles()
                    showEmbed(message)
                  } else {
                    showEmbed(message)
                    msg.channel.send(`***F, titid ${users[0].username} kalah***`)
                    winner(users[1])
                  }
                } else {
                  hp2 = hp2 - dmg
                  turn = false
                  msg.channel.send(`Titid ${users[1].username} terkena ${dmg} demage ${dmg >= 40 ? '| ***CRITICAL HIT!!***' : ''}`)
                  if (hp2 > 0) {
                    whiles()
                    showEmbed(message)
                  } else {
                    showEmbed(message)
                    msg.channel.send(`***F, titid ${users[1].username} kalah***`)
                    winner(users[0])
                  }
                }

              }, 3000)
            }else{
              whiles()
            }

          }

          whiles()
        })
      }, 2000)

    } else {
      msg.channel.send('Tolong mention 2 orang ya')
    }
  },
};
