let User = require('../model/user');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const dd = require('dump-die');

exports.renderHomePage = (req, res) =>{
    res.render('home');
}

//To get user list
exports.getUserList = (req, res) => {

  let search = req.query.search;

  var whereStatement = {};
  if (req.query.search) {
      whereStatement.firstname = {
          [Op.like]: '%' + search + '%'
      };
  }

  User.findAndCountAll().then((data) => {
      let limit = 2; // number of records per page
      let offset = 0;
      let page = req.params.page_no|| 1; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      User.findAll({
          where: whereStatement,
          limit: limit,
          offset: offset,
          $sort: {
              id: 1
          }
      }).then(function(result) {
          console.log(data.count);
          res.render('user-list', {
              title: 'Aexo Users',
              users: result,
              'current': page,
              'pages': pages
          });
      });
  });
}

//edit user data
exports.getEditUser = (req, res) => {
  User.findByPk(req.params.id).then(result => {
      return res.json(result);
  });
} 

//updating user data
exports.postUpdateUser = (req, res) => {
  User.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      address: req.body.address,
  }, {
      where: {
          id: req.body.id
      }
  }).then(result => {
      return res.json({
          msg: "User updated successfully",
          success: true
      });
  }).catch(err => {
      return res.json({
          msg: "Something went wrong",
          success: false
      });
  });
}