import { Topic } from "./topic";

export interface Post {
	id: Number;
	content: String;
	author: String;
	date: Date;
	topic: Topic;
	length: Number;
}
