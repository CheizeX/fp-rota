import AdditionsAndRemovals from "@/sections/AdditionsAndRemovals/AdditionsAndRemovals";
import CardsSection from "@/sections/CardsSection/CardsSection";
import DescriptionAndPrediction from "@/sections/DescriptionAndPrediction/DescriptionAndPrediction";
import RotationAspects from "@/sections/RotationAspects/RotationAspects";
import Table from "@/sections/table/Table";

export default function Home() {
  return (
    <section className="flex flex-col items-start justify-start h-full">
      <CardsSection />
      <AdditionsAndRemovals />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 sm:px-4 pb-4">
        <DescriptionAndPrediction />
        <RotationAspects />
      </div>
      <Table />
    </section>
  );
}
