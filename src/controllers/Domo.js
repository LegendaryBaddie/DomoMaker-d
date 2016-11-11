const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.level) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ redirect: '/maker' });
  });
};

const levelDomo = (req, res) => {
  const name1 = req.body.passBackName;

  const experiencedDomo = Domo.DomoModel.findByName(name1, (err, doc) =>
  {
    if(err){
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    doc.level++;
    doc.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ redirect: '/maker' });
    });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.level = levelDomo;
