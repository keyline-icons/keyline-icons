import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightMax({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16 15C16.5523 15 17 15.45 17 16C17 16.55 16.5523 17 16 17H8C7.4477 17 7 16.55 7 16C7 15.45 7.4477 15 8 15H16Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4.293 9.29C4.6835 8.9 5.3165 8.9 5.707 9.29L7.1211 10.71C7.5116 11.1 7.5116 11.73 7.1211 12.12C6.7306 12.51 6.0976 12.51 5.707 12.12L4.293 10.71C3.9024 10.32 3.9024 9.68 4.293 9.29ZM18.3643 9.29C18.7548 8.9 19.3878 8.9 19.7783 9.29C20.1687 9.68 20.1687 10.32 19.7783 10.71L18.3643 12.12C17.9738 12.51 17.3407 12.51 16.9502 12.12C16.5597 11.73 16.5597 11.1 16.9502 10.71L18.3643 9.29ZM4 15C4.5523 15 5 15.45 5 16C5 16.55 4.5523 17 4 17H2C1.4477 17 1 16.55 1 16C1 15.45 1.4477 15 2 15H4ZM22 15C22.5523 15 23 15.45 23 16C23 16.55 22.5523 17 22 17H20C19.4477 17 19 16.55 19 16C19 15.45 19.4477 15 20 15H22ZM11 10V8C11 7.45 11.4477 7 12 7C12.5523 7 13 7.45 13 8V10C13 10.55 12.5523 11 12 11C11.4477 11 11 10.55 11 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
