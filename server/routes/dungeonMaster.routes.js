import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createCampaign, updateCampaign, readCampaign, createUser, getUser, viewUserCampaigns } from '../database/db.js'

dotenv.config();

const APIKey = process.env.OPENAI_API_KEY;
const router = express.Router();
const saltingRounds = 10;

const openai = new OpenAI({apiKey: APIKey});

let messageContent = "";




router.post('/chat', async (req, res) => {
    const campaign = await readCampaign(req.session.userId, req.body.campaignId);
    let conversationHistory = campaign.log;
    conversationHistory.push({role: "user", content: req.body.message});
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory
    });
    messageContent = chatCompletion.choices[0].message.content;
    conversationHistory.push({role: "assistant", content: messageContent});
    const updatedCampaign = await updateCampaign(req.session.userId, req.body.campaignId, conversationHistory);
    res.send(updatedCampaign);
  });
  
 /* router.post('/image', async (req, res) => {
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
  });*/

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
        res.send({success: true});
      } else {
        res.send({success: false});
      }
    });
  });
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if(err) {
        res.send({loggedOut: false});
      }
      res.clearCookie('connect.sid');
      res.send({loggedOut: true});
    });
  });

  router.get('/check-login', (req, res) => {
    if (req.session.userId) {
      res.send({ loggedIn: true, userId: req.session.userId });
    } else {
      res.send({ loggedIn: false });
    }
  });
  router.get('/view-campaigns', async (req, res) => {
    const campaigns = await viewUserCampaigns(req.session.userId);
    res.send(campaigns);
  });
  router.post('/create-campaign', async (req, res) => {
    const campaign = await createCampaign(req.session.userId, req.body.title, req.body.description);
    res.send(campaign);
  });
  
  router.post('/update-campaign', async (req, res) => {
    const campaign = await updateCampaign(req.session.userId, req.body.campaignId, req.body.log);
    res.send(campaign);
  });
  router.post('/read-campaign', async (req, res) => {
    const campaign = await readCampaign(req.session.userId, req.body.campaignId);
    res.send(campaign);
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