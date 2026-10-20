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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 4L6 4C6.5523 4 7 4.4477 7 5L7 19C7 19.5523 6.5523 20 6 20L2 20C1.4477 20 1 19.5523 1 19L1 5C1 4.4477 1.4477 4 2 4ZM18 4L22 4C22.5523 4 23 4.4477 23 5L23 19C23 19.5523 22.5523 20 22 20L18 20C17.4477 20 17 19.5523 17 19L17 5C17 4.4477 17.4477 4 18 4Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 5L6 5L6 19L2 19ZM18 5L22 5L22 19L18 19Z" fill="none"/>
      <path d="M10 4L14 4C14.5523 4 15 4.4477 15 5L15 19C15 19.5523 14.5523 20 14 20L10 20C9.4477 20 9 19.5523 9 19L9 5C9 4.4477 9.4477 4 10 4Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
