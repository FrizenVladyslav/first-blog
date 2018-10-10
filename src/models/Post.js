//Модель будет раб с коллекцией наших статей

import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
	{
		title: String,
		text: String
	},
	{
		timestamps: true //Свойство добавлеет дату создание и обновление
	}
);

const Post = mongoose.model('Post', PostSchema);

export default Post;