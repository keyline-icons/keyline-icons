import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareThreeQuarter({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3L18 3C19.6569 3 21 4.3431 21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6C3 4.3431 4.3431 3 6 3Z"/>
      <path d="M12 6L15.5 6C16.8807 6 18 7.1193 18 8.5L18 15.5C18 16.8807 16.8807 18 15.5 18L8.5 18C7.1193 18 6 16.8807 6 15.5L6 12C6 11.4477 6.4477 11 7 11L11 11L11 7C11 6.4477 11.4477 6 12 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
