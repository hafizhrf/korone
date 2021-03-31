const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./json/battleroyale.json`);
module.exports = {
  name: 'k!stopbattle',
  description: 'Menghentikan battle royale',
  execute(msg, args) {
    if(file.get(msg.channel.id) && file.get(`${msg.channel.id}.isActive`)){
      file.set(msg.channel.id, {})

      file.save()
      msg.channel.send('***Battle royale dihentikan***')
    }else{

      msg.channel.send('***Tidak ada battle royale yang berjalan di channel ini!***')
    }
  },
};
