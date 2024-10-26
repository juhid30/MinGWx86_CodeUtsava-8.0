import React from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const FitData = () => {
  const fetchGoogleFitData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to access Google Fit data.');
      return;
    }

    const token = await user.getIdToken(); // Get Firebase ID token
    const accessToken = await getGoogleAccessToken(token); // Function to exchange for Google access token

    if (!accessToken) {
      alert('Unable to get access token for Google Fit.');
      return;
    }

    try {
      const response = await axios.get('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Google Fit Data:', response.data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching Google Fit data:', error);
    }
  };

  const getGoogleAccessToken = async (firebaseToken) => {
    // Exchange Firebase token for Google access token
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        id_token: firebaseToken,
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        audience: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        grant_type: 'urn:ietf:params:oauth:grant-type:token-id',
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting Google access token:', error);
      return null;
    }
  };

  return (
    <div>
      <h1>FitData</h1>
      <button onClick={fetchGoogleFitData}>Fetch Google Fit Data</button>
    </div>
  );
};

export default FitData;
