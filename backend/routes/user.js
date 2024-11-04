import express from 'express';
import prisma from '../prisma/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from './userAuth.js';
const router = express.Router();

// signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, address, password } = req.body;

        // check username length is more than 3 characters
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be more than 3 characters" });
        }

        // check username already exists
        const existingUserName = await prisma.user.findUnique({
            where: { username: username }
        });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // check email already exists
        const existingEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password must be more than 5 characters" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with a salt rounds of 10

        // create new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                address: address,
                password: hashedPassword, // Consider hashing the password before saving
            },
        });

        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server error" });
    }
});

// Sign-in route (update the JWT payload to include id)
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const existingUser = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        // Create JWT token with user ID
        const token = jwt.sign(
            { id: existingUser.id, role: existingUser.role }, // Include id in the payload
            "qbooks1303",
            { expiresIn: '30d' }
        );

        res.status(200).json({
            id: existingUser.id,
            role: existingUser.role,
            token: token,
        });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



// Get user information for authenticated user
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        // Ensure req.user.id exists
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User ID is missing in the request" });
        }

        const user = await prisma.user.findFirst({
            where: { id: req.user.id }, // Use the ID from the token payload
            select: { id: true,
                username: true,
                email: true,
                password: true,
                address: true,
                avatar: true,
                favourites: true,
                cart: true,
                orders: true,
                role: true, } // Select only necessary fields
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user information:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//update-address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        // Ensure req.user.id exists
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User ID is missing in the request" });
        }

        const { address } = req.body;

        // Update the user's address
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { address: address }
        });

        return res.status(200).json({ message: "Address updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating address:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;
