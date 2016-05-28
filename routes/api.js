var express = require('express');
var router = express.Router();

var data = {
  "posts": [
    {
      "title": "Hello",
      "text":"post text hi lorem ipsum dolor sit amet constetuer adipiscing elit"
    },
    {
      "title": "Hello too",
      "text":"Hi yo"
    }
  ]
}


/* GET home page. */
router.get('/posts', function(req, res) {
  var posts = []
  data.posts.forEach(function(post, i){
    var postText;
    var more;
    if (post.text.length > 50) {
      postText = post.text.substr(0, 50) + '...';
      more = true;
    } else {
      postText = post.text;
      more = false;
    }
    posts.push({
      id: i,
      more: more,
      title: post.title,
      text: postText
    });
  });
  res.json({
    posts:posts
  });
});

router.get('/post/:id', function(req, res) {
  var id = req.params.id
  var post = data.posts[id];
  res.json({
    title: post.title,
    text: post.text
  });
});

router.post('/post', function(req, res) {
  data.posts.push(req.body);
  res.json(req.body);
});

router.put('/post/:id', function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
});

router.delete('/post/:id', function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = router;
