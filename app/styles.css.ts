import {style, keyframes, globalFontFace} from "@vanilla-extract/css";

// Keyframes
const fadeInAnimation = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

export const container = style({
    padding: "10px",
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(22,22,22,1) 60%, rgba(44,44,44,1) 90%)",
    height: "100vh",
    color: "white",
    display: "flex",
    justifyContent: "space-evenly",
    gap: "2rem",
    fontFamily: "sans-serif",
});

export const wrapper = style({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
});

export const containerButton = style({
    display: "flex",
    width: "40%",
    justifyContent: "center",
    marginTop: "4rem",
    height: "3rem",
    fontSize: "1.2rem",
    paddingTop: "0.6rem",
    border: "2px solid #282626",
    borderRadius: "0.4rem",
    backgroundColor: "#3b3b3c",
    transition: "0.2s",

    selectors: {
        "&:hover": {
            backgroundColor: "#282626",
            border: "2px solid black",
        },
        "&:focus": {
            backgroundColor: "#282626",
            border: "4px solid black",
        },
    },
});

export const grid = style({
    display: "flex",
    flexDirection: "column",
    minWidth: "25rem",
    maxWidth: "30rem",
    minHeight: "25rem",
    maxHeight: "30rem",
    alignSelf: "center",
    marginTop: "1.2rem",
});

export const gridRow = style({
    display: "flex",
    justifyContent: "center",
    minWidth: "25rem",
    maxWidth: "30rem",
});

export const gridItem = style({
    border: "2px solid #3b3b3c",
    borderRadius: "0.4rem",
    color: "white",
    padding: "1px",
    width: "5rem",
    height: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.6rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    margin: "0.3rem",
});

// Modifiers
export const gridItemFilled = style({
    backgroundColor: "#333335",
    animation: `${fadeInAnimation} 0.2s`,
});

export const letterCorrect = style({
    backgroundColor: "#498245",
});

export const letterPresent = style({
    backgroundColor: "#b59535",
});

export const input = style({
    width: "100%", // Make it responsive; can be adjusted
    maxWidth: "20rem", // Restrict maximum width for better alignment
    padding: "0.8rem 1rem", // Add padding for better UX
    fontSize: "1.2rem", // Keep font size consistent with the design
    borderRadius: "0.4rem", // Match with buttons and grid tiles
    border: "2px solid #3b3b3c", // Consistent with your grid and button styles
    backgroundColor: "#282828", // Match with the dark theme
    color: "white", // High contrast for readability
    outline: "none", // Remove default browser outline
    transition: "border-color 0.2s, box-shadow 0.2s", // Smooth transitions for focus

    selectors: {
        "&::placeholder": {
            color: "#7a7a7a", // Subtle placeholder text color
        },
        "&:hover": {
            borderColor: "#4a4a4a", // Slight highlight on hover
        },
        "&:focus": {
            borderColor: "#ffffff", // Highlight border when focused
            boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.5)", // Glow effect
        },
        "&:disabled": {
            backgroundColor: "#444444", // Disabled state background
            color: "#888888", // Disabled text color
            borderColor: "#555555", // Disabled border color
            cursor: "not-allowed", // Indicate disabled state
        },
    },
});

