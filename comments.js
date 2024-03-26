// Create web server
// - Create a web server
// - Listen on port 3000
// - Handle requests to the root URL (/) by returning a list of comments
// - Handle requests to a URL that starts with /comments/ and has a number after it by returning a single comment with the number
// - Handle requests to any other URL by returning a 404 error
// - Handle requests to any other method than GET with a 405 error
// - Handle errors by returning a 500 error
// - Use the comments data from the data/comments.json file
// - Use the comments.js file to handle the comments logic

const http = require('http');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/') {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(comments.getAllComments()));
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (url.pathname.startsWith('/comments/')) {
    if (req.method === 'GET') {
      const commentId = parseInt(url.pathname.slice(10), 10);
      const comment = comments.getCommentById(commentId);
      if (comment) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comment));
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});