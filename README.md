# Moderation-Bot

A Discord bot for automating moderation tasks. Written for use on discord.gg/rlo


## Current Features

- Adds approved reactions to links posted in the Showcase channel
- Removes emojis that are unwanted in the Showcase channel
- Deletes the 'BotMuted' role hourly to clear automated mutes
- Adds new members to 'New Member' role when they use the '.iam member' command to begin using the server and removes the users from this role after 1 hour
- Implemented link posting restrictions in #general to users in the 'New Member' role
- Delete messages from #welcome channel that do not match the .iam command


## Planned Features

- [ ] Answer known question strings to direct users to appropriate channels for information
- [ ] Create alternate reactions in #showcase channel to try and match types of videos (eg. LUL reaction for a link with 'lol' or 'hah' in the message)
- [ ] Create command for approved list of users to schedule announcements


## Installation

This is developed using node.js and the discord.js library. To run the bot you'll need to create a bot from the [Discord developers](https://discordapp.com/developers/) page and add the bot to your server. Then;

- Install [node.js](https://nodejs.org/en/)
- Ensure config.json has the correct values
- Run `npm install` from terminal / command prompt to install the dependencies
- Run `npm start` from terminal / command prompt to start the bot


## Known Bugs

-
