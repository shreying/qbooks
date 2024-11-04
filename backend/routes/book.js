import express from 'express';
import prisma from '../prisma/prismaClient.js';
import jwt from 'jsonwebtoken';
import authenticateToken from './userAuth.js';

const router = express.Router();

// Add book route
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Check if user exists and is an admin
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) }
        });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to add books" });
        }

        const { title, author, genre, published, url, price, desc, language } = req.body;

        // Validate required fields
        if (!title || !author || !genre || !published || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new book
        const newBook = await prisma.book.create({
            data: {
                url,
                title,
                author,
                genre,
                published: new Date(published), // Ensure published is a Date object
                price,
                desc,
                language
            }
        });

        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        console.error("Error adding book:", error); // Logging for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update book route
router.put("/update-book/:bookid", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Extract user ID from headers to check role
        const { bookid } = req.params; // Get the book ID from the URL
        const { title, author, genre, published, url, price, desc, language } = req.body; // Get updated data from the request body

        // Check if user exists and is an admin
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) }
        });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update books" });
        }

        // Find the existing book
        const existingBook = await prisma.book.findUnique({
            where: { id: parseInt(bookid) } // Convert the id to an integer
        });

        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Validate required fields for update
        if (!title && !author && !genre && !published && !price && !desc && !language) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        // Prepare the data for the update
        const updateData = {
            title: title || existingBook.title,
            author: author || existingBook.author,
            genre: genre || existingBook.genre,
            published: published ? new Date(published) : existingBook.published, // Ensure published is a Date object
            url: url || existingBook.url,
            price: price !== undefined ? price : existingBook.price,
            desc: desc || existingBook.desc,
            language: language || existingBook.language
        };

        // Update the book details
        const updatedBook = await prisma.book.update({
            where: { id: parseInt(bookid) }, // Find the book by ID
            data: updateData
        });

        // Respond with the updated book
        return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//delete book route
router.delete("/delete-book/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params; // Get the book ID from the URL

        // Check if the user is an admin
        const userId = req.headers.id; // Assuming the user ID is passed in headers
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to delete books" });
        }

        // Delete the book
        const deletedBook = await prisma.book.delete({
            where: { id: parseInt(bookid) } // Find the book by ID
        });

        return res.status(200).json({ message: "Book deleted successfully!", book: deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            orderBy: {
                createdAt: 'desc' // Sort by createdAt in descending order
            }
        });

        return res.status(200).json({
            status: "Success",
            data: books
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get recently added books (limit 4)
router.get("/get-recent-books", async (req, res) => {
    try {
        // Retrieve the 4 most recently added books
        const books = await prisma.book.findMany({
            orderBy: { createdAt: 'desc' }, // Sort by createdAt in descending order
            take: 4 // Limit the results to 4
        });

        return res.json({
            status: "Success",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extracting the book ID from the request parameters
        
        // Fetch the book from the database
        const book = await prisma.book.findUnique({
            where: { id: parseInt(id, 10) } // Convert the ID to an integer
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" }); // Handle case where book does not exist
        }

        return res.json({
            status: "Success",
            data: book // Return the book data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" }); // Handle server errors
    }
});

export default router;
