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

// GET the forecast for an area
router.get('/forecast/:id', rejectUnauthenticated, (req, res) =>{
  // GET info from db for this area
  console.log('in forecast get:', req.params.id);
  const queryString = `SELECT * FROM areas WHERE id=$1;`;
  const values = [req.params.id];
  pool.query(queryString, values).then((result)=>{
    console.log('back from db:', result.rows[0]);
    // set result from db to variable and use to make API request:

  }).catch((err)=>{
    console.log('error getting forecast in router', err);
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
