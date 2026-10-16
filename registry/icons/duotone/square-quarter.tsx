import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareQuarter({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 6L15.5 6C16.8807 6 18 7.1193 18 8.5L18 12C18 12.5523 17.5523 13 17 13L12 13C11.4477 13 11 12.5523 11 12L11 7C11 6.4477 11.4477 6 12 6Z" fill="currentColor"/>
    </svg>
  )
}
