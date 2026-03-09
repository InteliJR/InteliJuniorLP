import FirstSection from "@/components/sections/FirstSection";
import PageShell from "@/components/sections/PageShell";
import SecondSection from "@/components/sections/SecondSection";
import ThirdSection from "@/components/sections/ThirdSection";
import FourthSection from "../components/sections/FourthSection";
import FifthSection from "@/components/sections/FifthSection";
import IndustriesSection from "@/components/sections/IndustriesSection";

export default function Home() {
  return (
    <main>
      <PageShell>
        <div className="page-wrapper" data-main-wrapper>
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          <IndustriesSection />
        </div>
        <FifthSection />
      </PageShell>
    </main>
  );
}
