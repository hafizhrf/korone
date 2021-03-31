module.exports = {
  name: 'k!janken',
  description: 'Jan Ken Pon!!!',
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
          }else if(j2 == ':v:'){
            return false
          }else{
            return 'draw'
          }
        break;
        case ':fist:':
          if(j2 == ':v:'){
            return true
          }else if(j2 == ':hand_splayed:'){
            return false
          }else{
            return 'draw'
          }
        break;
        case ':v:':
          if(j2 == ':hand_splayed:'){
            return true
          }else if(j2 == ':fist:'){
            return false
          }else{
            return 'draw'
          }
        break;
        default:

      }
    }
    let user1Janken =  janken[Math.floor(Math.random() * janken.length)]
    let user2Janken =  janken[Math.floor(Math.random() * janken.length)]
    let turn = checkJanken(user1Janken, user2Janken)
    if (users[0] && users[1]) {
        const embeds = {
          title: `${turn == 'draw' ? 'Janken berakhir seri!' : `Janken dimenangkan oleh ${turn ? users[0].username : users[1].username}!`}`,
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
        if(turn !== 'draw'){
          embeds.thumbnail = {
            url: turn ? users[0].avatarURL() : users[1].avatarURL()
          }
        }
        msg.channel.send({
          embed: embeds
        })
    } else {
      msg.channel.send('Tolong mention 2 orang ya')
    }
  },
};
