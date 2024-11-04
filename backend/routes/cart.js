import express from 'express';
import prisma from '../prisma/prismaClient.js';
import authenticateToken from './userAuth.js';

const router = express.Router();

//put book to cart
// Add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.body; // Get the book ID from the request body
        const userId = req.user.id; // Get the user ID from the decoded token

        if (!userId || !bookid) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Fetch user data including cart to check if book is already in it
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: { cart: true }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is already in the cart
        if (userData.cart && userData.cart.id === parseInt(bookid, 10)) {
            return res.json({
                status: "Success",
                message: "Book is already in the cart"
            });
        }

        // Add the book to the user's cart
        await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: {
                cart: { connect: { id: parseInt(bookid, 10) } }
            }
        });

        return res.json({
            status: "Success",
            message: "Book added to cart"
        });
    } catch (error) {
        console.error("Error adding book to cart:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params; // Get the book ID from the request parameters
        const userId = req.user.id; // Get the user ID from the decoded token

        if (!userId || !bookid) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Check if the user exists and has the book in their cart
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: { cart: true }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is actually in the cart
        if (!userData.cart || userData.cart.id !== parseInt(bookid, 10)) {
            return res.status(404).json({ message: "Book is not in the cart" });
        }

        // Remove the book from the cart
        await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: {
                cart: { disconnect: true }
            }
        });

        return res.json({
            status: "Success",
            message: "Book removed from cart"
        });
    } catch (error) {
        console.error("Error removing book from cart:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get books in user's cart
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the decoded token

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user and include the cart relation
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: { cart: true } // Include cart to get the book in the cart
        });

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the book data in the cart (if any)
        const cartBook = userData.cart;

        return res.json({
            status: "Success",
            data: cartBook ? [cartBook] : [], // Return an array with the cart book or an empty array if no cart book exists
        });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});




export default router;