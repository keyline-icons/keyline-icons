import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderTree({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L15.382 2C16.1395 2 16.832 2.428 17.1708 3.1056L17.618 4L20 4C21.1046 4 22 4.8954 22 6L22 9C22 10.1046 21.1046 11 20 11L14 11C12.8954 11 12 10.1046 12 9L12 4C12 2.8954 12.8954 2 14 2ZM14 13L15.382 13C16.1395 13 16.832 13.428 17.1708 14.1056L17.618 15L20 15C21.1046 15 22 15.8954 22 17L22 20C22 21.1046 21.1046 22 20 22L14 22C12.8954 22 12 21.1046 12 20L12 15C12 13.8954 12.8954 13 14 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 3L3 16C3 17.6569 4.3431 19 6 19L9 19M3 5C3 6.6569 4.3431 8 6 8L9 8"/>
    </svg>
  )
}
