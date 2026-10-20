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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22.7071 22.7071C22.5198 22.8949 22.2653 23.0003 22 23L8 23C7.4477 23 7 22.5523 7 22L7 8C6.9997 7.7347 7.1051 7.4802 7.2929 7.2929L22.7071 22.7071ZM10.6569 7L22 7C22.5523 7 23 7.4477 23 8L23 19.3431L10.6569 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L2 16.0001L5 16M16 5L16.0001 2L6.6569 2M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
