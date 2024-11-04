import React, { useEffect, useState } from "react"; 
import Loader from '../Loader/Loader';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialize with null for better condition check

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
                const book = response.data.data; // Get the book data
                
                setData(book); // Update state with the fetched book
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]); // Add id as a dependency

    return (
        <>
            {data ? ( // Check if data is available
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
                    <div className="bg-zinc-800 rounded p-4 h-[65vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
                        <img src={data.url} alt={data.title} className="h-[55vh] lg:h-[70vh] rounded" />
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                        <p className="text-zinc-400 mt-1">by {data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" /> {data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: {data.price}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="h-screen bg-zinc-900 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
