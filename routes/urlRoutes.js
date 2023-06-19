const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const  { getShortUrls, createShortUrl, redirectToFullUrl  ,   generateQRCode} = require('../controllers/urlshortenerController');
const   { isLoggedIn } = require("../middleware/Auths")
// const { validationResult } = require("../validator/url.validator")


// function validateRequest(req, res, next) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
  

router.get('/url', isLoggedIn ,  getShortUrls);
router.post('/shortUrls', isLoggedIn ,  validateRequest,  createShortUrl);
router.get('/:shortUrl', isLoggedIn ,  redirectToFullUrl);
router.get('/generateqrcode', generateQRCode)

module.exports = router;