"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getSinglePost = exports.addPost = exports.getPosts = void 0;
const db_1 = __importDefault(require("../config/db"));
// const getPosts = (callback: Function) => {
// 	const sql: string =
// 		"SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id";
// 	dbConfig.query(sql, (err, res) => {
// 		if (err) callback(err, null);
// 		else callback(null, res);
// 	});
// };
function getPosts() {
    const sql = "SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id";
    return new Promise((resolve, reject) => {
        db_1.default.query(sql, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
exports.getPosts = getPosts;
const addPost = (post) => {
    const { content, author, topic } = post;
    const sql_topic = "INSERT IGNORE INTO topic (title) VALUES (?)";
    const sql_post = "INSERT INTO post (content, author, topic_id) VALUES(?, ?, (SELECT id FROM topic WHERE title = ? LIMIT 1))";
    db_1.default.query(sql_topic, topic);
    db_1.default.query(sql_post, [content, author, topic]);
};
exports.addPost = addPost;
// const addPost = (post: Post): void => {
// 	const { content, author, topic } = post;
// 	const sql3: string = "INSERT IGNORE INTO topic (title) VALUES (?)";
// 	const sql2: string =
// 		"INSERT INTO post (content, author, topic_id) VALUES(?, ?, (SELECT id FROM topic WHERE title = ? LIMIT 1))";
// 	dbConfig.query(sql3, topic);
// 	dbConfig.query(sql2, [content, author, topic]);
// };
// const getSinglePost = (id: Number, callback: Function) => {
// 	const sql =
// 		"SELECT * FROM post INNER JOIN topic t ON post.topic_id = t.id WHERE post.id = ?";
// 	dbConfig.query(sql, id, (err, res) => {
// 		if (err) callback(err, null);
// 		else callback(null, res);
// 	});
// };
const getSinglePost = (id) => {
    const sql = "SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id WHERE post.id = ?";
    return new Promise((resolve, reject) => {
        db_1.default.query(sql, id, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
};
exports.getSinglePost = getSinglePost;
// const updatePost = (id: Number, post: Post): void => {
// 	const { content, author, topic } = post;
// 	const topic_sql: string = "INSERT IGNORE INTO topic (title) VALUES (?)";
// 	const sql_post: string =
// 		"UPDATE post SET content=?, author=?, topic_id=(SELECT id FROM topic WHERE title = ? LIMIT 1) WHERE post.id = ?";
// 	dbConfig.query(topic_sql, topic);
// 	dbConfig.query(sql_post, [content, author, topic, id]);
// };
const updatePost = (id, post) => {
    const { content, author, topic } = post;
    const topic_sql = "INSERT IGNORE INTO topic (title) VALUES (?)";
    const post_sql = "UPDATE post SET content=?, author=?, topic_id=(SELECT id FROM topic WHERE title = ? LIMIT 1) WHERE post.id = ?";
    const queryPromise = () => {
        console.log("promise1");
        return new Promise((resolve, reject) => {
            db_1.default.query(topic_sql, id, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    const queryPromise2 = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query(post_sql, [content, author, topic, id], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    queryPromise();
    queryPromise2();
    // dbConfig.query(topic_sql, topic);
    // dbConfig.query(sql_post, [content, author, topic, id]);
};
exports.updatePost = updatePost;
const deletePost = (id) => {
    const sql = "DELETE FROM post WHERE post.id=?";
    return new Promise((resolve, reject) => {
        db_1.default.query(sql, id, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
    // dbConfig.query(sql, id);
};
exports.deletePost = deletePost;
