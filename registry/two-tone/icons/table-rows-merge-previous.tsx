import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableRowsMergePrevious({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22L18 22C20.2091 22 22 20.2091 22 18L22 6C22 3.7909 20.2091 2 18 2L6 2C3.7909 2 2 3.7909 2 6L2 18C2 20.2091 3.7909 22 6 22ZM3 17L21 17L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 21L18 21C19.6569 21 21 19.6569 21 18L21 6C21 4.3431 19.6569 3 18 3L6 3C4.3431 3 3 4.3431 3 6L3 18C3 19.6569 4.3431 21 6 21ZM3 17L21 17M3 8L5 8M21 8L19 8M12 13L12 7M9 10L12 7L15 10"/>
    </svg>
  )
}
