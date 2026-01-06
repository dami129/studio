import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 10.5c-3.22.9-5.13 4.24-4 7.5 1.13 3.27 4.56 5.23 7.5 4 2.95-1.23 4.82-4.24 4-7.5-1.13-3.27-4.56-5.23-7.5-4Z" />
      <path d="M14 3v9" />
      <path d="M14 3h2" />
      <path d="M18 3h2" />
      <path d="M17 9v5.5a3.5 3.5 0 0 1-7 0V9" />
    </svg>
  ),
};
