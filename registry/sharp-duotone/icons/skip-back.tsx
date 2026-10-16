import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SkipBack({ size = 24, ...props }: IconProps) {
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
      <path d="M18.4449 19.8318L7.9557 12.8318C7.3625 12.4359 7.3625 11.5641 7.9557 11.1682L18.4449 4.1682C19.1094 3.7247 20 4.2011 20 5L20 19C20 19.7989 19.1094 20.2753 18.4449 19.8318Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 4L5 20"/>
    </svg>
  )
}
