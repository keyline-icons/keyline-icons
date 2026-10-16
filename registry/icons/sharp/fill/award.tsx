import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Award({ size = 24, ...props }: IconProps) {
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
      <path d="M19 9C19 12.866 15.866 16 12 16C8.134 16 5 12.866 5 9C5 5.134 8.134 2 12 2C15.866 2 19 5.134 19 9Z" fill="currentColor" stroke="none"/>
      <path d="M19 9C19 12.866 15.866 16 12 16C8.134 16 5 12.866 5 9C5 5.134 8.134 2 12 2C15.866 2 19 5.134 19 9ZM16.1787 14.6159L19 22L12 19.2077L5 22L7.8213 14.6159"/>
    </svg>
  )
}
