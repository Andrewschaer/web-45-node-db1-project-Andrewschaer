const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  if (
    req.body.name === undefined ||
    req.body.budget === undefined
  ) {
    res.status(400).json({message: 'name and budget are required'});
  } else if (
    typeof req.body.name !== 'string'
  ) {
    res.status(400).json({message: 'name of account must be a string'});
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    res.status(400).json({message: 'name of account must be between 3 and 100'});
  } else if (
    typeof req.body.budget !== 'number' 
  ) {
    res.status(400).json({message: 'budget of account must be a number'});
  } else if (
    req.body.budget < 0 ||
    req.body.budget > 1000000
  ) {
    res.status(400).json({message: 'budget of account is too large or too small'});
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body;
  Accounts.getAll()
    .then(allAccounts => {
      if (allAccounts.some(account => account.name === name.trim())) {
        res.status(400).json({message: 'that name is taken'});
      }
      else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred validating the account name is unique'});
    });
};

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