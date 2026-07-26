import dotenv from "dotenv"
dotenv.config();
import app from './app.js';
import connectDB from './src/config/db.js';

connectDB();

const PORT = process.env.PORT || 3000;

console.log("Gemini API Key:", process.env.GEMINI_API_KEY); // Debugging line to check if the API key is loaded

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});