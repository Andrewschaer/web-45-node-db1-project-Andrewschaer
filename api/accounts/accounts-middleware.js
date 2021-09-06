const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params;
  Accounts.getById(id)
    .then(possibleAccount => {
      if (possibleAccount) {
        req.account = possibleAccount;
        next();
      } else {
        res.status(404).json({message: 'account not found'});
      }
    })
    .catch(next);
}