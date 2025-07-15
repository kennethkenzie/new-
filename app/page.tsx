"use client";

import { createTheme, ThemeProvider } from "flowbite-react";
import Navbar from "./components/navbar/page";
import Slide from "./slider/page";
import Footer from "./components/footer/page";
import RoomCards from "./roomcards/page";
import ExperiencesGrid from "./middle/page";
import { useState, useEffect } from "react";
import FacilitySection from "./components/hotel_facilities/page";
import HotelJumbotron from "./components/hotel_jambatron/page";
import EnhancedChatbot from "./components/enhanced-chatbot/EnhancedChatbot";
import "flowbite";

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

export default function App() {
  // Temporarily removed loading state to debug
  const loading = false;

  return (
    <ThemeProvider theme={customTheme}>
      <Navbar />
      <Slide />
      <ExperiencesGrid />
      <RoomCards />
      <HotelJumbotron />
      <FacilitySection />
      <Footer />
      <EnhancedChatbot />
    </ThemeProvider>
  );
}