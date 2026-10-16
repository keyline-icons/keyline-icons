import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BabyGirl({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3.0445L8.701 1.1346C8.3917 0.9555 8.0102 0.9551 7.7005 1.1337C7.3908 1.3122 7.2 1.6425 7.2 2L7.2 6.4C7.2 6.7575 7.3908 7.0878 7.7005 7.2663C8.0102 7.4449 8.3917 7.4445 8.701 7.2654L12 5.3555L15.299 7.2654C15.6083 7.4445 15.9898 7.4449 16.2995 7.2663C16.6092 7.0878 16.8 6.7575 16.8 6.4L16.8 2C16.8 1.6425 16.6092 1.3122 16.2995 1.1337C15.9898 0.9551 15.6083 0.9555 15.299 1.1346L12 3.0445Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.8 4.2C18 4.2 20 6.7 20 10.5C21.1046 10.5 22 11.6193 22 13C22 14.3807 21.1046 15.5 20 15.5L20 15.738C20 17.3 19 18.9 17.45 20.1C15.9 21.3 13.94 22 12 22C10.06 22 8.1 21.3 6.55 20.1C5 18.9 4 17.3 4 15.738L4 15.5C2.8954 15.5 2 14.3807 2 13C2 11.6193 2.8954 10.5 4 10.5C4 6.7 6 4.2 8.2 4.2M12 4.2L8.2 2L8.2 6.4ZM12 4.2L15.8 2L15.8 6.4ZM9 11.6L9 14.6M15 11.6L15 14.6M10.0735 17.1514L10.5 17.45C11 17.8 11.5 17.95 12 17.95C12.5 17.95 13 17.8 13.5 17.45L13.9265 17.1514" fill="none"/>
    </svg>
  )
}
