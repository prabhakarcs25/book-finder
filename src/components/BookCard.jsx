import React from "react";
import { getCoverUrl } from "../utils/openLibrary";

export default function BookCard({ book, onClick }) {
  const cover = getCoverUrl(book);
  const authors = book.author_name ? book.author_name.join(", ") : "Unknown";

  return (
    <div
      onClick={() => onClick(book)}
      className="flex gap-4 p-3 border rounded-lg bg-white shadow hover:shadow-md transition cursor-pointer"
    >
      <img
        src={cover}
        alt={`${book.title} cover`}
        className="w-20 h-28 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{authors}</p>
        <p className="text-xs mt-1">
          First published: {book.first_publish_year || "N/A"}
        </p>
      </div>
    </div>
  );
}
