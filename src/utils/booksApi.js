import Constants from "expo-constants";

export const searchBooksCall = async (query, page) => {
  const apiKey = Constants.manifest.extra.googleBooksApiKey;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=10&startIndex=${page}`;

  const results = await fetch(url)
    .then((e) => e.json())
    .then((data) => {
      let books = [];
      if (data.items.length > 0) {
        data.items.forEach((book) => {
          books.push(book);
        });
      }

      return books;
    });

  return results;
};
