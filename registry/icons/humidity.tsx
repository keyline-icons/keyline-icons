import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Humidity({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.8 13.6L17.2 10.4C17.6 9.8667 18.4 9.8667 18.8 10.4L21.2 13.6C21.7193 14.2924 22 15.1345 22 16C22 18.2091 20.2091 20 18 20C15.7909 20 14 18.2091 14 16C14 15.1345 14.2807 14.2924 14.8 13.6ZM2 5C2.8655 4.3509 3.9181 4 5 4C6.0819 4 7.1345 4.3509 8 5C8.8655 5.6491 9.9181 6 11 6C12.0819 6 13.1345 5.6491 14 5C14.8655 4.3509 15.9181 4 17 4C18.0819 4 19.1345 4.3509 20 5M2 10C2.8655 9.3509 3.9181 9 5 9C6.0819 9 7.1345 9.3509 8 10C8.8655 10.6491 9.9181 11 11 11C11.2673 11 11.5342 10.9786 11.7981 10.9359M2 15C2.8655 14.3509 3.9181 14 5 14C6.0819 14 7.1345 14.3509 8 15C8.5921 15.4441 9.2754 15.7512 10.0006 15.8991"/>
    </svg>
  )
}
