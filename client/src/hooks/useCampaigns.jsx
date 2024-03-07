import { useState } from 'react';

const useCampaigns = () => {
    const [loading, setLoading] = useState(true);
    
    const fetchCampaigns = async (setCampaigns) => {
        try {
        const response = await fetch('http://localhost:3000/api/view-campaigns', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const data = await response.json();
        setCampaigns(data);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    
    return {fetchCampaigns};
};
export default useCampaigns;