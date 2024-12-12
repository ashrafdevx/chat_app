module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: true, // or 'media' or 'class'

  daisyui: {
    // themes: [
    //   {
    //     whiteTheme: {
    //       primary: "#ffffff", // White primary color
    //       secondary: "#f0f0f0", // Light gray for secondary
    //       accent: "#e0e0e0", // Lighter accent
    //       neutral: "#d4d4d4", // Neutral color
    //       "base-100": "#ffffff", // Base background as white
    //       info: "#a8a8a8", // Info color
    //       success: "#8dc891", // Light green success
    //       warning: "#ffc107", // Light yellow warning
    //       error: "#ff6b6b", // Light red error
    //     },
    //   },
    // ],
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
