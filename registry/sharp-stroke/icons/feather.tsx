import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Feather({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2434 18.7566L4.4956 12.0266L11.9734 4.54871C12.965 3.5571 14.31 2.9999 15.7124 2.9999C18.6327 2.9999 21.0001 5.3673 21.0001 8.2876C21.0001 9.69 20.443 11.035 19.4513 12.0266L11.9734 19.5044ZM2.7071 21.2929L16.0053 7.9947M9.73007 14.2699L15.694 15.7838M9.73007 14.2699L8.4142 8.10794" fill="none"/>
    </svg>
  )
}
