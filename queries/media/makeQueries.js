const { request, GraphQLClient } = require("graphql-request");

const mediaquery = require(`./queryAnime`);

const makeRequest = async (query, variables) => {
  const client = new GraphQLClient(`https://graphql.anilist.co`, {
    redirect: "follow",
  });
  try {
    const res = await client.request(query, { search: variables });
    return res;
  } catch (err) {
    return err;
  }
};

/* async function show() {
  const myRes = await makeRequest(mediaquery, "Hhbtdrhbref");
  console.log(myRes);
}
show();
 */
module.exports = { makeRequest };
