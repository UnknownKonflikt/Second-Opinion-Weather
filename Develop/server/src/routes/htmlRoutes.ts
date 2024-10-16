import path from 'path';
import express, { Router } from 'express';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();


// TODO: Define route to serve index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
});

const PORT = process.env.PORT || 3001;
const app = express();

app.use(`/`, router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default router;
