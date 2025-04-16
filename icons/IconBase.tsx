import * as React from "react";

export interface IconSvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

interface IconBaseProps extends IconSvgProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const IconBase = ({
  children,
  size = 24,
  width,
  height,
  viewBox = "0 0 24 24",
  ...props
}: IconBaseProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox={viewBox}
    width={size || width}
    {...props}
  >
    {children}
  </svg>
);
