/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                text: "auto 10px 10px 10px",
            },
        },
        screens: {
            phone: { max: "600px" },
            under: { max: "900px" },
            phone_landscape: { raw: "(max-height: 400px)" },
            sm: { min: "600px" },
            md: { min: "768px" },
            lg: { min: "1024px" },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
