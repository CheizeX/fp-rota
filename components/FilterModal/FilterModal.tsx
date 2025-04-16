import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@fichap-team/fichapui";
import { FC, useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const FilterModal: FC<FilterModalProps> = ({ isOpen, onOpenChange }) => {
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedEducation, setSelectedEducation] = useState<string>("");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");

  const handleFilter = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="md"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Filtrar</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 py-4">
                <Select
                  variant="bordered"
                  label="Unidad organizativa"
                  placeholder="Selecciona una opción"
                  selectedKeys={
                    selectedOrganization ? [selectedOrganization] : []
                  }
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="dept1">Departamento 1</SelectItem>
                  <SelectItem key="dept2">Departamento 2</SelectItem>
                  <SelectItem key="dept3">Departamento 3</SelectItem>
                </Select>

                <Select
                  variant="bordered"
                  label="Subcategoría"
                  placeholder="Selecciona una opción"
                  selectedKeys={
                    selectedSubcategory ? [selectedSubcategory] : []
                  }
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="sub1">Subcategoría 1</SelectItem>
                  <SelectItem key="sub2">Subcategoría 2</SelectItem>
                  <SelectItem key="sub3">Subcategoría 3</SelectItem>
                </Select>

                <Select
                  variant="bordered"
                  label="Nivel educativo"
                  placeholder="Selecciona una opción"
                  selectedKeys={selectedEducation ? [selectedEducation] : []}
                  onChange={(e) => setSelectedEducation(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="edu1">Primario</SelectItem>
                  <SelectItem key="edu2">Secundario</SelectItem>
                  <SelectItem key="edu3">Universitario</SelectItem>
                  <SelectItem key="edu4">Posgrado</SelectItem>
                </Select>

                <Select
                  variant="bordered"
                  label="Nacionalidad"
                  placeholder="Selecciona una opción"
                  selectedKeys={
                    selectedNationality ? [selectedNationality] : []
                  }
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="nat1">Argentina</SelectItem>
                  <SelectItem key="nat2">Brasil</SelectItem>
                  <SelectItem key="nat3">Chile</SelectItem>
                  <SelectItem key="nat4">Uruguay</SelectItem>
                </Select>

                <Select
                  variant="bordered"
                  label="Género"
                  placeholder="Selecciona una opción"
                  selectedKeys={selectedGender ? [selectedGender] : []}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="gender1">Masculino</SelectItem>
                  <SelectItem key="gender2">Femenino</SelectItem>
                  <SelectItem key="gender3">No binario</SelectItem>
                </Select>

                <Select
                  variant="bordered"
                  label="Rango generacional"
                  placeholder="Selecciona una opción"
                  selectedKeys={selectedGeneration ? [selectedGeneration] : []}
                  onChange={(e) => setSelectedGeneration(e.target.value)}
                  className="w-full"
                >
                  <SelectItem key="gen1">Baby Boomers</SelectItem>
                  <SelectItem key="gen2">Generación X</SelectItem>
                  <SelectItem key="gen3">Millennials</SelectItem>
                  <SelectItem key="gen4">Generación Z</SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleFilter}>
                Aplicar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
