import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Locate({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12C5 8.134 8.134 5 12 5C15.866 5 19 8.134 19 12Z" fill="currentColor" stroke="none"/>
      <path d="M12 1L12 6M12 23L12 18M1 12L6 12M23 12L18 12" fill="none"/>
    </svg>
  )
}
