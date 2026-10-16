import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePoundSterling({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2Z" fill="none"/>
      <path d="M10 19L10 18L10 8C10 6.8954 10.8954 6 12 6C13.1046 6 14 6.8954 14 8C14 8.3511 13.9076 8.696 13.7321 9L13.4434 9.5M7.5 14L8.5 14L14 14L15 14M7.5 18L8.5 18L15.5 18L16.5 18" fill="none"/>
    </svg>
  )
}
