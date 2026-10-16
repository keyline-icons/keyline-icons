import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FullscreenExit({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10L14.5 10C14.2239 10 14 9.7761 14 9.5L14 3M14.6 9.4L21 3" strokeOpacity="0.4"/>
      <path d="M3 14L9.5 14C9.7761 14 10 14.2239 10 14.5L10 21M9.4 14.6L3 21"/>
    </svg>
  )
}
