import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lighthouse({ size = 24, ...props }: IconProps) {
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
      <path d="M9 9L9 5L11.2363 2.3545C11.6358 1.8819 12.3642 1.8819 12.7637 2.3545L15 5L15 9L9 9ZM9 5L15 5M7 9L17 9M9 9L7 22M15 9L17 22M8.3846 13L15.6154 13M7.6923 17.5L16.3077 17.5M4 22L20 22M22 3L20 4M20 14L22 15M21 9L22 9M2 3L4 4M4 14L2 15M3 9L2 9" fill="none"/>
    </svg>
  )
}
