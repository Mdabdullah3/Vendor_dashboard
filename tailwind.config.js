module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FD384F",
          secondary: "#141618",
          neutral: "#F3F4F6",
          "base-100": "#ffff",
          info: "#F5F5F5",
          success: "#521647",
          warning: "#DF7E07",
          error: "#FA5C5C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
