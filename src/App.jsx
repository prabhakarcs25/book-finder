import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import { getSearchUrl } from "./utils/openLibrary";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(getSearchUrl(debouncedQuery));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Book Finder 📚</h1>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <h1>Enter book name for search...... Eg:- Harry potter, youTube secrets</h1>
        <SearchBar value={query} onChange={setQuery} />

        {loading && <p className="mt-4">Loading books...</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
        {!loading && books.length === 0 && debouncedQuery && (
          <p className="mt-4">No books found.</p>
        )}

        <div className="mt-6 space-y-3">
          {books.map((book) => (
            <BookCard key={book.key} book={book} onClick={setSelectedBook} />
          ))}
        </div>
      </main>
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
