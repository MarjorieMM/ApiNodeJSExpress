require("dotenv").config();
import express, { Request, Response } from "express";
import { Post } from "./interface/post";
import path from "path";
import {
	addPost,
	getPosts,
	getSinglePost,
	updatePost,
	deletePost,
} from "./api/post";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + "/front/form.html"));
});

// retrieve all the posts :

app.get("/api/posts", async (req: Request, res: Response) => {
	try {
		const posts: Post = await getPosts();
		if (posts.length === 0) {
			res.send("no post found");
		} else {
			res.status(200).json(posts);
		}
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

// add a new post to database :

app.post("/api/new-post", async (req: Request, res: Response) => {
	const body: Post = req.body;
	try {
		await addPost(body);
		res.status(200).send("New post added successfully to the forum");
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

// fetch single post with its id :

app.get("/api/post/:id", async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	try {
		const post = await getSinglePost(id);
		if (post.length === 0) {
			res.send("no post found with this id");
		} else {
			res.status(200).json(post);
		}
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

// update post selected with its id :

app.put("/api/update-post/:id", async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const body = req.body;
	try {
		await updatePost(id, body);
		return res.status(200).send(`Post with id:${id} updated successfully `);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

// delete post selected with its id :

app.delete("/api/delete-post/:id", async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	try {
		await deletePost(id);
		return res.status(200).send("Post entry successfully deleted");
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});
