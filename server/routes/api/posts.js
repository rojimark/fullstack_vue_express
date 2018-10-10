const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get exports
router.get('/', async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

//add posts
router.post('/', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
})

// delete posts
router.delete('/:id', async (req , res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb://abc123:abc123@ds027688.mlab.com:27688/vue_express',{
    useNewUrlParser: true
  });
  return client.db('vue_express').collection('posts');
}
module.exports = router;
