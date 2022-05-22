const { request, GraphQLClient } = require("graphql-request");

const mediaquery = require(`./queryAnime`);

const makeRequest = async (query, variables) => {
  const client = new GraphQLClient(`https://graphql.anilist.co`, {
    redirect: "follow",
  });
  try {
    const res = await client.request(query, { search: variables });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
makeRequest(mediaquery, "Hgwergrgws");
