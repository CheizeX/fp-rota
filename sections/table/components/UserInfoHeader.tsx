import React from "react";
import { Avatar } from "@fichap-team/fichapui";
import { UserType } from "../table.types";

interface UserInfoHeaderProps {
  user: UserType;
}

/**
 * Componente para mostrar la información básica del usuario en el encabezado del modal
 */
export const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({ user }) => {
  return (
    <div className='flex items-center gap-4'>
      <Avatar src={user.avatar} name={user.name} />
      <div>
        <h3 className='font-semibold'>{user.name}</h3>
        <p className='text-default-500'>ID: {user.id}</p>
      </div>
    </div>
  );
};