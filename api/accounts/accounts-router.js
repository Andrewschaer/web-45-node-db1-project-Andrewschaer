const router = require('express').Router()
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', (req, res) => {
  Accounts.getAll()
    .then(allAccounts => {
      res.status(200).json(allAccounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving all accounts data'});
    });
});

router.get('/:id', checkAccountId, (req, res) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the account data'});
    });
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body.name.trim(), req.body.budget)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error posting the new account data'});
    });
});

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body.name.trim(), req.body.budget)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error updating the account data'});
    });
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
