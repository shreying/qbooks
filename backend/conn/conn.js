// conn.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        // Optionally connect here, usually managed automatically
        await prisma.$connect(); 
        console.log("MySQL connection SUCCESS with Prisma");
    } catch (error) {
        console.error("MySQL connection FAILED", error);
        // Consider not exiting the process, depending on your app's needs
        // process.exit(1);
    }
};


export default connectDB;
