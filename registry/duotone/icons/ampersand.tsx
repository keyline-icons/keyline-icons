import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ampersand({ size = 24, ...props }: IconProps) {
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
      <path d="M18 12C18 16.9706 13.9706 21 9 21C6.2386 21 4 18.7614 4 16C4 13.8636 5.3574 11.9632 7.3784 11.2703L11.6351 9.8108C13.0498 9.3258 14 7.9955 14 6.5C14 4.567 12.433 3 10.5 3C8.567 3 7 4.567 7 6.5C7 7.4257 7.3667 8.3137 8.02 8.9697L20 21" fill="none"/>
    </svg>
  )
}
