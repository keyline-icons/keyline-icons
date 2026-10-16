import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CameraOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9.71484 9.71484C8.67982 10.4362 8.00016 11.6383 8 12.999C8 15.2082 9.79082 16.999 12 16.999C13.3611 16.999 14.5618 16.3186 15.2832 15.2832L20.6465 20.6465C20.1443 20.8736 19.5869 21 19 21H5C2.7909 21 1 19.2091 1 17V9C1 6.7909 2.7909 5 5 5L9.71484 9.71484Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5 3C15.1294 3 15.7219 3.29639 16.0996 3.7998L17 5H19C21.2091 5 23 6.7909 23 9V16.3428C23 16.7472 22.7564 17.1117 22.3828 17.2666C22.0091 17.4214 21.579 17.3358 21.293 17.0498L8.9502 4.70703C8.6642 4.42103 8.5786 3.99089 8.7334 3.61719C8.88825 3.24362 9.25281 3 9.65723 3H14.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.8545 13.8545C13.8 13.9092 13.751 13.9712 13.709 14.04C13.3562 14.6176 12.722 14.999 12 14.999C10.8954 14.999 10 14.1036 10 12.999C10.0002 12.2773 10.3818 11.6438 10.959 11.291C11.028 11.2488 11.0887 11.1983 11.1436 11.1436L13.8545 13.8545Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
