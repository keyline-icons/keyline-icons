import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cursor({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.3184 20.5112L3.0341 3.9139C2.8602 3.3677 3.3816 2.8558 3.9268 3.0373L20.5197 8.5617C21.1361 8.7669 21.1671 9.6243 20.5672 9.8732L13.4774 12.8146C13.3157 12.8817 13.1848 13.0065 13.1107 13.1647L9.6254 20.596C9.3541 21.174 8.5121 21.1195 8.3184 20.5112Z" fill="currentColor" stroke="none"/>
      <path d="M8.3184 20.5112L3.0341 3.9139C2.8602 3.3677 3.3816 2.8558 3.9268 3.0373L20.5197 8.5617C21.1361 8.7669 21.1671 9.6243 20.5672 9.8732L13.4774 12.8146C13.3157 12.8817 13.1848 13.0065 13.1107 13.1647L9.6254 20.596C9.3541 21.174 8.5121 21.1195 8.3184 20.5112Z"/>
    </svg>
  )
}
