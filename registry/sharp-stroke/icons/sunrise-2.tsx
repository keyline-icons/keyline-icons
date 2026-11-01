import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sunrise2({ size = 24, ...props }: IconProps) {
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
      <path d="M1.7241 15.2897L2 15C2.9123 14.0421 4.1772 13.5 5.5 13.5C6.8228 13.5 7.5877 14.0421 8.5 15C9.4123 15.9579 10.6772 16.5 12 16.5C13.3228 16.5 14.5877 15.9579 15.5 15C16.4123 14.0421 18.1772 13.5 19.5 13.5C20.4 13.5 21.3 13.75 22 14.2L22.4592 14.4952M1.7241 20.7897L2 20.5C2.9123 19.5421 4.1772 19 5.5 19C6.8228 19 7.5877 19.5421 8.5 20.5C9.4123 21.4579 10.6772 22 12 22C13.3228 22 14.5877 21.4579 15.5 20.5C16.4123 19.5421 18.1772 19 19.5 19C20.4 19 21.3 19.25 22 19.7L22.4592 19.9952M19.5 9.5L23 9.5M4.5 9.5L1 9.5M6.7825 5.7825L5.136 4.136M12 4.5L12 1M17.2175 5.7825L18.864 4.136M16.5 12C16.5 14.4854 14.4854 16.5 12 16.5C9.5147 16.5 7.5 14.4854 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4854 7.5 16.5 9.5147 16.5 12Z" fill="none"/>
    </svg>
  )
}
