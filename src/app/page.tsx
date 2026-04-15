import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import CatalogSection from "@/components/CatalogSection";
import Testimonials from "@/components/Testimonials";
import Delivery from "@/components/Delivery";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CatalogSection />
      <About />
      <Process />
      <Testimonials />
      <Delivery />
      <Cta />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
