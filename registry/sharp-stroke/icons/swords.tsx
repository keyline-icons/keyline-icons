import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Swords({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7322 15.7322L15.9874 4.4771L21.0005 2.9995L19.5229 8.0126L8.2678 19.2678ZM2.7071 13.7071L3 14L10 21L10.2929 21.2929M6.5 17.5L3 21L2.7071 21.2929M9.4645 5.9289L9.1716 5.636L8.0125 4.477L2.9995 2.9995L4.477 8.0125L5.636 9.1716L5.9289 9.4645M15.5355 12L19.2678 15.7322L15.7322 19.2678L12 15.5355M21.2929 13.7071L21 14L14 21L13.7071 21.2929M17.5 17.5L21 21L21.2929 21.2929" fill="none"/>
    </svg>
  )
}
