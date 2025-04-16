import * as React from "react";

interface IconSvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const SuccessCircleIcon = ({
  size = 7,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 7 7"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="3.5" cy="3.5" fill="#17C964" r="3.5" />
  </svg>
);

export const DangerCircleIcon = ({
  size = 7,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 7 7"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="3.5" cy="3.5" fill="#F31260" r="3.5" />
  </svg>
);

export const DefaultCircleIcon = ({
  size = 7,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 7 7"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="3.5" cy="3.5" fill="#889096" r="3.5" />
  </svg>
);

export const WarningCircleIcon = ({
  size = 7,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 7 7"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="3.5" cy="3.5" fill="#F5A524" r="3.5" />
  </svg>
);

export const TableArrowUpIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 13.5H2.5V2.5H13.5V13.5ZM2 14C1.72386 14 1.5 13.7761 1.5 13.5V2.5C1.5 2.22386 1.72386 2 2 2H13.5C13.7761 2 14 2.22386 14 2.5V13.5C14 13.7761 13.7761 14 13.5 14H2Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.64645 8.14645C4.45118 8.34171 4.45118 8.65829 4.64645 8.85355C4.84171 9.04882 5.15829 9.04882 5.35355 8.85355L8 6.20711L10.6464 8.85355C10.8417 9.04882 11.1583 9.04882 11.3536 8.85355C11.5488 8.65829 11.5488 8.34171 11.3536 8.14645L8.35355 5.14645Z"
      fill="currentColor"
    />
  </svg>
);

export const TableArrowDownIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 13.5H2.5V2.5H13.5V13.5ZM2 14C1.72386 14 1.5 13.7761 1.5 13.5V2.5C1.5 2.22386 1.72386 2 2 2H13.5C13.7761 2 14 2.22386 14 2.5V13.5C14 13.7761 13.7761 14 13.5 14H2Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.64645 10.8536C7.84171 11.0488 8.15829 11.0488 8.35355 10.8536L11.3536 7.85355C11.5488 7.65829 11.5488 7.34171 11.3536 7.14645C11.1583 6.95118 10.8417 6.95118 10.6464 7.14645L8 9.79289L5.35355 7.14645C5.15829 6.95118 4.84171 6.95118 4.64645 7.14645C4.45118 7.34171 4.45118 7.65829 4.64645 7.85355L7.64645 10.8536Z"
      fill="currentColor"
    />
  </svg>
);

export const TableEyeIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.94324 8C2.36275 6.8592 2.93816 5.78538 3.64986 4.81231C5.00586 2.99539 6.72055 2 8.00005 2C9.27955 2 10.9942 2.99539 12.3502 4.81231C13.0619 5.78538 13.6373 6.8592 14.0568 8C13.6373 9.1408 13.0619 10.2146 12.3502 11.1877C10.9942 13.0046 9.27955 14 8.00005 14C6.72055 14 5.00586 13.0046 3.64986 11.1877C2.93816 10.2146 2.36275 9.1408 1.94324 8ZM8.00005 0.5C6.22103 0.5 4.08041 1.79487 2.52088 3.89372C1.75811 4.92567 1.1492 6.06791 0.707831 7.28363C0.513728 7.82302 0.513728 8.17698 0.707831 8.71637C1.1492 9.93209 1.75811 11.0743 2.52088 12.1063C4.08041 14.2051 6.22103 15.5 8.00005 15.5C9.77907 15.5 11.9197 14.2051 13.4792 12.1063C14.242 11.0743 14.8509 9.93209 15.2923 8.71637C15.4864 8.17698 15.4864 7.82302 15.2923 7.28363C14.8509 6.06791 14.242 4.92567 13.4792 3.89372C11.9197 1.79487 9.77907 0.5 8.00005 0.5Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
      fill="currentColor"
    />
  </svg>
);

export const TableEditIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1412 0.571379C10.9633 0.393477 10.718 0.292976 10.4623 0.292976C10.2067 0.292976 9.96134 0.393477 9.78344 0.571379L8.59033 1.76449L2.64303 7.7118C2.53902 7.8158 2.46526 7.94555 2.42896 8.08719L1.57685 11.4926C1.53342 11.6642 1.56528 11.8461 1.66414 11.992C1.76301 12.138 1.91874 12.2348 2.09225 12.2612C2.126 12.2658 2.16003 12.2681 2.19414 12.2681C2.33043 12.2681 2.46399 12.233 2.58179 12.1667C2.67369 12.1152 2.75535 12.0474 2.82075 11.9673L8.59033 6.19773L11.1412 3.64686L12.3343 2.45375C12.4229 2.36514 12.4926 2.25911 12.5389 2.14186C12.5853 2.0246 12.6072 1.89881 12.6034 1.77254C12.5996 1.64626 12.57 1.52206 12.5165 1.40798C12.463 1.29389 12.387 1.19256 12.2927 1.10987L11.1412 0.571379ZM10.1059 1.86299L11.0356 2.09185L9.7825 3.34499L8.85279 2.41528L10.1059 1.86299ZM7.99659 3.27148L9.34039 4.61529L3.57081 10.385L2.95876 8.74938L7.99659 3.27148ZM2.86099 11.4458L3.26296 10.0338L3.73334 10.2113L3.31994 11.0321L2.86099 11.4458Z"
      fill="currentColor"
    />
    <path
      d="M1.34549 14C1.15438 14 0.999992 14.1544 0.999992 14.3455C0.999992 14.5366 1.15438 14.691 1.34549 14.691H14.6545C14.8456 14.691 15 14.5366 15 14.3455C15 14.1544 14.8456 14 14.6545 14H1.34549Z"
      fill="currentColor"
    />
  </svg>
);

export const TableDeleteIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.5 0.5C5.94772 0.5 5.5 0.947715 5.5 1.5V2.5H2.5C2.22386 2.5 2 2.72386 2 3C2 3.27614 2.22386 3.5 2.5 3.5H13.5C13.7761 3.5 14 3.27614 14 3C14 2.72386 13.7761 2.5 13.5 2.5H10.5V1.5C10.5 0.947715 10.0523 0.5 9.5 0.5H6.5ZM9.5 2.5V1.5H6.5V2.5H9.5Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5 5.5C11.7761 5.5 12 5.72386 12 6V12C12 12.8284 11.3284 13.5 10.5 13.5H5.5C4.67157 13.5 4 12.8284 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5H11.5ZM11 6.5H5V12C5 12.2761 5.22386 12.5 5.5 12.5H10.5C10.7761 12.5 11 12.2761 11 12V6.5Z"
      fill="currentColor"
    />
    <path
      d="M6.5 8C6.77614 8 7 8.22386 7 8.5V10.5C7 10.7761 6.77614 11 6.5 11C6.22386 11 6 10.7761 6 10.5V8.5C6 8.22386 6.22386 8 6.5 8Z"
      fill="currentColor"
    />
    <path
      d="M9.5 8C9.77614 8 10 8.22386 10 8.5V10.5C10 10.7761 9.77614 11 9.5 11C9.22386 11 9 10.7761 9 10.5V8.5C9 8.22386 9.22386 8 9.5 8Z"
      fill="currentColor"
    />
  </svg>
);

export const TableCopyTextIcon = ({
  size = 16,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 4.5C11 2.84315 9.65685 1.5 8 1.5C6.34315 1.5 5 2.84315 5 4.5C5 6.15685 6.34315 7.5 8 7.5C9.65685 7.5 11 6.15685 11 4.5ZM8 0C5.51472 0 3.5 2.01472 3.5 4.5C3.5 5.93411 4.14056 7.20777 5.14997 8.04665C2.39055 8.95871 0.5 11.5 0.5 14.5C0.5 14.7761 0.723858 15 1 15C1.27614 15 1.5 14.7761 1.5 14.5C1.5 11.7386 3.73858 9.5 7 9.5H9C12.2614 9.5 14.5 11.7386 14.5 14.5C14.5 14.7761 14.7239 15 15 15C15.2761 15 15.5 14.7761 15.5 14.5C15.5 11.5 13.6094 8.95871 10.85 8.04665C11.8594 7.20777 12.5 5.93411 12.5 4.5C12.5 2.01472 10.4853 0 8 0Z"
      fill="currentColor"
    />
  </svg>
);
