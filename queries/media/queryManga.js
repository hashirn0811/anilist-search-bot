module.exports = `query ($search: String) {
    Media(search: $search, type: MANGA) {
      id
      siteUrl
      title {
        english
        romaji
      }
      description(asHtml: true)
      format
      status(version: 2)
      chapters
      averageScore
      genres
      coverImage {
        medium
        color
      }
    }
  } 
  `;
