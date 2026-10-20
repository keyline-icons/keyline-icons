import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayoutColumns({ size = 24, ...props }: IconProps) {
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
      <path d="M3 5L5 5C5.5523 5 6 5.4477 6 6L6 18C6 18.5523 5.5523 19 5 19L3 19C2.4477 19 2 18.5523 2 18L2 6C2 5.4477 2.4477 5 3 5ZM11 5L13 5C13.5523 5 14 5.4477 14 6L14 18C14 18.5523 13.5523 19 13 19L11 19C10.4477 19 10 18.5523 10 18L10 6C10 5.4477 10.4477 5 11 5ZM19 5L21 5C21.5523 5 22 5.4477 22 6L22 18C22 18.5523 21.5523 19 21 19L19 19C18.4477 19 18 18.5523 18 18L18 6C18 5.4477 18.4477 5 19 5Z" fill="none"/>
    </svg>
  )
}
