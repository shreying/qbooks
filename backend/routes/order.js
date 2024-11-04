import express from 'express';
import prisma from '../prisma/prismaClient.js';
import authenticateToken from './userAuth.js';

const router = express.Router();


// Place order for books in cart
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated token
        const { order } = req.body; // Get the array of books from the request body

        if (!userId || !order || order.length === 0) {
            return res.status(400).json({ message: "User ID and order details are required" });
        }

        // Loop through each book in the order and create an order entry
        const orderPromises = order.map(async (orderData) => {
            const newOrder = await prisma.order.create({
                data: {
                    userId: parseInt(userId, 10),
                    bookId: parseInt(orderData.bookId, 10) // Make sure book ID is an integer
                }
            });
            return newOrder;
        });

        // Wait for all orders to be created
        const createdOrders = await Promise.all(orderPromises);

        // Update the user's orders and clear the cart
        await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: {
                orders: {
                    connect: createdOrders.map(order => ({ id: order.id })) // Connect each order ID
                },
                cart: { disconnect: true } // Clear the user's cart
            }
        });

        return res.json({
            status: "Success",
            message: "Order placed successfully"
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Retrieve the user ID from the authenticated token

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch the user's orders along with the book details
        const userOrders = await prisma.order.findMany({
            where: {
                userId: parseInt(userId, 10)
            },
            include: {
                book: true  // Include book details in the order data
            },
            orderBy: {
                createdAt: 'desc'  // Sort orders in reverse chronological order
            }
        });

        return res.json({
            status: "Success",
            data: userOrders
        });
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get all orders (admin)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const allOrders = await prisma.order.findMany({
            include: {
                book: true,  // Include book details
                user: true   // Include user details
            },
            orderBy: {
                createdAt: 'desc' // Sort by creation date in descending order
            }
        });

        return res.json({
            status: "Success",
            data: allOrders
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Update order status (admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const { status } = req.body; // Expecting status in the request body

        // Update the order status
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status: status }
        });

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
            data: updatedOrder // Optional: return the updated order details
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});



export default router;