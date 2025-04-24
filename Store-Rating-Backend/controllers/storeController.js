const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [
      { model: Rating },
      { model: User, as: 'owner' }
    ]
  });

  const result = stores.map(store => ({
    id: store.id,
    name: store.name,
    address: store.address,
    avgRating: store.Ratings.length
      ? store.Ratings.reduce((a, b) => a + b.rating, 0) / store.Ratings.length
      : 0
  }));

  res.json(result);
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const { id } = req.user;
  await Rating.upsert({ storeId, userId: id, rating });
  res.sendStatus(200);
};