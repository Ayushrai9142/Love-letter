async function getFirebaseConfig() {
    const response = await fetch("/.netlify/functions/firebaseConfig");
    const config = await response.json();
    return config;
}

getFirebaseConfig().then((firebaseConfig) => {
    import { initializeApp } from "firebase/app";
    const app = initializeApp(firebaseConfig);
});
