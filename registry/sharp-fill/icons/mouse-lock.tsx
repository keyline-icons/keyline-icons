import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MouseLock({ size = 24, ...props }: IconProps) {
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
      <path d="M7.2 18.6C6.4211 17.5614 6 16.2982 6 15L6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9M12 6L12 9M11 16L18 16L18 21L11 21ZM12.5 16L12.5 14C12.5 12.8954 13.3954 12 14.5 12C15.6046 12 16.5 12.8954 16.5 14L16.5 16" fill="none"/>
    </svg>
  )
}
