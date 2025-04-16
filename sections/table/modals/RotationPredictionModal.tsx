import GaugeMeter from "@/components/GaugeMeter/GaugeMeter";
import { getEmoji } from "@/data/emotions";
import { CalendarIcon, RemoveUserIcon } from "@/icons/icons";
import { useViewport } from "@/hooks/use-viewport";
import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@fichap-team/fichapui";
import React, { useEffect } from "react";
import { EmotionType, UserType } from "@/types/table";
import {
  calculateDaysLeft,
  getEmotionByRisk,
  getProbableCause,
  getRiskColorClass,
} from "@/helpers/tableHelpers";
import { InfoCard } from "../components/InfoCard";
import { UserInfoHeader } from "../components/UserInfoHeader";

// Componente para mostrar el medidor semicircular con el porcentaje de riesgo
const RiskGauge = ({
  percentage,
  emotion,
}: {
  percentage: number;
  emotion?: EmotionType;
}) => {
  // Utilizar las funciones de utilidad para determinar color, emoción y nivel de riesgo
  const colorClass = getRiskColorClass(percentage);
  const finalEmotionType = getEmotionByRisk(percentage, emotion);
  const emoji = getEmoji(finalEmotionType);
  const riskLevel =
    percentage >= 70 ? "Alto" : percentage >= 40 ? "Medio" : "Bajo";

  return (
    <GaugeMeter
      value={percentage}
      label={riskLevel}
      customEmoji={emoji}
      colorClass={colorClass}
      size="sm"
    />
  );
};

interface RotationPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
}

export const RotationPredictionModal: React.FC<
  RotationPredictionModalProps
> = ({ isOpen, onClose, user }) => {
  const { isMobile } = useViewport();

  // Efecto para ocultar la scrollbar del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Añadir clase para ocultar scrollbar cuando el modal está abierto
      document.body.classList.add("overflow-hidden");
    } else {
      // Remover clase cuando el modal se cierra
      document.body.classList.remove("overflow-hidden");
    }

    // Limpiar efecto al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!user) return null;

  // Utilizamos las funciones de utilidad importadas para calcular días y motivo de salida

  const daysLeft = calculateDaysLeft(user.exitDate);

  // Contenido del modal que se reutiliza tanto en mobile como en desktop
  const ModalContentBody = () => (
    <div className="flex flex-col gap-4">
      <UserInfoHeader user={user} />

      <div className="border rounded-lg p-4 pt-2 pb-0 mb-0">
        <h4 className="text-sm font-bold mb-2">Probabilidad de rotación</h4>

        <RiskGauge percentage={user.riskPercentage} emotion={user.emotion} />
      </div>

      <InfoCard
        icon={
          <RemoveUserIcon className="text-default-500" width={20} height={20} />
        }
        title="Probable motivo de salida"
        content={getProbableCause(user.riskPercentage)}
      />

      <InfoCard
        icon={
          <CalendarIcon className="text-default-500" width={20} height={20} />
        }
        title="Fecha estimada de salida"
        content={user.exitDate}
        footer={
          <p className="text-primary-500 font-semibold text-lg">
            En {daysLeft} días
          </p>
        }
      />
    </div>
  );

  // En dispositivos móviles, mostramos el modal completo
  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        classNames={{
          backdrop: "bg-black/50",
          base: "w-full max-w-md",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detalle de predicción
              </ModalHeader>
              <ModalBody>
                <ModalContentBody />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} className="w-full">
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  // En desktop, mostramos el panel a la derecha
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed z-100 top-0 right-0 h-full w-[400px] rounded-l-2xl bg-white dark:bg-default-50 shadow-lg z-50 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-auto`}
      >
        {isOpen && (
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Detalle de predicción</h2>
              <button
                onClick={onClose}
                className="text-default-500 hover:text-default-700"
                aria-label="Cerrar panel"
              >
                <Icon icon="lucide:x" width={24} height={24} />
              </button>
            </div>
            <div className="flex-grow overflow-auto">
              <ModalContentBody />
            </div>
            <div className="mt-4">
              <Button color="primary" onPress={onClose} className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
