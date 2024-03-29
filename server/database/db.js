import mongoose from 'mongoose';
import User from './User.js';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
export const createUser = async (username, password) => {
  try {
    const user = new User({
      username,
      password,
      campaigns: []
    });

    await user.save();
    console.log('User created...');
    return user;
  } catch (error) {
    console.error('Error creating user', error);
  }
};
export const getUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    console.log('Found User...');
    return user;
  } catch (error) {
    console.error('Error finding user', error);
  }
};



export const viewUserCampaigns = async (userId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    console.log('User campaigns:', user.campaigns);
    return user.campaigns;
  } catch (error) {
    console.error('Error viewing user campaigns', error);
  }
};

export const createCampaign = async (userId, title, description) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    const campaign = {title: title, log: [
        {role: "system", content: "You are responsible for running a fantasy text based adventure game for a player. Their character's name is " + title + ". The description of the players character is as follows: " + description + ". You must create a story for the player to interact with and respond to the players actions."}
      ],
      description: description
    };
    user.campaigns.push(campaign);
    await user.save();
    const savedCampaign = user.campaigns[user.campaigns.length - 1];
    console.log('Campaign created with id:', savedCampaign._id);
    return savedCampaign;

  } catch (error) {
    console.error('Error creating campaign', error);
  }
};

export const readCampaign = async (userId, campaignId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    const campaign = user.campaigns.find(c => c._id.equals(new mongoose.Types.ObjectId(campaignId)));
    console.log('Campaign found:', campaign);
    return campaign;
  } catch (error) {
    console.error('Error reading campaign', error);
  }
};

export const updateCampaign = async (userId, campaignId, log) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    const campaign = user.campaigns.find(c => c._id.equals(new mongoose.Types.ObjectId(campaignId)));
    campaign.log = log;
    await user.save();
    console.log('Campaign updated successfully');
    return campaign;
  } catch (error) {
    console.error('Error updating campaign', error);
  }
};

export const deleteCampaign = async (userId, campaignId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    //const campaignIndex = user.campaigns.findIndex(c => c.title === title);
    //user.campaigns.splice(campaignIndex, 1);
    const campaign = user.campaigns.find(c => c._id.equals(new mongoose.Types.ObjectId(campaignId)));
    user.campaigns.pull(campaign);
    await user.save();
    console.log('Campaign deleted...')
    return campaign;

  } catch (error) {
    console.error('Error deleting campaign', error);
  }
};

/*export const deleteUser = async (username, password) => {
  try {
    const user = await User.findOneAndDelete({ username, password });
    console.log('User deleted...');
    return user;
  } catch (error) {
    console.error('Error deleting user', error);
  }
};*/