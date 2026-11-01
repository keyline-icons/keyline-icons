import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DeskOffice({ size = 24, ...props }: IconProps) {
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
      <path d="M22 19L22 22C22 22.5523 21.5523 23 21 23L14 23C13.4477 23 13 22.5523 13 22L13 19C13 18.4477 13.4477 18 14 18L21 18C21.5523 18 22 18.4477 22 19ZM13 15L13 13.0001L4 13.0001L4 23.0001L2 23.0001L2 12.0001C2 11.4478 2.4477 11.0001 3 11.0001L13.988 11.0001C13.992 11 13.996 11 14 11L21 11C21.5523 11 22 11.4477 22 12L22 15C22 15.5523 21.5523 16 21 16L14 16C13.4477 16 13 15.5523 13 15ZM6 8L6 2C6 1.4477 6.4477 1 7 1L17 1C17.5523 1 18 1.4477 18 2L18 8C18 8.5523 17.5523 9 17 9L7 9C6.4477 9 6 8.5523 6 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 12L12 8" fill="none"/>
    </svg>
  )
}
