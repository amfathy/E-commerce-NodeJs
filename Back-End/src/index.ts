import express from 'express';
import path from 'path';
import cors from 'cors';
import categoryRoute from './routes/category.routes';
import orderRoute from './routes/order.routes';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import subcategoryRouter from './routes/subcategory.routes';
import RegisterRouter from './routes/auth.routes'
import DbaseConnection from './config/dataBase';
import ErrorHandler from './middlewares/error.middleware'
import morgan from 'morgan'


// import helmet from 'helmet'

const corsOptions = {
  origin: "http://localhost:4200", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const app = express();
const port = process.env.PORT || 3000;

DbaseConnection();

const uploadsPath = path.resolve('uploads'); 

app.use('/uploads', express.static(uploadsPath));

app.use(cors(corsOptions));
app.use(express.json());
//app.use(helmet()); //imgs 
app.use(morgan('dev'));
app.use('/user' ,RegisterRouter );
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRoute);
app.use('/categories', categoryRoute);
app.use('/subcategories', subcategoryRouter);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
