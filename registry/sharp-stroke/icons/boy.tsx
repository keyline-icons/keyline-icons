import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Boy({ size = 24, ...props }: IconProps) {
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
      <path d="M20 10.5C21.1046 10.5 22 11.6193 22 13C22 14.3807 21.1046 15.5 20 15.5L20 15.738C20 17.3 19 18.9 17.45 20.1C15.9 21.3 13.94 22 12 22C10.06 22 8.1 21.3 6.55 20.1C5 18.9 4 17.3 4 15.738L4 15.5C2.8954 15.5 2 14.3807 2 13C2 11.6193 2.8954 10.5 4 10.5C6 10.5 6.6 9 7.6 7.6C8.9 8.6 11.2 9.2 13 8.7C15 8.35 16.2 7.4 17.4 6.6C17.9 8 18.5 10 20 10.5ZM4 10.5L4 7.5C4 4 6.8 2 11.5 2C14.4 2 16.5 3.5 19.4 2C20 3.6 20 5.5 20 7.5L20 10.5M9 11.6L9 14.6M15 11.6L15 14.6M10.0735 17.1514L10.5 17.45C11 17.8 11.5 17.95 12 17.95C12.5 17.95 13 17.8 13.5 17.45L13.9265 17.1514" fill="none"/>
    </svg>
  )
}
