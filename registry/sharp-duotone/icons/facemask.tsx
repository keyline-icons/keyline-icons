import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Facemask({ size = 24, ...props }: IconProps) {
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
      <path d="M11.47 5.15C11.787 4.95 12.188 4.95 12.51 5.14L16.497 7.5H22C22.552 7.5 23 7.95 23 8.5V14.5C22.999 15.05 22.552 15.5 22 15.5H17.524C17.126 16.21 16.591 16.91 15.994 17.43C13.72 19.45 10.566 19.51 8.234 17.62L7.996 17.42C7.404 16.9 6.872 16.2 6.477 15.5H2C1.483 15.5 1.052 15.06 1 14.55V8.5C1 7.95 1.448 7.5 2 7.5H7.713L11.47 5.15ZM3 9.5V13.5H5.701C5.641 13.24 5.556 12.83 5.521 12.57L5.122 9.5H3ZM18.878 9.5L18.479 12.57C18.444 12.83 18.359 13.24 18.299 13.5H21V9.5H18.878Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M13 10V15H11V10H13Z" fill="currentColor"/>
    </svg>
  )
}
