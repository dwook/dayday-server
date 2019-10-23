const express = require('express');
const router = express.Router();
const diaryController = require('./controllers/diaryController');

router.post('/', diaryController.createDiary);
router.get('/:diary_id', diaryController.getDiaryById);
router.get('/', diaryController.getDiary);

module.exports = router;
