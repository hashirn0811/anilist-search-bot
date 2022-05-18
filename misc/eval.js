const ownerId = [847490120222900285];
const { codeBlock } = require("@discordjs/builders");
module.exports = {
  name: "eval",
  description: "eval",
  run: async (message, args) => {
    if (!ownerId.includes(message.author.id)) {
      message.channel.send("Invalid User");
      return;
    }
    let codein = args.join(" ");
    try {
      let code = eval(codein);
      if (typeof code !== "string")
        code = require("util").inspect(code, { depth: 0 });
      message.channel.send(`\n${codeBlock("js", code)}\n`);
    } catch (error) {
      message.channel.send(
        `\nCodeIn\n${codeBlock("js", codein)}\nCodeOut\n${
          (codeBlock("js"), code)
        }`
      );
    }
  },
};
