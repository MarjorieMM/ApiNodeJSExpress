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
exports.deletePost = exports.updatePost = exports.getSinglePost = exports.addPost = exports.getPosts = void 0;
const db_1 = __importDefault(require("../config/db"));
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
const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, author, topic } = post;
    const topic_sql = "INSERT IGNORE INTO topic (title) VALUES (?)";
    const sql_post = "INSERT INTO post (content, author, topic_id) VALUES(?, ?, (SELECT id FROM topic WHERE title = ? LIMIT 1))";
    const topicPromise = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query(topic_sql, topic, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    const postPromise = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query(sql_post, [content, author, topic], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    try {
        yield topicPromise();
        yield postPromise();
    }
    catch (e) {
        console.log(e);
    }
    return post;
});
exports.addPost = addPost;
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
const updatePost = (id, post) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, author, topic } = post;
    const topic_sql = "INSERT IGNORE INTO topic (title) VALUES (?)";
    const post_sql = "UPDATE post SET content=?, author=?, topic_id=(SELECT id FROM topic WHERE title = ? LIMIT 1) WHERE post.id = ?";
    const topicPromise = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query(topic_sql, topic, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    const postPromise = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query(post_sql, [content, author, topic, id], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
    try {
        yield topicPromise();
        yield postPromise();
    }
    catch (e) {
        console.log(e);
    }
    return post;
});
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
};
exports.deletePost = deletePost;
