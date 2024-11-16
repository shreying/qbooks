<h2 align="center">Quasar Books (QBooks) 📚</h2>

<p align="center">Welcome to Quasar Books—a unique online library experience where users can explore, read, and purchase books from an extensive, hand-picked collection that inspires, captivates, and enlightens. Designed for readability, elegance, and ease of use, this platform is built with a sleek and engaging user interface.</p>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Quasar Books** (QBooks) is a digital bookstore that enables users to explore a vast library of books, browse detailed descriptions, and make purchases with ease. The project emphasizes an immersive user experience, featuring captivating UI elements, including a hero section that combines modern design with a book-inspired ambiance.

## Features

- **Discover Books**: Users can browse a curated collection of books with detailed descriptions, author information, and language support.
- **Dynamic Backgrounds**: Elegant, semi-transparent background visuals enhance the experience without overshadowing the content.
- **Book Details View**: Each book’s description, author, language, and price are displayed alongside a high-resolution cover image.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Smooth Navigation**: Easy navigation between the home and book details pages.

### Soon to be implemented:

- **Built-in Ebook Reader**: Users will be able to read ebooks directly on the platform.
- **Dynamic Payments**: Secure and user-friendly payments with Stripe.


## Installation

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/qbooks.git
   cd qbooks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Backend setup**:
   - Set up an Express.js backend server, configure a database connection, and ensure routes for fetching book details are implemented. Refer to the `conn` folder setup if needed.

## Usage

- **Hero Component**: Welcomes users with a background GIF of bookshelves, a captivating title, and a CTA button.
- **ViewBookDetails Component**: Displays detailed information for each book, including image and details.
- **SignUp Component**: Simple sign-up form with fields for username, email, password, and address.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - React Icons for iconography
  - redux toolkit implementation
- **Backend**:
  - Express.js
  - Axios for API requests
- **Database**:
  - MySQL or Prisma (if Prisma-based backend setup is used)
- **Others**:
  - React Router for page navigation

## Components

### Hero

The `Hero` component serves as the landing section with:
- **Background Image/GIF** with subtle transparency.
- **Overlay Text**: Elegant welcome title, description, and CTA button for exploring the book collection.

### ViewBookDetails

Displays detailed information about each book, including:
- **Cover Image**
- **Title**, **Author**, **Description**, **Language**, and **Price**

### SignUp

The `SignUp` component enables new users to create an account with fields for:
- **Username**, **Email**, **Password**, and **Address**

## Contributing

We welcome contributions! Please submit a pull request, and for major changes, open an issue to discuss any modifications.

1. **Fork the repository**
2. **Create your branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a pull request**

---

> repo-link: (https://github.com/shreying/qbooks)

---
