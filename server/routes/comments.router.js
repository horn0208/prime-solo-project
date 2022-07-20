const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/areacomments/:id', rejectUnauthenticated, (req, res) => {
  // GET all comments for the area with this id
  // req.params.id is area id
  const queryString = `SELECT comments.id, date, comment, user_id, area_id, username FROM comments 
	  JOIN "user" ON comments.user_id="user".id
	  WHERE area_id=$1 ORDER BY comments.date DESC;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log('error in router: get comments', err);
    res.sendStatus(500);
  })
});

router.get('/comment/:id', rejectUnauthenticated, (req, res)=>{
  // GET the comment with this id, join to get area name too
  // req.params.id is comment_id
  const queryString = `SELECT comments.id, date, comment, user_id, area, area_id 
    FROM comments
	  JOIN areas ON areas.id=comments.area_id
	  WHERE comments.id=$1;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log('error: get my comment', err);
    res.sendStatus(500);
  })
})


router.post('/comment', rejectUnauthenticated, (req, res) => {
  // POST a new comment for the area with this id
  console.log('server post comment. req.user:', req.user); //req.user includes id, username, role
  const queryString = `INSERT INTO comments (date, comment, user_id, area_id) 
    VALUES ($1, $2, $3, $4);`;
  const values = [req.body.date, req.body.comment, req.user.id, req.body.area_id];
  pool.query(queryString, values).then((result)=>{
    res.sendStatus(201);
  }).catch(err=>{
    console.log('error in router post comment:', err);
    res.sendStatus(500);
  })
});

router.put('/comment/:id', rejectUnauthenticated, (req, res) =>{
  // UPDATE the comment with this id
  console.log('update:', req.body);
  const queryString = `UPDATE comments SET date=$1, comment=$2
	  WHERE id=$3 and user_id=$4;`;
  const values = [req.body.date, req.body.comment, req.params.id, req.user.id];
  pool.query(queryString, values).then((result)=>{
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

router.delete('/comment/:id', rejectUnauthenticated, (req, res) => {
  // DELETE the comment with this id
  console.log('delete req.params.id:', req.params.id);
  // adding check that user id matches in database to keep out the riffraff
  const queryString = `DELETE FROM comments WHERE id=$1 AND user_id=$2;`;
  const values = [req.params.id, req.user.id];
  pool.query(queryString, values).then((result)=>{
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;
