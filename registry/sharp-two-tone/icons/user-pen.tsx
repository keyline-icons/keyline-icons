import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserPen({ size = 24, ...props }: IconProps) {
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
      <path d="M10 22H2C1.44772 22 1 21.5523 1 21V19C1 15.134 4.13402 12 8 12H10V22ZM9 2C11.2092 2 13 3.79082 13 6C13 8.20918 11.2092 10 9 10C6.79094 10 5 8.20921 5 6C5 3.79079 6.79094 2 9 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM10 21L2 21L2 19C2 15.6863 4.6863 13 8 13L10 13M21.5607 14.5607L16.5355 19.5858L13 21L14.4142 17.4645L19.4393 12.4393C19.7207 12.158 20.1022 12 20.5 12C20.8978 12 21.2794 12.158 21.5607 12.4393C21.842 12.7206 22 13.1022 22 13.5C22 13.8978 21.842 14.2793 21.5607 14.5607Z"/>
    </svg>
  )
}
