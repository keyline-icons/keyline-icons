import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircuitBoard({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12L19 19C19 21.2092 17.2092 23 15 23L5 23C2.7908 23 1 21.2092 1 19L1 5C1 2.7908 2.7908 1 5 1L15 1C17.2092 1 19 2.7908 19 5ZM10 5L7 5C5.8954 5 5 5.8954 5 7L5 12C5 13.1046 5.8954 14 7 14L13 14C14.1046 14 15 13.1046 15 12L15 7C15 5.8954 14.1046 5 13 5ZM6 17C5.4477 17 5 17.4477 5 18C5 18.5523 5.4477 19 6 19L10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17ZM15 18C15 17.4477 14.5523 17 14 17C13.4477 17 13 17.4477 13 18C13 18.5523 13.4477 19 14 19C14.5523 19 15 18.5523 15 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M18 7H22M18 12H22M18 17H22"/>
    </svg>
  )
}
