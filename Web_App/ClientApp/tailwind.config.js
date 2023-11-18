/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/***/**/*.{html,js,jsx}"],
    theme: {
        colors: {
            primary:
            {
                100:"#FFFFFF",
                200:"#CCCCCC",
                300:"#999999",
                400:"#666666",
                500:"#333333",

            },
            black: "#000000",
            secondary: "#D2B48C",
            "background-color": "#FFFFFF",
            red: "#ff0000",
            greenLight: "#90EE90",
            lightgrey:"#F2F2F2"
            
        },
        extend: {
            width: {
                'xl': '40rem'
            },
            height: {
                'xl': '30rem'
            }
        },

    },
    plugins: [],

}