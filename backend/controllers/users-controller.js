const { uuid } = require('uuidv4');
const HttpError = require('../modals/http-error');
const {validationResult} = require('express-validator');
const User = require('../modals/users');

const DUMMY_USERS = [
    {
      id: "u1",
      name: "Ganja",
      email: "GanjaGun@gmail.com",
      password: "GanjaOP"
    },
    { id: "u2", name: "Panty", email: "PinkPanty@gmail.com", password: "PantyVau" },
  ];

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new HttpError("Invalid input. Kindly check your data",422);
        return next(error);
    }

    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch(err){
        const error = new HttpError("SignUp failed, try again",404);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError("User with this email already exists!",500);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://i.pinimg.com/236x/67/0a/1d/670a1d06e7bff426ec343e8c06c93ca5--crazy-faces-strange-people.jpg',
        places: []
    })

    try{
        await createdUser.save();
    } catch(err){
        const error = new HttpError("Signup failed, try again!",500);
        return next(error);
    }

    res.status(200).json({createdUser: createdUser.toObject({getters: true})});
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let userExists;
    try{
        userExists = await User.findOne({email: email});
    } catch(err){
        const error = new HttpError("Login failed , try again!",500);
        return next(error);
    }

    if(!userExists || userExists.password !== password){
        const error = new HttpError("Could not find the user, wrong credentials Entered", 401);
        return next(error);
    }

    res.json({message: "Logged In"});
};


const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({},'-email');
    } catch(err){
        const error = new HttpError("Fetching users failed, please try again!", 401);
        return next(error);
    }

    res.status(200).json({users: users.map((user) => user.toObject({getters: true}))});
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;