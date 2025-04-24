//import Image from "next/image";

import { WeatherProvider } from "./components/WeatherContext";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainBody from "./components/MainBody";

export default function Home() {
  return (
    <WeatherProvider>
   
    <main className="min-h-screen bg-black text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content layout: sidebar + main body */}
      <div className="flex flex-row p-8 gap-4">
        {/* Sidebar - takes 1/3 width */}
        <div className="w-1/3">
          <Sidebar />
        </div>

        {/* Main Body - takes 2/3 width */}
        <div className="w-2/3">
          <MainBody />
        </div>
      </div>
    </main>
    
    </WeatherProvider>
  );
}

