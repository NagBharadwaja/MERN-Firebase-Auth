import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));


admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

let db;

const connectToDb = async () => { 
    const uri = process.env.MONGODB_USERNAME
        ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwiu152.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        : 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    await client.connect();
    db = client.db('full-stack-react-db');
    return db;
}

// Registering the dist as static asset to the express server
app.use(express.static(path.join(__dirname, '../dist')));

// Any route that doesn't start with /api, send dist/index.html to the client
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
})

app.get("/api/articles/:name", async (req, res) => {
    const { name } = req.params;
    const article = await db.collection("articles").findOne({ name });
    res.json(article);
})

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;
            next();
        } catch (e) {
            res.sendStatus(400);
        }
        
    } else {
        res.sendStatus(400);
    }
});

app.post("/api/articles/:name/upvotes", async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    const article = await db.collection("articles").findOne();
    const canUpvote = uid && !(article.upvotes || [].includes(uid));
    
    if (!canUpvote) return res.sendStatus(403);
    
    const updatedArticle = await db.collection("articles").findOneAndUpdate(
        { name },
        { $inc: { upvotes: 1 } },
        { $push:{ upvotes: uid } },
        { returnDocument: "after" }
    );
    res.json(updatedArticle);
})

app.post("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const newComment = { postedBy, text };
    const updatedArticle = await db.collection("articles").findOneAndUpdate(
        { name },
        { $push: { comments: newComment } },
        { returnDocument: "after" }
    );
    res.json(updatedArticle);
})

const start = async () => {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

start();