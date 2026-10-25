import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flashlight({ size = 24, ...props }: IconProps) {
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
      <path d="M9 12L13 12M17 7L17 17M2 16L9.76393 16C11.2344 16 12.6847 16.3424 14 17C15.3153 17.6576 16.7656 18 18.2361 18L22 18L22 6L18.2361 6C16.7656 6 15.3153 6.34237 14 7C12.6847 7.65763 11.2344 8 9.76393 8L2 8Z" fill="none"/>
    </svg>
  )
}
