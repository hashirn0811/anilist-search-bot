const discordEmbed = require("../discordEmbed");
const fetch = require(`../fetch`);
const query = require("./query");

const striptags = require("striptags");

const search = async (searchArg) => {
  const res = await fetch(query, {
    search: searchArg,
  });
  if (res.error) return res;

  const data = res.User;

  const watchedTime = data.statistics?.anime?.minutesWatched;
  const chaptersRead = data.statistics?.manga?.chaptersRead;

  const chStr = chaptersRead != 0 ? `Chapters read: ${chaptersRead}` : "";
  let daysWatched = "";

  if (watchedTime != 0) {
    daysWatched = (watchedTime / (60 * 24)).toFixed(1);
    daysWatched = `Days Watched : ${daysWatched}`;
  }
  let footer = "";
  if (watchedTime) footer += daysWatched;
  if (chaptersRead) footer += chStr;

  return discordEmbed({
    name: data.name,
    Url: data.siteUrl,
    imageUrl: data.avatar.large,
    description: striptags(data.about),
    footer: footer,
  });
};
module.exports = { search };
