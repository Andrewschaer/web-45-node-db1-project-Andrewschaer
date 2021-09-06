const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
};

const getById = id => {
  return db('accounts').where('id', id).first();
};

async function create (name, budget) {
  const [id] = await db('accounts').insert({ name, budget});
  const newAccount = await getById(id);
  return newAccount
}

const updateById = (id, name, budget ) => {
  return db('accounts').where('id', id).update({ name, budget})
    .then(() => {
      return getById(id);
    });
};

const deleteById = id => {
  return db('accounts')
  .where('id', id)
  .delete();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
