import { useState } from 'react';

const useUserSettings = () => {
    const checkApiKey = async () => {
        try {
        const response = await fetch('/api/check-api-key', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const success = await response.json();
        return success;
        } catch (error) {
          console.error('Error checking apiKey.', error);
        }
    };
    const uploadApiKey = async (apiKey) => {
        try {
        const response = await fetch('/api/upload-api-key', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({apiKey}),
          });

        const data = await response.json();
        return data;
        } catch (error) {
          console.error('Error uploading API key.', error);
        }
    };
    const deleteApiKey = async () => {
        try {
          const response = await fetch('/api/delete-api-key', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });

          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error deleting API key.', error);
        }
    };
    const deleteUser = async () => {
        try {
          const response = await fetch('/api/delete-user', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });

          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error deleting user.', error);
        }
    };
    return { checkApiKey, uploadApiKey, deleteApiKey, deleteUser }
};
export default useUserSettings;