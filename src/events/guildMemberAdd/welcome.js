const { Client, GuildMember } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member, channel) => {
    try {
        const channelID = '1167508759837413529';
        const mChannel = await channel.guild.channels.cache.get(channelID);
        mChannel.send(`<@${member.user.id}>`);

        const embed = new EmbedBuilder()
            .setColor(0x3289fa)
            .setTitle('**Welcome to <Insert name>**')
            .setDescription('Read our <#Rules channel id>, and place an application in <#applications channel id> to get started!')
            .setImage('https://imgur.com/a/ul7ZT9a.png');

        mChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(`There was an error when creating a welcome message: ${error}`);
    }
};
