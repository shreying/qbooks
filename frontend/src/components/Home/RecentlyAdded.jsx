import React, { useEffect, useState } from "react"; 
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
        const books = response.data.data; // Assuming the response structure is the same
        console.log(books); // Log the entire array of books

        // Log each book's details
        books.forEach((book) => {
          console.log(`Title: ${book.title}, Author: ${book.author}, Published: ${book.published}, Price: ${book.price}, url: ${book.url}`);
        });

        setData(books); // Update state with the fetched books
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
            <Loader /> {/* Show loader if data is not available */}
        </div>
  )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((book, index) => (
            <div key={index}>
              <BookCard data={book} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
