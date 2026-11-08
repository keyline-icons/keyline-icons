import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function JerryCan({ size = 24, ...props }: IconProps) {
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
      <path d="M13.001 6V2H19.001V6M2.516 6.29L8.487 2.71M10.001 13V17M10.001 13H14.001M10.001 13L8.708 11.71M10.001 17H14.001M10.001 17L8.708 18.29M14.001 13V17M14.001 13L15.294 11.71M14.001 17L15.294 18.29M21.001 6V22H3.001V11L11.001 6H21.001Z"/>
    </svg>
  )
}
