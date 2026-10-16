import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeadphonesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12C3 10.8954 3.8954 10 5 10L7 10L7 21L5 21C3.8954 21 3 20.1046 3 19L3 12ZM17 12.3431L17 10L19 10C20.1046 10 21 10.8954 21 12L21 16.3431M20.4142 20.4142C20.0523 20.7761 19.5523 21 19 21L17 21L17 17M3 12C3 9.5147 4.0074 7.2647 5.636 5.636M8.1779 3.788L9.1256 3.4688C10.0282 3.1648 10.9949 3 12 3C16.9706 3 21 7.0294 21 12M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
