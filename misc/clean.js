const clean = async (text) => {
  if (text && text.constructor == "Promise") text = await text;

  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });
  return text;
};

module.exports = { clean };
