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
export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    console.log('User logged in...');
    return user;
  } catch (error) {
    console.error('Error logging in user', error);
  }
};

export const viewUserCampaigns = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    console.log('User campaigns:', user.campaigns);
    return user.campaigns;
  } catch (error) {
    console.error('Error viewing user campaigns', error);
  }
};

export const createCampaign = async (username, password, title) => {
  try {
    const user = await User.findOne({ username, password });
    user.campaigns.push({title: title, log: []});
    await user.save();
    console.log('Campaign created...');
  } catch (error) {
    console.error('Error creating campaign', error);
  }
};

export const readCampaign = async (username, password, title) => {
  try {
    const user = await User.findOne({ username, password });
    const campaign = user.campaigns.find(c => c.title === title);
    console.log('Campaign found:', campaign);
    return campaign;
  } catch (error) {
    console.error('Error reading campaign', error);
  }
};

export const updateCampaign = async (username, password, title, log) => {
  try {
    const user = await User.findOne({ username, password });
    const campaign = user.campaigns.find(c => c.title === title);
    campaign.log = log;
    await user.save();
    console.log('Campaign updated successfully');
  } catch (error) {
    console.error('Error updating campaign', error);
  }
};

export const deleteCampaign = async (username, password, title) => {
  try {
    const user = await User.findOne({ username, password });
    //const campaignIndex = user.campaigns.findIndex(c => c.title === title);
    //user.campaigns.splice(campaignIndex, 1);
    const campaign = user.campaigns.find(c => c.title === title);
    user.campaigns.pull(campaign);
    await user.save();
    console.log('Campaign deleted...')
  
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