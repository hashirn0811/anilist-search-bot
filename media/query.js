module.exports = `query ($search: String) {
  Media(search: $search, type: ANIME) {
    id
    siteUrl
    title {
      english
    }
    episodes
    coverImage {
      color
      medium
    }
    status(version: 2)
    description(asHtml: true)
    averageScore
  }
}

  `;
/* , type: $type 
, $type: MediaType
*/
