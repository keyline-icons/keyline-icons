import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M6.5 4L13.5 4C13.7761 4 14 4.2239 14 4.5L14 9.5C14 9.7761 13.7761 10 13.5 10L6.5 10C6.2239 10 6 9.7761 6 9.5L6 4.5C6 4.2239 6.2239 4 6.5 4ZM10.5 14L17.5 14C17.7761 14 18 14.2239 18 14.5L18 19.5C18 19.7761 17.7761 20 17.5 20L10.5 20C10.2239 20 10 19.7761 10 19.5L10 14.5C10 14.2239 10.2239 14 10.5 14ZM2 7L6 7M14 7L22 7M2 17L10 17M18 17L22 17"/>
    </svg>
  )
}
