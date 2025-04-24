const { User, Store, Rating } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!['admin', 'normal', 'owner'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const filters = {};

    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (email) filters.email = { [Op.like]: `%${email}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };
    if (role) filters.role = role;

    const users = await User.findAll({
      where: filters,
      attributes: ['id', 'name', 'email', 'address', 'role'],
    });

    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};