// Import Firebase SDK modules
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfEMLR9HIwLe7E25Do5Jy1VwlW4_zCFuc",
    authDomain: "codeutsava-45dda.firebaseapp.com",
    projectId: "codeutsava-45dda",
    storageBucket: "codeutsava-45dda.appspot.com",
    messagingSenderId: "125053951590",
    appId: "1:125053951590:web:f00bbb580ca546b16057a7",
    measurementId: "G-38Z99K1GNL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let boxX = 70; // Initial X position of the box
let boxY = 420; // Initial Y position of the box
const boxWidth = 100; // Width of the box
const boxHeight = 50; // Height of the box
const maxClicks = 9; // Maximum number of boxes
let clickCount = 0; // Count of boxes drawn

// Define the maximum and minimum boundaries
const xmax = 600 - boxWidth; // Adjust for box width
const ymax = 44;
const ymin = 420 - boxHeight; // Adjust for box height
const xmin = 40;

// Function to generate a new random position for the box
const getRandomBoxPosition = () => {
    const newX = Math.random() * (xmax - xmin) + xmin;
    const newY = Math.random() * (ymin - ymax) + ymax;
    return { newX, newY };
};

// Function to update the click count in the Firebase Realtime Database
const updateClickCountInDatabase = (count) => {
    const clickCountRef = ref(database, 'clickCount');
    set(clickCountRef, count);
};

// Main draw function
export const drawHand = (predictions, ctx) => {
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;

            // Draw landmarks as circles
            for (let i = 0; i < landmarks.length; i++) {
                const x = landmarks[i][0];
                const y = landmarks[i][1];

                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "aqua";
                ctx.fill();

                // Check if the landmark is inside the box
                if (
                    clickCount < maxClicks &&
                    x >= boxX &&
                    x <= boxX + boxWidth &&
                    y >= boxY &&
                    y <= boxY + boxHeight
                ) {
                    // Generate a new position for the box
                    const newPosition = getRandomBoxPosition();
                    boxX = newPosition.newX;
                    boxY = newPosition.newY;
                    clickCount++;

                    // Update click count in Firebase
                    updateClickCountInDatabase(clickCount);

                    console.log("Box clicked! Current count:", clickCount);
                }
            }
        });
    }

    // Draw the box (rectangle) on the canvas
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Semi-transparent red
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
};
