import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createCampaign, updateCampaign, readCampaign, createUser, getUser } from '../database/db.js'

dotenv.config();

const APIKey = process.env.OPENAI_API_KEY;
const router = express.Router();
const saltingRounds = 10;

const openai = new OpenAI({apiKey: APIKey});

let messageContent = "";

let conversationHistory = [
  {role: "system", content: "You are an assistant to the dungeon master for Dungeons and Dragons fifth edition. Your job is to help the dungeon master describe moments in the game. Please describe the scene, but refrain from including any dialogue. The dungeon master will handle that."},
];


router.post('/chat', async (req, res) => {
    conversationHistory.push({role: "user", content: req.body.message});
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory
    });
    messageContent = chatCompletion.choices[0].message.content;
    conversationHistory.push({role: "assistant", content: messageContent});
    res.send(chatCompletion.choices[0].message);
  });
  
  router.post('/image', async (req, res) => {
    //image completion
    const imageCompletion = await openai.images.generate({
      model: "dall-e-3",
      prompt: messageContent,
      quality:"standard",
      size: "1792x1024",
      n: 1
    });
    const imageURL = imageCompletion.data[0];
    res.send(imageURL)
  });
  router.post('/create-user', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltingRounds, async function(err, hash) {
      const user = await createUser(username, hash);
      res.send(user);
    });
  });
  router.post('/login-user', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await getUser(username);
    const hash = user.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (result) {
        req.session.userId = user._id;
        res.send("Logged in successfully");
      } else {
        res.send("Password is incorrect!");
      }
    });
  });
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if(err) {
        return res.send('Error occurred during logout');
      }
      res.clearCookie('connect.sid');
      res.send('Logged out successfully');
    });
  });

  router.get('/check-login', (req, res) => {
    if (req.session.userId) {
      res.send({ loggedIn: true, userId: req.session.userId });
    } else {
      res.send({ loggedIn: false });
    }
  });
  router.post('/create-campaign', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const title = req.body.title;

    const user = await createCampaign(username, password, title);
    res.send(user);
  });
  
  router.post('/update-campaign', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const title = req.body.title;
    const log = req.body.log;

    const user = await updateCampaign(username, password, title, log);
    res.send(user);
  });
  router.post('/read-campaign', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password; 
    const title = req.body.title;

    const user = await readCampaign(name, password, title);
    res.send(user);
  });
  //router.post('/start-adventure', async (req, res) => {
    // Start a new adventure
    // Send the initial response from the AI Dungeon Master back to the client
  //});
  
  //router.post('/continue-adventure', async (req, res) => {
    // Continue the adventure based on the user's input
    // Send the response from the AI Dungeon Master back to the client
  //});
  
export default router;