const fetch = require("../fetch");
const query = require("./query");
const discordEmbed = require("../discordEmbed");
const { url } = require("inspector");

const capitalize = (str) =>
  str
    .split("_")
    .map(
      (word) =>
        `${word.charAt(0).toUpperCase()} ${word.substring(1).toLowerCase()}`
    )
    .join(" ");

const search = async (searchArg /*, type */) => {
  const res = await fetch(query, {
    search: searchArg,
    // type: type,
  });

  if (res.error) return res;

  const data = res.Media;
  const { averageScore: score, status } = data;
  const strScore = score != null ? `Score : ${$score}` : "";
  const strStatus = status != null ? `Status: ${capitalize(status)}` : "";

  let footerTxt;
  if (score) footerTxt += strScore;
  if (status) footerTxt += strStatus;

  return discordEmbed({
    name: data.title.english,
    Url: data.siteUrl,
    imageUrl: data.coverImage.large,
    description: data.description,
    footer: footerTxt,
  });
};
module.exports = { search };
