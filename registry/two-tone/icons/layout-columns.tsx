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
      <path d="M3 4L5 4C6.1046 4 7 4.8954 7 6L7 18C7 19.1046 6.1046 20 5 20L3 20C1.8954 20 1 19.1046 1 18L1 6C1 4.8954 1.8954 4 3 4ZM19 4L21 4C22.1046 4 23 4.8954 23 6L23 18C23 19.1046 22.1046 20 21 20L19 20C17.8954 20 17 19.1046 17 18L17 6C17 4.8954 17.8954 4 19 4Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 5L5 5C5.5523 5 6 5.4477 6 6L6 18C6 18.5523 5.5523 19 5 19L3 19C2.4477 19 2 18.5523 2 18L2 6C2 5.4477 2.4477 5 3 5ZM19 5L21 5C21.5523 5 22 5.4477 22 6L22 18C22 18.5523 21.5523 19 21 19L19 19C18.4477 19 18 18.5523 18 18L18 6C18 5.4477 18.4477 5 19 5Z" fill="none"/>
      <path d="M11 4L13 4C14.1046 4 15 4.8954 15 6L15 18C15 19.1046 14.1046 20 13 20L11 20C9.8954 20 9 19.1046 9 18L9 6C9 4.8954 9.8954 4 11 4Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
