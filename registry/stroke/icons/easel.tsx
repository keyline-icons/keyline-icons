import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Easel({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3L18 3C19.1046 3 20 3.8954 20 5L20 16L4 16L4 5C4 3.8954 4.8954 3 6 3ZM2 16L22 16M8 16L6.5 21M16 16L17.5 21M12 16L12 19" fill="none"/>
    </svg>
  )
}
