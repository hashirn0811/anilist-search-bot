module.exports = `query ($search: String) {
    Media(search: $search,type:ANIME) {
      id
      siteUrl
      title {
        english
      }
      coverImage {
        large
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
