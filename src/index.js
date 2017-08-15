const CONFIG = require(`../configTest2.json`);
const Discord = require('discord.js');

const client = new Discord.Client();

var timerRun = false;

client.on(`message`, message => {

  //Showcase channel functions
  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.reactionChannel) {
    var content = message.content;
    if (/http:/i.test(content) || /https:/i.test(content)) {
      message.react(":PogChamp:230268174526840832");
      //message.react(":PogChamp:282525692615327745");
      message.react("👍");
      message.react("❤");
      message.react("😍");
    }

    if (/ResidentSleeper/.test(content) || /👎/.test(content) || /FailFish/.test(content)) {
      message.delete()
        .then(msg => console.log(`Deleted message from ${message.author} - ${message.author.username}`))
        .catch(console.error);
    }
  }

  //General channel functions
  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.generalChannel) {
    var content = message.content;
    var author = message.author;
    var newMember = client.guilds.get(CONFIG.guild).members.get(author.id).roles.find('name', 'New Member');

      //New Member restrictions
      if (newMember != null && /http/i.test(content)) {
        message.delete()
          .then(msg => console.log(`Deleted message from New Member ${author} - ${author.username}`))
          .then(message.reply(`sorry. New members cannot post links in #general for the first hour after joining.`))
          .catch(console.error);
      }
  }

  //Announcement scheduling functions
/*  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.announceChannel) {
    var content = message.content;

  }
*/
  //Welcome channel (new member) functions
  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.welcomeChannel) {
    var content = message.content;
    if (/\.iam member/i.test(content)) {
      var member = message.author.id;
      var server = client.guilds.get(CONFIG.guild);
      var role = server.roles.find('name', 'New Member').id;
      if (role != null) {
        server.members.get(member).addRole(role);
        setTimeout(function() {
          server.members.get(member).removeRole(role);
        }, 3600000);
      }
    }
  }

});

//Remove BotMuted role hourly
setInterval( function() {
  var d = new Date();
  var server = client.guilds.get(CONFIG.guild);
  if (d.getMinutes() === 5 && server.roles.find('name', 'BotMuted') != null) {
    var role = server.roles.find('name', 'BotMuted').delete();
  }
}, 60000);

client.on(`ready`, () => {
  console.log(`${client.user.username}: I'm ready!`);
});

client.login(CONFIG.token);
