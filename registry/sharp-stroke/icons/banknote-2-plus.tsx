import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Banknote2Plus({ size = 24, ...props }: IconProps) {
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
      <path d="M22 13L22 2L2 2L2 16L13 16M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.8954 10.8954 7 12 7C13.1046 7 14 7.8954 14 9ZM18 2C18 3.3333 18.8 6 22 6M6 16C6 14.6667 5.2 12 2 12M6 2C6 3.3333 5.2 6 2 6M19 15L19 23M23 19L15 19"/>
    </svg>
  )
}
