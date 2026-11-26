import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardLock({ size = 24, ...props }: IconProps) {
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
      <path d="M12 17L12 20C12 20.5523 11.5523 21 11 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3L22 3C22.5523 3 23 3.4477 23 4L23 7C23 7.5523 22.5523 8 22 8L12 8L12 15L7 15L7 17ZM5 7L5 9L7 9L7 7ZM9 7L9 9L11 9L11 7ZM5 11L5 13L7 13L7 11ZM9 11L9 13L11 13L11 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 15L22 15L22 20L15 20ZM16.5 15L16.5 13C16.5 11.8954 17.3954 11 18.5 11C19.6046 11 20.5 11.8954 20.5 13L20.5 15"/>
    </svg>
  )
}
