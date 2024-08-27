const userService = require('../services/userService');
const responseUtil = require('../utils/responseUtil');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    responseUtil.success(res, user, 201);
  } catch (error) {
    responseUtil.error(res, error.message, 400);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    responseUtil.success(res, users);
  } catch (error) {
    responseUtil.error(res, error.message, 400);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return responseUtil.error(res, 'User not found', 404);
    responseUtil.success(res, user);
  } catch (error) {
    responseUtil.error(res, error.message, 400);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return responseUtil.error(res, 'User not found', 404);
    responseUtil.success(res, user);
  } catch (error) {
    responseUtil.error(res, error.message, 400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return responseUtil.error(res, 'User not found', 404);
    responseUtil.success(res, { message: 'User deleted' });
  } catch (error) {
    responseUtil.error(res, error.message, 400);
  }
};
