const jwt = require('jwt-simple');
const User = require('../../models/User');
const axios = require('axios');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

function tokenForUser(user) {
  var payload = {
    id: user._id,
    time: new Date().getTime()
  };
  return jwt.encode(payload, SECRET_KEY);
}

exports.facebookAuth = function(req, res, next) {
  try {
    const token = req.body.token;
    axios
      .get(
        `https://graph.facebook.com/v4.0/me?fields=id,name,email,picture&access_token=${token}`
      )
      .then(function(response) {
        console.log('데이터', response.data);
        const facebook_id = response.data.id;
        const name = response.data.name;
        const profile_image = response.data.picture.data.url;
        console.log('여기');
        User.find({ facebook_id: facebook_id }, function(err, data) {
          console.log('유저파인드', data);
          const user = data[0];
          if (err) {
            return next(err);
          }
          if (!user) {
            const user = new User({
              facebook_id: facebook_id,
              name: name,
              profile_image: profile_image
            });
            user.save(function(err) {
              if (err) {
                return next(err);
              }
              console.log('유저생성');
              res.json({ token: tokenForUser(user), user });
            });
          } else {
            console.log('기존유저');
            res.json({ token: tokenForUser(user), user });
          }
        });
      })
      .catch(function(error) {
        return next(error);
      });
  } catch {
    next();
  }
};
