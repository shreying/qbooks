import express from 'express';
import router from './routes/user.js'; 
import books from './routes/book.js';
import favourite from './routes/favourite.js';
import cart from './routes/cart.js';
import order from './routes/order.js';
import prisma from './prisma/prismaClient.js'
import { config } from 'dotenv';
import connectDB from './conn/conn.js';
import cors from 'cors';

const app = express();
config(); // Load .env file
// Connect to MySQL when the server starts
connectDB();
const user = router;
const book = books;
const favourites = favourite;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1/", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);


//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

