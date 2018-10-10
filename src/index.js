import mongoose from 'mongoose';
import PostModel from './models/Post';
import express from 'express';
import bodyParser from "body-parser";

const app = express();

mongoose.connect('mongodb://localhost/blog');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
	const data = req.body;

	const post = new PostModel({
		title: data.title,
		text: data.text,
	});
	
	post.save().then(() => {
		res.json({status: 'OK!!!'});
	});


});

app.get('/posts', (req, res) => {
	PostModel.find().then((err, posts) => {
		if(err) return res.send(err);

		res.json(posts);
	});
});

app.delete('/posts/:id', (req, res) => {
	PostModel.remove({
		_id: req.params.id
	}).then(post => {
		if(post){
			res.json({status: 'deleted'});
		}else{
			res.json({status: 'error'});
		}
	});
});

app.put('/posts/:id', (req, res) => {
	PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err) => {
		if(err){
			res.send(err);
		}
		res.json({status: 'updated'});
	});
});

app.listen(3333, () => {
	console.log('Server worked');
});


