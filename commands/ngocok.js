const Discord = require('discord.js');

module.exports = {
  name: 'k!gacha',
  description: 'Gacha orang macem arisan',
  execute(msg, args) {
    // if(!msg.channel.nsfw){
    //   return msg.channel.send('Command ini hanya bisa digunakan di NSFW Channel');
    // }
    let users = []
    msg.mentions.users.map(value => {
      users.push(value)
    })

    if (users.length > 1) {
      let random = Math.floor(Math.random() * users.length)
      const selectedUser = users[random]
      const embed = {
        title: `Selamat!! kepada ${selectedUser.username}#${selectedUser.discriminator}`,
        description: 'Nama kamu yang pertama keluar, mantappp!!! \nJangan lupa mangan mangannya!!',
        color: 3117311,
        thumbnail: {
          url: selectedUser.avatarURL()
        },
        author: {
          name: selectedUser.username,
          icon_url: selectedUser.avatarURL()
        },
        footer: {
          text: `Rolled from ${users.length} People`
        }
      }
      msg.channel.send({
        embed: embed
      })
    } else {
      msg.channel.send('Tolong mention 2 orang / lebih ya~')
    }
  },
};