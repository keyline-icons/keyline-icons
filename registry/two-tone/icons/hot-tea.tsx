import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HotTea({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 6C7.5 4.9 8.0191 3.86 8.9004 3.2C9.278 2.92 9.5 2.47 9.5 2C9.5 1.45 9.9477 1 10.5 1C11.0523 1 11.5 1.45 11.5 2C11.5 3.1 10.9809 4.14 10.0996 4.8C9.722 5.08 9.5 5.53 9.5 6C9.5 6.55 9.0523 7 8.5 7C7.9477 7 7.5 6.55 7.5 6ZM12.5 6C12.5 4.9 13.0191 3.86 13.9004 3.2C14.278 2.92 14.5 2.47 14.5 2C14.5 1.45 14.9477 1 15.5 1C16.0523 1 16.5 1.45 16.5 2C16.5 3.1 15.9809 4.14 15.0996 4.8C14.722 5.08 14.5 5.53 14.5 6C14.5 6.55 14.0523 7 13.5 7C12.9477 7 12.5 6.55 12.5 6ZM17 12C19.2092 12 21 13.79 21 16C21 18.21 19.0832 20 16.874 20C16.43 21.73 14.8639 23 13 23H7C4.7908 23 3 21.21 3 19V11C3 9.9 3.8954 9 5 9H15C16.1046 9 17 9.9 17 11V12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 13V11C16 10.45 15.5523 10 15 10H10M16 13V19M16 13H17C18.6569 13 20 14.34 20 16C20 17.66 18.6569 19 17 19H16M10 10H5C4.4477 10 4 10.45 4 11V19C4 20.66 5.3431 22 7 22H13C14.6569 22 16 20.66 16 19M10 10V14M8.5 6C8.5 5.21 8.8705 4.47 9.5 4C10.1295 3.53 10.5 2.79 10.5 2M13.5 6C13.5 5.21 13.8705 4.47 14.5 4C15.1295 3.53 15.5 2.79 15.5 2M10 14H8.5C8.2239 14 8 14.22 8 14.5V17.5C8 17.78 8.2239 18 8.5 18H11.5C11.7761 18 12 17.78 12 17.5V14.5C12 14.22 11.7761 14 11.5 14H10Z"/>
    </svg>
  )
}
