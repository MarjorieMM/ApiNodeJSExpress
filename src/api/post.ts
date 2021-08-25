import dbConfig from "../config/db";
import { Post } from "../interface/post";
import { Topic } from "../interface/topic";

function getPosts() {
	const sql: string =
		"SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id";
	return new Promise<Post>((resolve, reject) => {
		dbConfig.query(sql, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
}

const addPost = async (post: Post) => {
	const { content, author, topic } = post;
	const topic_sql: string = "INSERT IGNORE INTO topic (title) VALUES (?)";
	const sql_post: string =
		"INSERT INTO post (content, author, topic_id) VALUES(?, ?, (SELECT id FROM topic WHERE title = ? LIMIT 1))";
	const topicPromise = () => {
		return new Promise<Topic>((resolve, reject) => {
			dbConfig.query(topic_sql, topic, (err, res) => {
				if (err) return reject(err);
				resolve(res);
			});
		});
	};

	const postPromise = () => {
		return new Promise<Post>((resolve, reject) => {
			dbConfig.query(sql_post, [content, author, topic], (err, res) => {
				if (err) return reject(err);
				resolve(res);
			});
		});
	};
	try {
		await topicPromise();
		await postPromise();
	} catch (e) {
		console.log(e);
	}
	return post;
};

const getSinglePost = (id: Number) => {
	const sql =
		"SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id WHERE post.id = ?";
	return new Promise<Post>((resolve, reject) => {
		dbConfig.query(sql, id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
};

const updatePost = async (id: Number, post: Post) => {
	const { content, author, topic } = post;
	const topic_sql: string = "INSERT IGNORE INTO topic (title) VALUES (?)";
	const post_sql: string =
		"UPDATE post SET content=?, author=?, topic_id=(SELECT id FROM topic WHERE title = ? LIMIT 1) WHERE post.id = ?";
	const topicPromise = () => {
		return new Promise<Topic>((resolve, reject) => {
			dbConfig.query(topic_sql, topic, (err, res) => {
				if (err) return reject(err);
				resolve(res);
			});
		});
	};

	const postPromise = () => {
		return new Promise<Post>((resolve, reject) => {
			dbConfig.query(post_sql, [content, author, topic, id], (err, res) => {
				if (err) return reject(err);
				resolve(res);
			});
		});
	};
	try {
		await topicPromise();
		await postPromise();
	} catch (e) {
		console.log(e);
	}
	return post;
};

const deletePost = (id: Number) => {
	const sql: string = "DELETE FROM post WHERE post.id=?";
	return new Promise((resolve, reject) => {
		dbConfig.query(sql, id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
};

export { getPosts, addPost, getSinglePost, updatePost, deletePost };

// const getPosts = (callback: Function) => {
// 	const sql: string =
// 		"SELECT post.id, content, author, date, topic_id, title FROM post INNER JOIN topic t ON post.topic_id = t.id";
// 	dbConfig.query(sql, (err, res) => {
// 		if (err) callback(err, null);
// 		else callback(null, res);
// 	});
// };
