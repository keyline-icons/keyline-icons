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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.2732 12.6667L17.2546 9.3333C17.4444 9.1212 17.7154 9 18 9C18.2846 9 18.5556 9.1212 18.7454 9.3333L21.7268 12.6667C22.5467 13.5834 23 14.7701 23 16C23 18.7614 20.7614 21 18 21C15.2386 21 13 18.7614 13 16C13 14.7701 13.4533 13.5834 14.2732 12.6667Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.0186 13.3333L18 10L20.9814 13.3333C21.6374 14.0667 22 15.0161 22 16C22 18.2091 20.2091 20 18 20C15.7909 20 14 18.2091 14 16C14 15.0161 14.3626 14.0667 15.0186 13.3333ZM1.6 5.3L2 5C2.8655 4.3509 3.9181 4 5 4C6.0819 4 7.1345 4.3509 8 5C8.8655 5.6491 9.9181 6 11 6C12.0819 6 13.1345 5.6491 14 5C14.8655 4.3509 15.9181 4 17 4C18.0819 4 19.1345 4.3509 20 5L20.8 5.6M1.6 10.3L2 10C2.8655 9.3509 3.9181 9 5 9C6.0819 9 7.1345 9.3509 8 10C8.8655 10.6491 9.9181 11 11 11C11.2673 11 11.5342 10.9786 11.7981 10.9359L12.7853 10.7763M1.6 15.3L2 15C2.8655 14.3509 3.9181 14 5 14C6.0819 14 7.1345 14.3509 8 15C8.5921 15.4441 9.2754 15.7512 10.0006 15.8991L10.9805 16.099"/>
    </svg>
  )
}
