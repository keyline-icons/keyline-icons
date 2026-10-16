import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandCoins({ size = 24, ...props }: IconProps) {
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
      <path d="M21 4.5C21 5.8807 19.8807 7 18.5 7C17.1193 7 16 5.8807 16 4.5C16 3.1193 17.1193 2 18.5 2C19.8807 2 21 3.1193 21 4.5ZM8.5 5.5C8.5 6.8807 7.3807 8 6 8C4.6193 8 3.5 6.8807 3.5 5.5C3.5 4.1193 4.6193 3 6 3C7.3807 3 8.5 4.1193 8.5 5.5ZM3 13L3 23M3 16.3L6.9326 12.7441C8.0716 11.7143 9.6664 11.35 11.171 11.6582L13.255 12.085M10.8771 14.4629L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14L12 19L5 19L3 21" fill="none"/>
    </svg>
  )
}
