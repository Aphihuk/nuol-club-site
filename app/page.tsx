import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FocusAreas from "@/components/FocusAreas";
import TechStack from "@/components/TechStack";
import Stats from "@/components/Stats";
import Performance from "@/components/Performance";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FocusAreas />
        <TechStack />
        {/* <Stats /> */}
        <Performance />
        <Team />
      </main>
      <Footer />
    </>
  );
}
