import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneTakeoff({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7587 15.0745L2 12.1466L3.0186 11.1053L6.0393 12.2978L9.9517 10.0831L4.8801 5.4079L7.3675 4L14.4372 7.5409L16.9659 6.3669C18.7954 5.5155 20.985 6.1836 21.9986 7.9022L8.3839 15.6142C7.1953 16.287 5.69 16.0629 4.7587 15.0745ZM1 20L23 20" fill="none"/>
    </svg>
  )
}
