import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyOff({ size = 24, ...props }: IconProps) {
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
      <path d="M2.8787 2.8787C2.3358 3.4216 2 4.1716 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284M15.8284 4C15.4046 2.8015 14.2714 2 13 2L7.6569 2M21.1213 21.1213C20.5784 21.6642 19.8284 22 19 22L11 22C9.3432 22 8 20.6568 8 19L8 11C8 10.1716 8.3358 9.4216 8.8787 8.8787M13.6569 8L19 8C20.6568 8 22 9.3432 22 11L22 16.3431M2 2L22 22" fill="none"/>
    </svg>
  )
}
