import express from 'express';
import path from 'path';
import cors from 'cors';
import categoryRoute from './routes/category.routes';
import orderRoute from './routes/order.routes';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import subcategoryRouter from './routes/subcategory.routes';
import DbaseConnection from './config/dataBase';

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:4200", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
DbaseConnection();

// Middleware for serving static files (uploads)
const uploadsPath = path.resolve('uploads');  // Ensure path resolves correctly on Windows
app.use('/uploads', express.static(uploadsPath));

// Apply CORS and JSON parsing middleware
app.use(cors(corsOptions));
app.use(express.json());

// Route definitions
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRoute);
app.use('/categories', categoryRoute);
app.use('/subcategories', subcategoryRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
