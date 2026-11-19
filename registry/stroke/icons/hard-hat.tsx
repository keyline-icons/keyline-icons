import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HardHat({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17C2.8954 17 2 17.8954 2 19C2 20.1046 2.8954 21 4 21H20C21.1046 21 22 20.1046 22 19C22 17.8954 21.1046 17 20 17M4 17V13C4 9.2723 6.54953 6.14011 10 5.25203M4 17H10M20 17V13C20 9.2723 17.4505 6.14011 14 5.25203M20 17H14M10 17H14M10 17V5.25203M14 17V5.25203M10 5.25203V5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5V5.25203" fill="none"/>
    </svg>
  )
}
