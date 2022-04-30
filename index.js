// import shit
const { Client, Intents , Collection } = require("discord.js");
const fs = require("fs");

// Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });

const Discord = require('discord.js')

const { MessageEmbed } = require('discord.js');


client.once("ready", () => {

  console.log(`${client.user.username} is online`);

  client.user.setActivity(`hentai`, {type: "WATCHING"})
  

  const guild = client.guilds.cache.get('959169805473157172')

  let commands;
  
  commands = guild.commands

  commands = client.application.commands;

  commands.create({
    name: 'hentai',
    description: 'Show hentai.',
    options: [
      {
        name: 'type',
        description: 'type of hentai', 
        type: 3,
        choices: [
          {
            name: 'hentai',
            value: 'hentai'
          },
          {
            name: 'bdsm',
            value: 'bdsm'
          },
          {
            name: 'ero',
            value: 'ero'
          }
        ]
      },
      {
        name: 'private',
        description: 'Make the message only show for you',
        type: 5
      }
    ]
  });


  commands.create({
    name: 'ping',
    description: 'Check the bot latency'
  });

});

client.on("interactionCreate", interaction =>{

  if(interaction.isCommand()){

    const {commandName, options} = interaction

    if(commandName === 'ping'){
      interaction.reply({
        content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
        ephemeral: false
      })

    }else if(commandName === 'hentai'){

      if(!interaction.channel.nsfw) return interaction.reply({
        content: 'Please only use this command in a NSFW channel',
        ephemeral: true
      })

      const type = options.getString('type')
      const ephemeral = options.getBoolean('private')
      
      const hmtai = require("hmtai");

      if(type == 'hentai') return interaction.reply({content: hmtai.nsfw.hentai(), ephemeral: ephemeral})

      if(type == 'bdsm') return interaction.reply({content: hmtai.nsfw.bdsm(), ephemeral: ephemeral})

      if(type == 'ero') return interaction.reply({content: hmtai.nsfw.ero(), ephemeral: ephemeral})

      interaction.reply({content: hmtai.nsfw.hentai()})
      
    }else return
        
  }else return;

  
})

client.login(process.env.TOKEN);
