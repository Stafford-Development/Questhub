import { useState } from 'react';

const useUserSettings = () => {
    const checkApiKey = async () => {
        try {
        const response = await fetch('http://localhost:3000/api/check-api-key', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const success = await response.json();
        return success;
        } catch (error) {
        console.error('Error fetching campaigns', error);
        }
    };
    return { checkApiKey }
};
export default useUserSettings;