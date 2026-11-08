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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.3486 20.73C16.0147 22.06 14.8151 23 13.4385 23H10.5615C9.1849 23 7.9853 22.06 7.6514 20.73L6.0295 14.24C5.8717 13.61 6.349 13 6.9996 13H16.9995C17.6501 13 18.1275 13.61 17.9697 14.24L16.3486 20.73ZM16 1C16.5523 1 17 1.45 17 2C17 2.55 16.5523 3 16 3H13.6182L12.6182 5H16C16.9443 5 17.8338 5.44 18.4004 6.2L19.5996 7.8C19.8591 8.15 20 8.57 20 9C20 10.07 19.1615 10.94 18.1064 10.99C18.0715 11 18.036 11 18 11H6C5.9637 11 5.9279 11 5.8926 10.99C4.838 10.94 4 10.07 4 9C4 8.57 4.1409 8.15 4.4004 7.8L5.5996 6.2C6.1662 5.44 7.0557 5 8 5H10.3818L11.8291 2.11C12.1679 1.43 12.8607 1 13.6182 1H16Z" fill="currentColor"/>
    </svg>
  )
}
