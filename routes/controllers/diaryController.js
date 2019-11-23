const Diary = require('../../models/Diary');
const moment = require('moment');

exports.createDiary = async function(req, res, next) {
  try {
    Diary.find(
      {
        created_at: req.body.date
      },
      async function(err, data) {
        const diary = data[0];
        if (!diary) {
          const diary = new Diary({
            created_at: moment(new Date()).format('YYYY-MM-DD'),
            writer: req.body.user.id,
            good: req.body.diary.good,
            bad: req.body.diary.bad,
            plan: req.body.diary.plan
          });
          await diary.save();
          res.json({ diary });
        } else {
          (diary.good = req.body.diary.good),
            (diary.bad = req.body.diary.bad),
            (diary.plan = req.body.diary.plan);
          await diary.save();
          res.json({ diary });
        }
      }
    );
  } catch {
    next();
  }
};

exports.getDiary = async function(req, res, next) {
  try {
    const diary = await Diary.find({
      writer: req.query.writer,
      created_at: {
        $gte: moment(new Date(req.query.begin)).format('YYYY-MM-DD'),
        $lte: moment(new Date(req.query.end)).format('YYYY-MM-DD')
      }
    }).sort({ created_at: -1 });
    res.json({ diary });
  } catch {
    next();
  }
};

exports.getDiaryById = async function(req, res, next) {
  try {
    const diary = await Diary.findById(req.params.diary_id);
    res.json({ diary });
  } catch {
    next();
  }
};
