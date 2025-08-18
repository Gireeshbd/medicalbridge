import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import TrustIndicators from '@/react-app/components/TrustIndicators';
import Services from '@/react-app/components/Services';
import Testimonials from '@/react-app/components/Testimonials';
import BlogSection from '@/react-app/components/BlogSection';
import ConsultationForm from '@/react-app/components/ConsultationForm';
import Footer from '@/react-app/components/Footer';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"consultation"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#7690e5"},"dark":{"cal-brand":"#7690e5"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustIndicators />
      <Services />
      <Testimonials />
      <BlogSection />
      <ConsultationForm />
      <Footer />
    </div>
  );
}
