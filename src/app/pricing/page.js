import PricingCardsSection from "./PricingCardsSection";
import ComparisonTable from "./ComparisonTable";
import CallToAction from "./CallToAction";
import PageHeader from "./PageHeader";

export default function PricingPage() {
  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader />
        <PricingCardsSection />
        <ComparisonTable />
      </main>
      <CallToAction />
    </div>
  );
}
