const CONFIG = require(`../config.json`);
const Discord = require('discord.js');

const client = new Discord.Client();

var timerRun = false;

client.on(`message`, message => {

  //Showcase channel functions
  if (message.channel.type === `text` && message.guild.id === CONFIG.guild && message.channel.id === CONFIG.reactionChannel) {
    var content = message.content;
    if (/http:/i.test(content) || /https:/i.test(content)) {
      /* for testing
      message.react("😍")
        .then(message.react("❤"))
        .then(message.react("👍"))
        .catch(console.error);
      */

      message.react(":PogChamp:230268174526840832")
        .then(message.react(":Kreygasm:350549072781901827"))
        .then(message.react(":CoolStoryBob:350549041911824385"))
        .catch(console.error);
      //message.react(":ResidentSleeper:350549084077162498");
    }

    if (/ResidentSleeper/.test(content)) {
      message.delete()
        .then(msg => console.log(`Deleted ResidentSleeper message from ${message.author} - ${message.author.username}`))
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
          .then(msg => console.log(`Deleted http message from New Member ${author} - ${author.username}`))
          .then(message.reply(`sorry. New members cannot post links in #general for the first half hour after joining.`))
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
    var author = message.author;
    var server = client.guilds.get(CONFIG.guild);
    var member = server.members.get(author.id);
    var staff = server.roles.find('name', 'RLO-Staff');
    var mod = server.roles.find('name', 'Moderators');

    if (staff != null && mod != null) {
      if (member.roles.get(staff.id) == null && member.roles.get(mod.id) == null) {

        if (/\.iam member/i.test(content) && message.author != client.user) {
          var newMember = server.roles.find('name', 'New Member').id;
          if (newMember != null) {
            server.members.get(author.id).addRole(newMember);
            setTimeout(function() {
              server.members.get(author.id).removeRole(newMember);
            }, 1800000);
          }
        }

        else if (author == client.user) {
          setTimeout(function() {
            message.delete()
            .catch(console.error);
          }, 10000);
        }

        else {
          message.reply(" only the following command can be used in this channel ```.iam member```")
          message.delete()
          .then(msg => console.log(`Deleted message in #Welcome from ${author} - ${author.username} \n    ${content}\n`))
          .catch(console.error);
        }
      }
    }
  }
});

//Clear New Members on startup so that noone is stuck as New Member


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
