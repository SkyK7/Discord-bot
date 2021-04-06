const { error } = require("console");
const { sign } = require("crypto");
const Discord = require("discord.js");
const config = require("./config.json");


const client = new Discord.Client();
const prefix = "!";


const secondPhrases = ['@everyone Phrase1', '@everyone Phrase2', '@everyone Phrase3']


const phraseNumber = () => Math.floor(Math.random() * secondPhrases.length);

client.on("ready", function () {
    /* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
    console.log(client.user.username + " запустился!");




    const onlyText = client.channels.cache.array().filter(chan => {
        return chan instanceof Discord.TextChannel
    });
    const allGuilds = client.guilds.cache.array();


    setInterval(() => {
        onlyText.forEach(text => {
            text.send(secondPhrases[phraseNumber()])
        })

        setTimeout(()=>{
            allGuilds.forEach(guild => {
                guild.members.fetch()
                    .then(members => {
                        const noMemberBot = members.array().filter((member) => {
                            return !member.user.bot
                        })
    
                        let randomNumber = Math.floor(Math.random() * noMemberBot.length);
                        let randomUserId = noMemberBot[randomNumber].user.id
                        const massiveCanalov = guild.channels.cache.array().filter(kanal => {
                            return kanal instanceof Discord.TextChannel
                        });
    
    
                        massiveCanalov.forEach(kanal => {
                            kanal.send(`<@${randomUserId}> Сегодня твой день! Улыбнись :)`)
                        });
    
                    })
    
    
            })
        }, 60000)
    }, 600000)


});



client.on("message", msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();



    if (command === "smile") {

        msg.channel.send("@everyone  Ты заставил меня улыбнуться");
    }


   


});


client.on("message", msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "random") {

        msg.channel.send('Монета продбрасывается')

        const random = Math.random(); // Объявление переменной random - она вычисляет случайное число от 1 до 3

        if (random < 0.49) { // Если вычислено число 1, то выпадает орёл.
            msg.channel.send(':full_moon: Орёл!')
        } else if (random > 0.51) { // Если вычислено число 2, то выпадает решка.
            msg.channel.send(':new_moon: Решка!')
        } else if (random > 0.49 && random < 0.51) { // Если вычислено число 3, то монета падает ребром.
            msg.channel.send(':last_quarter_moon: Монета упала ребром! Вот это удача!')
        }

        console.log(random);
    }
});



client.login(config.BOT_TOKEN);