import express from 'express';
import prisma from '../prisma/prismaClient.js';
import authenticateToken from './userAuth.js';

const router = express.Router();

// Add book to favorites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        // Log incoming request data
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);

        const { bookid } = req.body; // Get the book ID from the request body
        const { id } = req.headers; // Get the user ID from headers

        if (!id || !bookid) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Find the user and include the favourites relation to check if book exists
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) }, // Ensure 'id' is a number
            include: { favourites: true } // Include favourites to check if book exists
        });

        // Check if the user exists
        if (!userData) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", userData);

        // Check if the book is already in favorites
        const isBookFavourite = userData.favourites.some(book => book.id === parseInt(bookid, 10));
        console.log("Is book already in favourites?", isBookFavourite);

        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favorites" });
        }

        // Add the book ID to the user's favourites
        await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: {
                favourites: {
                    connect: { id: parseInt(bookid, 10) } // Using 'connect' to establish the relation
                }
            }
        });

        console.log("Book added to favorites successfully");
        return res.status(200).json({ message: "Book added to favorites" });
    } catch (error) {
        console.error("Error adding book to favorites:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Remove book from favorites
router.delete("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.body; // Get book ID from the request body
        const userId = req.user.id; // Get the user ID from the decoded token

        if (!userId || !bookid) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Find the user and include favorites to check if the book exists
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: { favourites: true }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is in favorites
        const isBookFavourite = userData.favourites.some(book => book.id === parseInt(bookid, 10));

        if (!isBookFavourite) {
            return res.status(404).json({ message: "Book not found in favorites" });
        }

        // Remove the book from favorites using disconnect
        await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: {
                favourites: {
                    disconnect: { id: parseInt(bookid, 10) }
                }
            }
        });

        return res.status(200).json({ message: "Book removed from favorites" });
    } catch (error) {
        console.error("Error removing book from favorites:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get favorite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the decoded token

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch user and their favorite books
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: { favourites: true } // Include the favorite books
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract favorite books
        const favouriteBooks = userData.favourites;

        return res.status(200).json({
            status: "Success",
            data: favouriteBooks
        });
    } catch (error) {
        console.error("Error fetching favorite books:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
export default router;
