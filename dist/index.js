"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const post_1 = require("./api/post");
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname + "/front/form.html"));
});
// retrieve all the posts :
app.get("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.getPosts();
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// app.get("/api/posts", async (req: Request, res: Response) => {
// 	try {
// 		const posts = await getPosts((err: Error, posts: Post) => {
// 			if (err) {
// 				return res.status(400).send(err);
// 			}
// 			if (posts.length === 0) {
// 				return res.send("No post found");
// 			}
// 			res.status(200).send(posts);
// 		});
// 	} catch (err) {
// 		res.status(400).send(err);
// 	}
// });
// add a new post to database :
app.post("/api/new-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newPost = yield post_1.addPost(body);
        res.status(200).send(newPost);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// fetch single post with its id :
app.get("/api/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const post = yield post_1.getSinglePost(id);
        if (post.length === 0) {
            res.send("no post found with this id");
        }
        else {
            res.status(200).send(post);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
    // try {
    // 	const post = await getSinglePost(id, (err: Error, post: Post) => {
    // 		if (err) {
    // 			return res.status(400).send(err);
    // 		}
    // 		if (post.length < 1) {
    // 			return res.status(400).send("No post found with this id");
    // 		} else {
    // 			return res.status(200).send(post);
    // 		}
    // 	});
    // } catch (err) {
    // 	res.status(400).send(err);
    // }
}));
// update post selected with its id :
app.put("/api/update-post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const body = req.body;
    try {
        yield post_1.updatePost(id, body);
        return res.status(200).send(`Post with id:${id} updated successfully `);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// delete post selected with its id :
app.get("/api/delete-post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield post_1.deletePost(id);
        return res.status(200).send("Post entry successfully deleted");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
