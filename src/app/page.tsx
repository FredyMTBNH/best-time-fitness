import Hero from "../components/hero-section"
import NavBar from "../components/nav-bar"
import Metricas from "@/components/metricas";
import Clases from "@/components/clases"
import Instalaciones from "@/components/instalaciones"
import SectionApp from "@/components/app"
import Experiencia from "@/components/experiencia";
import Sucursales from "@/components/sucursales";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <NavBar />
      <Hero />
      <Metricas />
      <Clases />
      <Instalaciones />
      <SectionApp />
      <Experiencia />
      <Sucursales />
      <Footer />
    </div>
  );
}
