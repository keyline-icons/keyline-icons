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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 15C2.9123 14.0421 4.1772 13.5 5.5 13.5C6.8228 13.5 7.5877 14.0421 8.5 15C9.4123 15.9579 10.6772 16.5 12 16.5C13.3228 16.5 14.5877 15.9579 15.5 15C16.4123 14.0421 18.1772 13.5 19.5 13.5C20.4 13.5 21.3 13.75 22 14.2M2 20.5C2.9123 19.5421 4.1772 19 5.5 19C6.8228 19 7.5877 19.5421 8.5 20.5C9.4123 21.4579 10.6772 22 12 22C13.3228 22 14.5877 21.4579 15.5 20.5C16.4123 19.5421 18.1772 19 19.5 19C20.4 19 21.3 19.25 22 19.7" fill="none" strokeOpacity="0.4"/>
      <path d="M20.5 9.5L22 9.5M3.5 9.5L2 9.5M6.4896 5.4896L5.4289 4.4289M12 3.5L12 2M17.5104 5.4896L18.5711 4.4289M8.0143 9.9109C8.8086 8.3956 10.3934 7.4617 12.1038 7.5012C13.8142 7.5407 15.3542 8.5466 16.0778 10.0969" fill="none"/>
    </svg>
  )
}
