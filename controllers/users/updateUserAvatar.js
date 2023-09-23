const path = require('path');
const fs = require('fs').promises;

const Jimp = require('jimp');

const { usersModel } = require('../../models');

const avatarsPath = path.resolve('public', 'avatars');

async function updateAvatar(req, res) {
  const { path: tmpPath, filename } = req.file;

  const image = await Jimp.read(tmpPath);
  await image.resize(250, 250).quality(80).writeAsync(tmpPath);

  const finalPath = path.join(avatarsPath, filename);

  await fs.rename(tmpPath, finalPath);

  const avatarPath = path.join('avatars', filename);

  await usersModel.findByIdAndUpdate(req.user.id, { avatarURL: avatarPath });

  res.json({ avatarURL: avatarPath });
}

module.exports = updateAvatar;
