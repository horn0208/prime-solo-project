const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/areacomments/:id', (req, res) => {
  // GET all comments for the area with this id
  // req.params.id is area id
  const queryString = `SELECT * FROM comments WHERE area_id=$1 ORDER BY id DESC;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    res.send(result.rows);
  }).catch(err=>{
    console.log('error in router: get comments', err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
