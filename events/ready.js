module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    let guilds = [];
    const guildList = client.guilds?.cache.each((guild) =>
      guilds.push(guild.name)
    );
    console.log(`Logged in as ${client.user.tag} in ${guilds.join(",")}`);
    /*  client.guilds.cache.forEach((element) => {
      console.log(element.name);
    }); */
  },
};
