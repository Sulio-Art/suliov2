import PricingCardsSection from "../../Components/pricing/PricingCardsSection";
import ComparisonTable from "../../Components/pricing/ComparisonTable";
import CallToAction from "../../Components/pricing/CallToAction";
import PageHeader from "../../Components/pricing/PageHeader";

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