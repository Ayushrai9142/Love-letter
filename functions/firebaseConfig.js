exports.handler = async function () {
    // Firebase CDN URLs ko Netlify environment variable se fetch karna
    const firebaseCdnUrl = process.env.FIREBASE_CDN_URL;

    // Firebase SDK URLs ko split karna (agar multiple URLs hain)
    const cdnUrls = firebaseCdnUrl.split(',');

    // Script tags ko dynamically generate karna
    let scriptTags = cdnUrls.map(url => `<script src="${url}"></script>`).join('');

    // Firebase Configuration details ko environment variables se fetch karna
    const firebaseConfig = {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_ID,
        appId: process.env.VITE_FIREBASE_APP_ID
    };

    // Response return karte hain with Firebase config and script tags
    return {
        statusCode: 200,
        body: JSON.stringify({
            firebaseConfig,
            scriptTags // Firebase SDK script tags
        }),
    };
};
