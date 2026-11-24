import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Armchair({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10.1707L3 7C3 3.6863 5.6863 1 9 1L15 1C18.3137 1 21 3.6863 21 7L21 10.1707C20.6872 10.0601 20.3506 10 20 10C18.3431 10 17 11.3431 17 13L7 13C7 11.3431 5.6569 10 4 10C3.6494 10 3.3128 10.0601 3 10.1707Z" fill="currentColor" stroke="none"/>
      <path d="M12 21L19 21C21.2092 21 23 19.2092 23 17L23 13C23 11.3431 21.6569 10 20 10C18.3431 10 17 11.3431 17 13L7 13C7 11.3431 5.6569 10 4 10C2.3431 10 1 11.3431 1 13L1 17C1 19.2092 2.7908 21 5 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 20V22M5 20V22"/>
    </svg>
  )
}
