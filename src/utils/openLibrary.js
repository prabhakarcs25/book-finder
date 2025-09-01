export function getSearchUrl(query) {
  return `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
}

export function getCoverUrl(doc, size = "M") {
  if (doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`;
  }
  if (doc.isbn && doc.isbn.length > 0) {
    return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-${size}.jpg`;
  }
  return "https://via.placeholder.com/150x220?text=No+Cover";
}
