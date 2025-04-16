import { COLUMNS } from "@/data/tableData";
import { SearchIcon } from "@/icons/icons";
import { TableFiltersProps } from "@/types/table";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";

export const TableFilters = ({
  filterValue,
  onSearchChange,
  visibleColumns,
  setVisibleColumns,
  filterSelectedKeys,
  headerColumns,
  sortDescriptor,
  setSortDescriptor,
  setPage,
  onOpenFilters,
}: TableFiltersProps) => {
  const handleSortChange = (column: string) => {
    setSortDescriptor({
      column,
      direction:
        sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
    setPage(1);
  };

  return (
    <div className="flex items-center gap-4 px-0">
      <div className="flex flex-col w-full lg:flex-row items-start gap-3 ">
        <div className="flex items-center w-full sm:w-auto flex-col gap-3 sm:flex-row ">
          <Input
            radius="lg"
            variant="bordered"
            className="max-w-84 mr-auto sm:max-w-56 min-w-44"
            endContent={<SearchIcon className="text-default-400" size={16} />}
            placeholder="Buscar..."
            value={filterValue}
            onValueChange={onSearchChange}
          />

          <div className="flex items-center justify-between sm:justify-start w-full max-w-[340px] mr-auto sm:gap-3">
            {/* Botón de Filtros */}
            <div>
              <Button
                color="primary"
                variant="bordered"
                className="border-1 px-3"
                radius="lg"
                startContent={
                  <Icon
                    className="text-primary"
                    icon="solar:tuning-2-linear"
                    width={16}
                  />
                }
                onPress={onOpenFilters}
              >
                Filtros
              </Button>
            </div>

            {/* Ordenar */}
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    color="primary"
                    variant="bordered"
                    className="border-1 px-3"
                    radius="lg"
                    startContent={
                      <Icon
                        className="text-primary"
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }
                  >
                    Ordenar
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter(
                    (c) => !["actions", "teams"].includes(c.uid)
                  )}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => handleSortChange(item.uid)}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Columnas */}
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    color="primary"
                    variant="bordered"
                    className="border-1 px-3"
                    radius="lg"
                    startContent={
                      <Icon
                        className="text-primary"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={COLUMNS.filter((c) => !["actions"].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item) => (
                    <DropdownItem key={item.uid}>{item.name}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-start flex-row-reverse lg:flex-row gap-4 mr-auto h-10">
          <Divider className="h-5 hidden lg:flex ml-4" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800 flex">
            {filterSelectedKeys === "all"
              ? "Todos seleccionados"
              : `${filterSelectedKeys.size} Seleccionados`}
          </div>

          {(filterSelectedKeys === "all" || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={
                    <Icon
                      className="text-default-400"
                      icon="solar:alt-arrow-down-linear"
                    />
                  }
                  radius="lg"
                  variant="flat"
                >
                  Acciones
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones">
                <DropdownItem key="send-email">Send email</DropdownItem>
                <DropdownItem key="pay-invoices">Pay invoices</DropdownItem>
                <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>
                <DropdownItem key="end-contract">End contract</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};
