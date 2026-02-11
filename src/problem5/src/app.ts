import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import resourceRoutes from './routes/resourceRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/resources', resourceRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error Handling
app.use(errorMiddleware);

export default app;
