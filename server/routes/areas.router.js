const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  // GET info for all areas
  const queryString = `SELECT * FROM areas ORDER BY "area" ASC;`
  pool.query(queryString).then((result)=>{
    res.send(result.rows);
  }).catch((err)=>{
    console.log('error in router: GET all areas', err);
    res.sendStatus(500);
  })
});

// GET info for an area
router.get('/area/:id', rejectUnauthenticated, (req, res) =>{
  const queryString = `SELECT * FROM areas WHERE id=$1;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    console.log('back from db:', result.rows[0]);
    res.send(result.rows[0]);
  }).catch((err)=>{
    console.log('error getting area in router', err);
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
