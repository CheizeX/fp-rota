import React, { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  footer?: ReactNode;
}

/**
 * Componente reutilizable para mostrar información con un icono, título y contenido
 * Utilizado en el modal de predicción de rotación
 */
export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  content,
  footer,
}) => {
  return (
    <div className='border rounded-lg p-4 pb-3'>
      <div className='flex items-center gap-3'>
        <div className='rounded-full'>{icon}</div>
        <div>
          <h4 className='text-sm font-bold'>{title}</h4>
          <p>{content}</p>
        </div>
      </div>
      {footer && (
        <>
          <hr className='my-3' />
          <div className='pl-8'>{footer}</div>
        </>
      )}
    </div>
  );
};