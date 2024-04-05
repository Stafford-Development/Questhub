import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
    title:  String,
    description: String,
    log: Object,
  });

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    token: String,
    isEmailConfirmed: { type: Boolean, default: false },
    campaigns: [CampaignSchema]
});

const User = mongoose.model('User', UserSchema);

export default User;