import React from "react";
import { getCoverUrl } from "../utils/openLibrary";

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  const cover = getCoverUrl(book);
  const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
  const openLibraryUrl = book.key ? `https://openlibrary.org${book.key}` : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <div className="flex gap-4">
          <img
            src={cover}
            alt={`${book.title} cover`}
            className="w-28 h-40 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-600">by {authors}</p>
            <p className="text-sm mt-2">
              First published: {book.first_publish_year || "N/A"}
            </p>
            <p className="text-sm">Editions: {book.edition_count || "N/A"}</p>
          </div>
        </div>

        {openLibraryUrl && (
          <div className="mt-4">
            <a
              href={openLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on OpenLibrary →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
