import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Waves2({ size = 24, ...props }: IconProps) {
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
      <path d="M1.7241 17.7897L2 17.5C2.9123 16.5421 4.1772 16 5.5 16C6.8228 16 8.0877 16.5421 9 17.5C9.9123 18.4579 11.1772 19 12.5 19C13.8228 19 15.0877 18.4579 16 17.5C16.9123 16.5421 18.1772 16 19.5 16C20.4 16 21.3 16.25 22 16.7L22.4592 16.9952" fill="none"/>
      <path d="M2 13L2 12C2 8.134 5.134 5 9 5C7.8 6.2 7.4 8 8 9.6C8.7 11.4 10.5 12.5 12.5 12.5C13.8228 12.5 15.0877 11.9579 16 11C16.9123 10.0421 18.1772 9.5 19.5 9.5C20.4 9.5 21.3 9.75 22 10.2L22.4592 10.4952" fill="none" strokeOpacity="0.4"/>
    </svg>
  )
}
