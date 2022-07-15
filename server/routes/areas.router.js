const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
