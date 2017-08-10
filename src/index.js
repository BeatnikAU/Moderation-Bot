const CONFIG = require(`../config.json`);
const Discord = require('discord.js');

const client = new Discord.Client();

client.on(`message`, message => {

  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.reactionChannel) {
    var content = message.content;
    if (/http:/i.test(content) || /https:/i.test(content)) {
      message.react(":PogChamp:230268174526840832");
      //message.react(":PogChamp:282525692615327745");
      message.react("👍");
      message.react("❤");
      message.react("😍");
    }

    //if content.search(/<:ResidentSleeper:252374036976369664>/i) {
    if (/ResidentSleeper/.test(content) || /👎/.test(content) || /FailFish/.test(content)) {
      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.error);
    }
  }

});

client.on(`ready`, () => console.log(`${client.user.username}: I'm ready!`));
client.login(CONFIG.token);
