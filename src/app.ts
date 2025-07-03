import express from 'express';
import path from 'path';
import cors from 'cors';
import { register } from './services/registerService';
import { getMessages } from './services/messagesService';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/register', async (req, res) => {
    const { username } = req.body;
    try {
        const result = await register(username);
        if(!result.success) {
            res.status(400).json(result);
            return;
        }
        res.json(result);
        return;
    } catch (error) {
        console.log('Error while registering: ', error);
        res.status(500).json({ success: false, message: 'Error registering' });
        return;
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const result = await getMessages();
        if(!result.success) {
            res.status(400).json(result);
            return;
        }
        res.json(result);
        return;
    } catch (error) {
        console.log('Error getting messages: ', error);
        res.status(500).json({ success: false, data: []});
        return;
    }
});

export default app;