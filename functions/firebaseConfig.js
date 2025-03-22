exports.handler = async function () {
    // Fetching Firebase CDN URLs from environment variable
    const firebaseCdnUrl = process.env.VITE_FIREBASE_CDN_URL;

    // Check if firebaseCdnUrl is undefined or empty
    if (!firebaseCdnUrl) {
        console.error("🚨 VITE_FIREBASE_CDN_URL environment variable is not set!");
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Firebase CDN URL is not configured correctly."
            })
        };
    }

    // Splitting the comma-separated URLs into an array
    const cdnUrls = firebaseCdnUrl.split(',');

    // Dynamically generating script tags for each CDN URL
    let scriptTags = cdnUrls.map(url => `<script src="${url}"></script>`).join('');

    // Firebase Configuration details from environment variables
    const firebaseConfig = {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_ID,
        appId: process.env.VITE_FIREBASE_APP_ID
    };

    // Returning the Firebase config and script tags
    return {
        statusCode: 200,
        body: JSON.stringify({
            firebaseConfig,
            scriptTags
        }),
    };
};
