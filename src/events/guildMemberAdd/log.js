const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");
const { Client, GuildMember } = require("discord.js"); 

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member, channel) => {
    try {
        channel.guild.fetchAuditLogs({ type: AuditLogEvent.guildMemberAdd, }) .then(async audit => {
            const { executor } = audit.entries.first();
        
            const channelID = '1167493590751121438';
            const mChannel = await channel.guild.channels.cache.get(channelID);
        
            const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Member Joined')
            .addFields(
                { name: 'Member', value: `${member.user.tag} (<@${member.user.id}>)`, inline: false },
                { name: 'Joined At', value: `<t:${member.user.id.joinedAt / 1000}:R>`, inline: true },
                { name: 'Account Created', value: `<t:${member.user.id.createdAt / 1000}:R>`, inline: true },
                { name: 'Invited By', value: `${executor.tag} (<@${executor.id}>)`, inline: false},
            )
            .setTimestamp()
            .setFooter({ text: `User ID: ${member.user.id}` });
        
            mChannel.send({ embeds: [embed] });
        });
    } catch (error) {
        console.log(`There was an error when creating a guild member add log: ${error}`)
    }
}