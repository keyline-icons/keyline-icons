import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GraduationCap({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5L22 9L12 13L2 9L12 5ZM6 10.6L6 16.7901C7.6737 18.2165 9.8009 19 12 19C14.1991 19 16.3263 18.2165 18 16.7901L18 10.6M2 9L2 16" fill="none"/>
    </svg>
  )
}
