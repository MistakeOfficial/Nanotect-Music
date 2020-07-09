const { canModifyQueue } = require("../util/MusicUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);

    let shuffleEmbed = new MessageEmbed()

    .setAuthor("🔀 Shuffle music...")
    .setDescription(`**❯ Requested By:** ${message.author}`)
    .setColor("RANDOM")
    .setFooter("Creator: Nanotect.", "https://i.imgur.com/40JSoww.png")
    .setTimestamp();

    queue.textChannel.send(shuffleEmbed);
  }
};
