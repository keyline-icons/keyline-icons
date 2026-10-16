import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubes({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L8 1C9.1046 1 10 1.8954 10 3L10 19C10 21.2091 8.2091 23 6 23C3.7909 23 2 21.2091 2 19L2 3C2 1.8954 2.8954 1 4 1ZM4 3L4 12L8 12L8 3L4 3ZM16 1L20 1C21.1046 1 22 1.8954 22 3L22 19C22 21.2091 20.2091 23 18 23C15.7909 23 14 21.2091 14 19L14 3C14 1.8954 14.8954 1 16 1ZM16 3L16 15L20 15L20 3L16 3Z" fill="currentColor" stroke="none"/>
      <path d="M2 2L10 2M14 2L22 2" fill="none"/>
    </svg>
  )
}
