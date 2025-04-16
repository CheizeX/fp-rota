import { TableBottomContentProps } from "@/types/table";
import { Button, Pagination } from "@fichap-team/fichapui";

export const TableBottomContent = ({
  filterSelectedKeys,
  page,
  pages,
  filteredItemsLength,
  onPreviousPage,
  onNextPage,
  onPageChange,
}: TableBottomContentProps) => (
  <div className="flex flex-col items-center justify-center md:flex-row sm:justify-between gap-2 w-full sm:px-2">
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={pages}
      onChange={onPageChange}
    />
    <div className="w-full md:w-auto flex items-center justify-between lg:gap-6">
      <span className="text-small text-default-400 text-nowrap">
        {filterSelectedKeys === "all"
          ? "Todos seleccionados"
          : `${(filterSelectedKeys as Set<string>).size} / ${filteredItemsLength} seleccionados`}
      </span>
      <div className="flex items-center lg:gap-3 gap-1">
        <Button
          isDisabled={page === 1}
          variant="light"
          color="primary"
          radius="lg"
          onPress={onPreviousPage}
        >
          Volver
        </Button>
        <Button
          isDisabled={page === pages}
          radius="lg"
          color="primary"
          onPress={onNextPage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  </div>
);
