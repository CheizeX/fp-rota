import * as React from "react";
import { IconBase, IconSvgProps } from "./IconBase";

export const MoonFilledIcon = (props: IconSvgProps) => (
  <IconBase {...props}>
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </IconBase>
);

export const SunFilledIcon = (props: IconSvgProps) => (
  <IconBase {...props}>
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </IconBase>
);

export const HeartFilledIcon = (props: IconSvgProps) => (
  <IconBase {...props}>
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </IconBase>
);

export const SearchIcon = (props: IconSvgProps) => (
  <IconBase fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </IconBase>
);

export const FilterIcon = (props: IconSvgProps) => (
  <IconBase id="Filter" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M13.4951 7.85754H19.1371"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="square"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.51 7.79765C9.51 6.35565 8.333 5.18665 6.88 5.18665C5.428 5.18665 4.25 6.35565 4.25 7.79765C4.25 9.23965 5.428 10.4086 6.88 10.4086C8.333 10.4086 9.51 9.23965 9.51 7.79765Z"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="square"
    ></path>
    <path
      d="M11.0053 17.4708H5.36328"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="square"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9902 17.4095C14.9902 15.9675 16.1672 14.7985 17.6202 14.7985C19.0722 14.7985 20.2502 15.9675 20.2502 17.4095C20.2502 18.8515 19.0722 20.0215 17.6202 20.0215C16.1672 20.0215 14.9902 18.8515 14.9902 17.4095Z"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="square"
    ></path>
  </IconBase>
);

export const DownloadIcon = (props: IconSvgProps) => (
  <IconBase viewBox="0 0 18 16" fill="none" size={20} {...props}>
    <g id="Downlaod">
      <path
        id="Stroke 1"
        d="M9.10183 10.8634L9.10183 0.829224"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Stroke 3"
        d="M11.5318 8.42365L9.1018 10.8636L6.6718 8.42365"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Stroke 4"
        d="M12.9625 4.77332H13.74C15.4358 4.77332 16.81 6.14748 16.81 7.84415V11.9141C16.81 13.6058 15.4392 14.9767 13.7475 14.9767L4.46416 14.9767C2.76833 14.9767 1.39333 13.6016 1.39333 11.9058L1.39333 7.83498C1.39333 6.14415 2.765 4.77332 4.45583 4.77332L5.24083 4.77332"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconBase>
);

export const PDFIcon = (props: IconSvgProps) => (
  <IconBase viewBox="0 0 20 20" fill="none" width={20} height={20} {...props}>
    <path
      d="M16.5259 10.793V7.63395C16.5259 7.18073 16.3505 6.74514 16.0374 6.41866L12.7927 3.03885C12.462 2.69474 12.0046 2.50002 11.527 2.50002H6.69109C4.94537 2.49331 3.51439 3.88401 3.47327 5.62972V10.793"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9401 2.55209V5.02715C11.9392 6.23573 12.917 7.21602 14.1256 7.21853H16.4697"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.68005 16.2265H4.84415C5.55586 16.2265 6.13329 15.6491 6.13329 14.9374C6.13329 14.2265 5.55586 13.6491 4.84415 13.6491H3.68005V17.4947"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5251 13.6458H14.4369V17.5007M16.2041 15.8948H14.4373"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.71179 17.5007C10.223 17.5007 10.7131 17.2976 11.0749 16.9358C11.4365 16.5749 11.6397 16.0848 11.6397 15.5737C11.6397 15.0617 11.4365 14.5716 11.0749 14.2107C10.7131 13.8489 10.223 13.6458 9.71179 13.6458H8.74829V17.5007H9.71179Z"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

export const ExcelIcon = (props: IconSvgProps) => (
  <IconBase viewBox="0 0 20 20" fill="none" width={20} height={20} {...props}>
    <path
      d="M6.55432 14.058V14.7537C6.55432 16.0771 7.38571 17.0187 8.71763 17.0187H15.3432C16.6751 17.0187 17.498 16.0771 17.498 14.7537V5.24362C17.498 3.92018 16.6751 2.97852 15.3432 2.97852H8.71763C7.38571 2.97852 6.55432 3.92018 6.55432 5.24362V5.93926"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.65651 5.94077H8.45967C9.789 5.94077 10.6162 6.87904 10.6162 8.20756V11.791C10.6162 13.1195 9.789 14.0578 8.45967 14.0578H4.65651C3.32714 14.0578 2.5 13.1195 2.5 11.791V8.20756C2.5 6.87904 3.33053 5.94077 4.65651 5.94077Z"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5156 2.98177V12.5554C13.5156 12.9737 13.854 13.3122 14.2723 13.3122H17.4995"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.4978 9.99675H10.6177"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.1416 6.6862H17.4994"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.63391 8.444L5.32639 11.543M5.32556 8.444L7.63308 11.543"
      stroke={"currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

export const RemoveUserIcon = (props: IconSvgProps) => (
  <IconBase viewBox="0 0 24 24" fill="none" width={24} height={24} {...props}>
    <g id="Iconly/Regular/Light/Remove user">
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.566 8.30357C12.566 10.34 10.9151 11.9918 8.87781 11.9918C6.84132 11.9918 5.19043 10.34 5.19043 8.30357C5.19043 6.26709 6.84132 4.61539 8.87781 4.61539C10.9151 4.61539 12.566 6.26709 12.566 8.30357Z"
        stroke={"currentColor"}
        strokeWidth="1.38462"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M19.327 11.8269H15.6724"
        stroke={"currentColor"}
        strokeWidth="1.38462"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.87785 14.6538C5.76206 14.6538 3.10449 15.1249 3.10449 17.0105C3.10449 18.896 5.74689 19.3838 8.87785 19.3838C11.9921 19.3838 14.6512 18.9113 14.6512 17.0272C14.6512 15.1416 12.0096 14.6538 8.87785 14.6538Z"
        stroke={"currentColor"}
        strokeWidth="1.38462"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconBase>
);

export const CalendarIcon = (props: IconSvgProps) => (
  <IconBase viewBox="0 0 24 24" fill="none" width={24} height={24} {...props}>
    <g id="Iconly/Regular/Light/Calendar">
      <path
        id="Vector"
        d="M4.48779 9.66422H20.5293"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M16.1448 3V5.96174"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_3"
        d="M8.87378 3V5.96174"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3184 4.42188H8.69804C6.05446 4.42188 4.4043 5.89399 4.4043 8.59984V16.7456C4.4043 19.4943 6.05446 21.0004 8.69804 21.0004H16.3106C18.962 21.0004 20.6044 19.5205 20.6044 16.8137V8.59984C20.6121 5.89399 18.9698 4.42188 16.3184 4.42188Z"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_5"
        d="M13.0205 16.3918H16.6555"
        stroke={"currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </IconBase>
);
