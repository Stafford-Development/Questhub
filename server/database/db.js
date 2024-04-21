import mongoose from 'mongoose';
import User from './User.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
export const createUser = async (email, password) => {
  try {
    const user = new User({
      email,
      password,
      apiKey: undefined,
      token: undefined,
      isEmailConfirmed: false,
      campaigns: []
    });

    await user.save();
    console.log('User created...');
    return user;
  } catch (error) {
    console.error('Error creating user', error);
  }
};
export const retrieveEmail = async (userId) => {
  try {
  const _id = userId;
  const user = await User.findOne({ _id});
  return user.email;
  } catch (error) {
    console.error('Error retrieving email', error);
  }
} 
export const emailConfirmation = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    user.token = crypto.randomBytes(20).toString('hex');
    await user.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: 'questerwebsite@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: `
        <h2>Please click on the link to confirm your email</h2>
        <a href="http://localhost:3000/api/confirm-email/${user.token}">Confirm Email</a>
      `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return user;
  } catch (error) {
    console.error('Error sending email confirmation', error);
  }
}

export const checkConfirmed = async (userId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    return user.isEmailConfirmed;
    } 
  catch (error) {
      console.error('Error checking confirmation', error);
    }
  }
export const confirmUser = async (token) => {
  try {
    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(400).send({ message: 'Invalid confirmation token.' });
    }

    // Set the user's isEmailConfirmed field to true
    user.isEmailConfirmed = true;

    // Clear the emailConfirmationToken field
    user.token = undefined;

    // Save the user
    await user.save();

    return user;
  }
  catch (error) {
    console.error('Error confirming user', error);
  }
}

export const getUser = async (email) => {
  try {
    const user = await User.findOne({ email });
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

export const readApiKey = async (userId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    console.log('API Key found:', user.apiKey);
    return user.apiKey;

  } catch (error) {
    console.error('Error reading API Key', error);
  }
}

export const uploadAPIKey = async (userId, apiKey) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    user.apiKey = apiKey;
    await user.save();
    console.log('API Key uploaded successfully');
    return true;
  }
  catch (error) {
    console.error('Error uploading API Key', error);
    return false;
  }
}
export const deleteAPIKey = async (userId) => {
  try {
    const _id = userId;
    const user = await User.findOne({ _id });
    user.apiKey = undefined;
    await user.save();
    console.log('API Key deleted...');
    return true;
  }
  catch (error) {
    console.error('Error deleting API Key', error);
    return false;
  }
}

/*export const deleteUser = async (userId) => {
  try {
    const user = await User.findOneAndDelete({ username, password });
    console.log('User deleted...');
    return user;
  } catch (error) {
    console.error('Error deleting user', error);
  }
};*/