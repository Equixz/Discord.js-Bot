const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = async (client, channel) => {
    try {
        
    } catch (error) {
        console.log(`There was an error when creating a delete channel log: ${error}`)
    }

    channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate, }) .then(async audit => {
        const { executor } = audit.entries.first();

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if (type === 0) type = 'Text'
        if (type === 2) type = 'Voice'
        if (type === 13) type = 'Stage'
        if (type === 15) type = 'Form'
        if (type === 4) type = 'Category'
        if (type === 5) type = 'Announcement'

        const channelID = '1167493590751121438';
        const mChannel = await channel.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Channel Deleted')
        .addFields(
			{ name: 'Channel Name', value: `${name}`, inline: true },
			{ name: 'Channel Type', value: `${type}`, inline: true },
			{ name: 'Channel ID', value: `${id}`, inline: false },
			{ name: 'Deleted By', value: `${executor.tag} (<@${executor.id}>)`, inline: true }
		)
        .setTimestamp()
        .setFooter({ text: `User ID: ${executor.id}` });

        mChannel.send({ embeds: [embed] });
    });
};