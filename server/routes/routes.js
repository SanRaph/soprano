const { Router } = require('express');
const router = Router();

const { userDataFunction, userPostFunction, getPostsFunction, getPostFunction, deletePostFunction, updatePostFunction  } = require('../controllers/functions');


router.route('/user-data').post(userDataFunction);

router.route('/user-post').post(userPostFunction);

router.route('/posts').get(getPostsFunction);

router.route('/post/:id').get(getPostFunction);

router.route('/delete-post/:id').delete(deletePostFunction);

router.route('/update-post/:id').put(updatePostFunction);

module.exports = router;
