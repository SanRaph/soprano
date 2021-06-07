const Router = require('express');
const router = Router();
const { getPostsFunction } = require('../controllers/private');
const { protect } = require('../middleware/protectedroute');

router.route('/posts/private').get(protect, getPostsFunction);

module.exports = router;