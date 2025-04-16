import React, { forwardRef, memo } from "react";
import { cn } from "@fichap-team/fichapui";
import { STATUS_COLORS_MAP } from "@/data/tableData";
import { StatusOptionsType } from "@/types/table";

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  status: StatusOptionsType;
}

export const Status = memo(
  forwardRef<HTMLDivElement, StatusProps>((props, forwardedRef) => {
    const { className, status } = props;
    const IconComponent = STATUS_COLORS_MAP[status];

    return (
      <div
        ref={forwardedRef}
        className={cn(
          "flex w-fit items-center gap-[2px] rounded-full border border-default-100 px-2 py-1",
          className
        )}
      >
        <IconComponent />
        <span className="px-1 text-default-800">{status}</span>
      </div>
    );
  })
);

Status.displayName = "Status";
