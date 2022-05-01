// import shit
const { Client, Intents , Collection } = require("discord.js");
const fs = require("fs");
const cooldown = new Set();
const about = require('./about.json')

// Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });

const Discord = require('discord.js')

const { MessageEmbed } = require('discord.js');


// starting up code shit bitch this is simple af
client.once("ready", () => {

  console.log(`${client.user.username} is online`);

  client.user.setActivity(`hentai`, {type: "WATCHING"})
  

  const guild = client.guilds.cache.get('959169805473157172')

  let commands;
  
  commands = guild.commands

  commands = client.application.commands;

  commands.create({
    name: 'about',
    description: 'about this bot.'
  })

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

      if (cooldown.has(interaction.user.id)){
        return interaction.reply({
          content: 'You are on cooldown please wait before using this command again',
          ephemeral: true
        })
      }


      if(!interaction.channel.nsfw) return interaction.reply({
        content: 'Please only use this command in a NSFW channel',
        ephemeral: true
      })

      cooldown.add(interaction.user.id);
        setTimeout(() => {
          cooldown.delete(interaction.user.id);
        }, 5000)

      const type = options.getString('type')
      const ephemeral = options.getBoolean('private')
      if(!ephemeral){
        const ephemeral = false
      } 
      
      const hmtai = require("hmtai");

      var max = 500

      const hentai = `http://cdn.realityno.de/hentai/jpgs/${Math.floor(Math.random() * max + 1)}.jpg`
      console.log(hentai)

      if(type == 'hentai') return interaction.reply({content: hmtai.nsfw.hentai(), ephemeral: ephemeral})

      if(type == 'bdsm') return interaction.reply({content: hmtai.nsfw.bdsm(), ephemeral: ephemeral})

      if(type == 'ero') return interaction.reply({content: hmtai.nsfw.ero(), ephemeral: ephemeral})

      interaction.reply({content: hentai, ephemeral: ephemeral})
      
    }else if(commandName === 'about'){
      interaction.reply({
        content: `This bot is running version ${about.version} from ${about.developers}\nGithub: ${about.github}`,
        ephemeral: false
      })
      
    }else return
        
  }else return;

  
})

client.login(process.env.TOKEN);

