const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./json/battleroyale.json`);
module.exports = {
  name: 'k!battle',
  description: 'Melakukan battle royale',
  execute(msg, args) {
    let weapon = [
      'Scar L',
      'Pan',
      'Mini 14',
      'AKM',
      'M416',
      'AWM',
      'Kar98k',
      'P9',
      'Glock',
      'FN Five Seven',
      'Machete',
      'UMP19',
      'PP Bizon',
      'Micro UZI',
      'Vector',
      'SKS'
    ]
    let users = []
    msg.mentions.users.map(value => {
      users.push(value)
    })
    let chId = msg.channel.id
    // file.set("10291028103", {});
    //
    // file.save()
    // return console.log(file.get(`${chId}.users`).length);
    if(file.get(chId) && file.get(`${chId}.isActive`)){
      return msg.channel.send('***Battle royale sedang berjalan di channel ini !!***')
    }
    if (users.length >= 5) {

      users.map(e => {
        file.set(`${chId}.users.${e.id}`, e)
      })
      file.set(`${chId}.isActive`, true)
      file.save()
      msg.channel.send(`***Battle Royale dengan ${users.length} orang peserta dimulai!!***`)
      const battle = () => {
        let usersActive = file.get(`${chId}.users`)
        let selectedUser = users[Math.floor(Math.random() * users.length)]

        setTimeout(() => {
          if (Math.random() >= 0.98){
            let withoutSelectedUser = users.filter(e => {
               return e,id !== selectedUser.id
            })
            let userDie = withoutSelectedUser[Math.floor(Math.random() * withoutSelectedUser.length)]
          }
          if(selectedUser.weapons && selectedUser.weapons.length < 2){
            let getWeapon = weapon[Math.floor(Math.random() * weapon.length)]
            selectedUser.weapons.push(getWeapon)
            file.set(`${chId}.users.${selectedUser.id}`, selectedUser)
            msg.channel.send(`${selectedUser.username} menemukan ${getWeapon}`)
          }
          battle()
        }, 5000)
      }
      battle()
    } else {
      msg.channel.send('Tolong mention minimal 5 orang')
    }
  },
};
