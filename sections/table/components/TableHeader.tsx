import { DownloadIcon, ExcelIcon } from "@/icons/icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export const TableHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadExcel = () => {
    // Acá iría la lógica para descargar el Excel
    console.log("Descargando Excel");
  };

  return (
    <div className="flex items-center justify-between mb-0 pr-0">
      <div className="flex items-center gap-2">
        <Icon icon="lucide:users" className="text-default-400 text-2xl" />
        <h1 className="text-lg font-bold">Colaboradores con riesgo</h1>
      </div>

      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end">
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="bordered"
            color="primary"
            className="border-1"
          >
            <DownloadIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Opciones de descarga">
          <DropdownItem
            key="excel"
            aria-label="Descargar Excel"
            startContent={<ExcelIcon className="text-xl" />}
            onPress={handleDownloadExcel}
            className="py-2"
          >
            Excel
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
