import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { TableContentProps } from "@/types/table";

export const TableContent = ({
  headerColumns,
  sortedItems,
  renderCell,
  onSelectionChange,
  filterSelectedKeys,
  sortDescriptor,
  setSortDescriptor,
}: TableContentProps) => {
  return (
    <Table
      id="team-members-table"
      isHeaderSticky
      color="primary"
      aria-label="Team members table with custom cells, pagination and sorting"
      bottomContentPlacement="outside"
      selectedKeys={filterSelectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      onSelectionChange={onSelectionChange}
      classNames={{
        wrapper: "min-h-[437px]",
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"start"}
            allowsSorting={column.uid !== "actions"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          <div className="flex flex-col items-center justify-center gap-3 h-[310px] border">
            <div className="size-12 bg-primary-50 rounded-full flex justify-center items-center">
              <Icon icon="lucide:inbox" className="text-primary-500 size-6" />
            </div>
            <h5 className="text-foreground">
              Aquí aparecerá el listado de colaboradores según su nivel de
              riesgo de renuncia
            </h5>
          </div>
        }
        items={sortedItems}
      >
        {(item) => (
          <TableRow
            key={item.id}
            className="h-[60px] max-h-[60px] overflow-hidden"
          >
            {(columnKey) => (
              <TableCell className="py-1 overflow-hidden text-ellipsis whitespace-normal">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
