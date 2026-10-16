import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SkipForward({ size = 24, ...props }: IconProps) {
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
      <path d="M5.5551 4.1682L16.0443 11.1682C16.6375 11.5641 16.6375 12.4359 16.0443 12.8318L5.5551 19.8318C4.8906 20.2753 4 19.7989 4 19L4 5C4 4.2011 4.8906 3.7247 5.5551 4.1682Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 4L19 20"/>
    </svg>
  )
}
