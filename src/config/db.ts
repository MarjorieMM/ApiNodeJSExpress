import mysql from "mysql";

const dbConfig = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	dateStrings: true,
});

dbConfig.connect((err: Error) => {
	if (err) throw err;
	console.log("database connected successfully");
});

const topic =
	"CREATE TABLE IF NOT EXISTS topic (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) CHARACTER SET utf8 NOT NULL)";

const post =
	"CREATE TABLE IF NOT EXISTS post (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, content TEXT CHARACTER SET utf8 NOT NULL, author VARCHAR(50) CHARACTER SET utf8 NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, topic_id INT NOT NULL, FOREIGN KEY (topic_id) REFERENCES `topic`(`id`))";
dbConfig.query(topic, (err, res) => {
	if (err) throw err;
	console.log("table `topic` added");
});
dbConfig.query(post, (err, res) => {
	if (err) throw err;
	console.log("table `post` added");
});

export default dbConfig;
