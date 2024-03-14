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
    
    return {fetchCampaigns, readCampaign};
};
export default useCampaigns;