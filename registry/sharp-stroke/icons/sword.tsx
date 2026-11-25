import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sword({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7322 15.7322L15.9874 4.4771L21.0005 2.9995L19.5229 8.0126L8.2678 19.2678ZM2.7071 13.7071L3 14L10 21L10.2929 21.2929M6.5 17.5L3 21L2.7071 21.2929" fill="none"/>
    </svg>
  )
}
