const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/areacomments/:id', (req, res) => {
  // GET all comments for the area with this id
  console.log('in /comments/areacomments/:id', req.params.id);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
