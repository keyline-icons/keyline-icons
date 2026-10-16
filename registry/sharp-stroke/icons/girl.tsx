import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Girl({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 15.5C4.1 17.6 4.4 19.2 3.2 20.4C2.4 19.4 2 18 2 16.4C2 14.4 2.6 12.4 4 11C4 6 7.6 2 12 2C16.4 2 20 6 20 11C21.4 12.4 22 14.4 22 16.4C22 18 21.6 19.4 20.8 20.4C19.6 19.2 19.9 17.6 19.5 15.5C19.5 19.6 15.6 22 12 22C8.4 22 4.5 19.6 4.5 15.5ZM4.0957 9.6C9 9.6 11 5.8 12 3.5C13 5.8 15 9.6 19.9043 9.6M9 11.6L9 14.6M15 11.6L15 14.6M10.0735 17.1514L10.5 17.45C11 17.8 11.5 17.95 12 17.95C12.5 17.95 13 17.8 13.5 17.45L13.9265 17.1514" fill="none"/>
    </svg>
  )
}
