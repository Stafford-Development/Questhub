import { useState } from 'react';

const useCampaigns = () => {
    const [loading, setLoading] = useState(true);
    
    const fetchCampaigns = async () => {
        try {
        const response = await fetch('http://localhost:3000/api/view-campaigns', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });

        const data = await response.json();
        setLoading(false);
        return data;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    const createCampaign = async (title, description) => {
        try {
        const response = await fetch('http://localhost:3000/api/create-campaign', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, description}),
          });

        const campaign = await response.json();
        setLoading(false);
        return campaign;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    const readCampaign = async (campaignId) => {
        try {
        const response = await fetch(`http://localhost:3000/api/read-campaign`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({campaignId}),
          });

        const data = await response.json();
        setLoading(false);
        return data;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    const chatCampaign = async (campaignId, message) => {
        try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({campaignId, message}),
          });

        const campaign = await response.json();
        setLoading(false);
        return campaign;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    const updateCampaign = async (campaignId, log) => {
        try {
        const response = await fetch('http://localhost:3000/api/update-campaign', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({campaignId, log}),
          });

        const campaign = await response.json();
        setLoading(false);
        return campaign;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    }
    
    return {fetchCampaigns, readCampaign, chatCampaign, createCampaign, updateCampaign};
};
export default useCampaigns;