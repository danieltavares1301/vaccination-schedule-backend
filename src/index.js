import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
