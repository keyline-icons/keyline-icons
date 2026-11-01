import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CookingPotOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4 11L4 18C4 19.6569 5.3431 21 7 21L17 21C18.0847 21 19.035 20.4244 19.5619 19.5619M2 11L11 11M4 7L7 7M20 14.3431L20 11M16.6569 11L22 11M12.6569 7L20 7M9.2325 3.5757C9.7282 3.2137 10.3392 3 11 3L13 3C14.6569 3 16 4.3431 16 6L16 7M2 2L22 22" fill="none"/>
    </svg>
  )
}
