exports.handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            apiKey: process.env.VITE_FIREBASE_API_KEY,
            authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_ID,
            appId: process.env.VITE_FIREBASE_APP_ID
        }),
    };
};
