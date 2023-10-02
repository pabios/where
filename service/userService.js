import { connectToMongo } from "../Models/db.js";
import { UserModel } from "../Models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {PostModel} from "../models/post.js";

dotenv.config();
const { AUTH_SECRET, EXPIRESIN } = process.env;
connectToMongo().then(r => r);

export async function findById(id) {
  const user = await UserModel.findById(id).exec();
  return getMappedUser(user);
}

export async function getAllUsers() {
  const users = await UserModel.find();
  const mappedUserList = users.map(user => getMappedUser(user));
  return mappedUserList;
}

export async function getRandomUser(userId) {
  const users = await UserModel.find({ _id: { $ne: userId } });
  const randomIndex = Math.floor(Math.random() * users.length);
  return getMappedUser(users[randomIndex]);
}

export async function authenticateAndGenerateToken(email, password) {
  const user = await UserModel.findOne({ email: email});
  if (user) {
    let userPassHash = user.password
    const verified = bcrypt.compareSync(password, userPassHash);
    if (verified) {
      const token = jwt.sign(getMappedUser(user), AUTH_SECRET, { expiresIn: EXPIRESIN });
      return token;
    } else {
      throw new Error("Wrong credentials");
    }
  }
  throw new Error("User not recognized");
}

function getMappedUser(user) {
  return {
    id: user._id,
    gender: user.gender,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    phone: user.phone,
    birthdate: user.birthdate,
    city: user.city,
    country: user.country,
    photo: user.photo,
    category: user.category,
    isAdmin: user.isAdmin
  }
}

export  async  function  updateProfil(req,res){
  const payload = req.body.user;
  const user = await UserModel.findById(req.params.id).exec();

  if (payload.email && payload.email !== user.email) {
    const existingUser = await UserModel.findOne({ email: payload.email });
    if (existingUser)
      return res.status(400).send("Email déjà utilisé");
  }

  const salt = bcrypt.genSaltSync(10);
  payload.password = bcrypt.hashSync(payload.password, salt)

  const updatedUser = await UserModel.findOneAndUpdate({
    ...payload
  });
  // return res.status(200).send('success'); // @todo use this in prod
  return res.status(200).send(updatedUser);
}

export  async  function  userDelete(req,res){
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).json("Utilisateur non trouvé");
  await UserModel.findByIdAndDelete(req.params.id);
  return res.status(200).json("Utilisateur supprimé");
}

export async function createUser(req, res) { // un email pourra s'inscrire sur plusieur  site
  const payload = req.body.user;
  const userExists = await UserModel.findOne({ email: payload.email,site:payload.site});
  if (userExists) {
    res.status(400).send("User already exists For this site")
  }
  const salt = bcrypt.genSaltSync(10);
  payload.password = bcrypt.hashSync(payload.password, salt);
  const userToCreate = new UserModel(payload);
  const createdUser = await userToCreate.save();
  console.log(createdUser);
  res.status(200).send({
    "user": createdUser
  });
}


export async function countUser(res) {
  const count = await UserModel.countDocuments({});
  return  count;
}

export async function getCategory(){
  // db.users.distinct("category");
  const categories = await UserModel.distinct("category");
  return categories;
}

export async function add_to_favorite(req,res){
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Check if the post with the specified ID exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Add the post ID to the user's `favorites` array
    const user = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { favorites: postId } }, // Use `$addToSet` to avoid adding duplicates
        { new: true } // Return the updated user object
    );

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
