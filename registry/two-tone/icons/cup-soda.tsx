import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CupSoda({ size = 24, ...props }: IconProps) {
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
      <path d="M20 9C20 9.81 19.5175 10.5 18.8252 10.82L16.3486 20.73C16.0147 22.06 14.8151 23 13.4385 23H10.5615C9.1849 23 7.9853 22.06 7.6514 20.73L5.1738 10.82C4.482 10.5 4 9.81 4 9C4 8.57 4.1409 8.15 4.4004 7.8L5.5996 6.2C6.1662 5.44 7.0557 5 8 5H10.3818L11.8291 2.11C12.1679 1.43 12.8607 1 13.6182 1H16C16.5523 1 17 1.45 17 2C17 2.55 16.5523 3 16 3H13.6182L12.6182 5H16C16.9443 5 17.8338 5.44 18.4004 6.2L19.5996 7.8C19.8591 8.15 20 8.57 20 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10H18M6 10C5.4477 10 5 9.55 5 9C5 8.78 5.0702 8.57 5.2 8.4L6.4 6.8C6.7777 6.3 7.3705 6 8 6H16C16.6295 6 17.2223 6.3 17.6 6.8L18.8 8.4C18.9298 8.57 19 8.78 19 9C19 9.55 18.5523 10 18 10M6 10L8.6213 20.49C8.8439 21.38 9.6438 22 10.5616 22H13.4384C14.3562 22 15.1561 21.38 15.3787 20.49L18 10M11 6L12.7236 2.55C12.893 2.21 13.2393 2 13.618 2H16"/>
    </svg>
  )
}
