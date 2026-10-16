import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableColumnsRemoveBefore({ size = 24, ...props }: IconProps) {
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
      <path d="M4.1716 19C4.5954 20.1986 5.7287 21 7 21L13 21M13 3L7 3C5.7287 3 4.5954 3.8014 4.1716 5" strokeOpacity="0.4"/>
      <path d="M12 22L12 2L19 2C21.2091 2 23 3.7909 23 6L23 18C23 20.2091 21.2091 22 19 22L12 22Z" fill="currentColor" stroke="none"/>
      <path d="M2 9L8 15M8 9L2 15"/>
    </svg>
  )
}
