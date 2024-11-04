import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
    
    return (
        <>
            <Link to={`/view-book-details/${data.id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img 
                            src={data.url} 
                            alt={data.title} 
                            className="h-[25vh] object-cover" 
                            onError={(e) => { e.target.src = 'path/to/default-image.jpg'; }} // Fallback image if not found
                        />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-white">{data.title}</h2>
                    <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
                    <p className="text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
                </div>
            </Link>
        </>
    );
};

export default BookCard;
