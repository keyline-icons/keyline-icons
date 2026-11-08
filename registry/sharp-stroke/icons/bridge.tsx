import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bridge({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3V7M6 7V16M6 7C7 9.5 9.5 11 12 11M6 7C5 8.5 4 9.5 2 10L1.243 10.189M6 16V21M6 16H1M6 16H12M12 11C14.5 11 17 9.5 18 7M12 11V16M12 16H18M18 7V3M18 7V16M18 7C19 8.5 20 9.5 22 10L22.757 10.189M18 16V21M18 16H23"/>
    </svg>
  )
}
