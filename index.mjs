import path from 'path';
import { fileURLToPath } from 'url';

import { TaskDatabase } from './models/lowdb.mjs';
import { TaskDB } from './models/task.mjs';

import express from 'express'; // Import CJS module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const TaskDBInstance = new TaskDB(new TaskDatabase());


// Init Express
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'pages'), path.join(__dirname, 'layouts')]);


app.get('/', async (req, res) => {
    res.render('index', { tasks: await TaskDBInstance.read() });
});
app.get('/assets/:directory*', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', req.params.directory, req.params[0]));
});


app.post('/api/tasks', async (req, res) =>
{
    try {
        await TaskDBInstance.write(req.body);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    res.sendStatus(200);
});

app.delete('/api/tasks/:id', async (req, res) =>
{
    try {
        await TaskDBInstance.delete(Number.parseInt(req.params.id, 10));
    }
    catch {
        res.sendStatus(500);
        return;
    }
    
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Listening to: http://localhost:${port}/`)
});