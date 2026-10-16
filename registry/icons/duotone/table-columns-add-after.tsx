import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableColumnsAddAfter({ size = 24, ...props }: IconProps) {
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
      <path d="M19.8284 5C19.4046 3.8014 18.2713 3 17 3L11 3M11 21L17 21C18.2713 21 19.4046 20.1986 19.8284 19" strokeOpacity="0.4"/>
      <path d="M12 2L12 22L5 22C2.7909 22 1 20.2091 1 18L1 6C1 3.7909 2.7909 2 5 2L12 2Z" fill="currentColor" stroke="none"/>
      <path d="M19 9L19 15M16 12L22 12"/>
    </svg>
  )
}
