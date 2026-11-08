import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fuel({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2C14.552 2 15 2.45 15 3V10H18C18.552 10 19 10.45 19 11V16C19 16.55 19.448 17 20 17C20.552 17 21 16.55 21 16V8.5L17 5.5L18.2 3.9L22.6 7.2C22.851 7.39 23 7.69 23 8V16C23 17.66 21.657 19 20 19C18.343 19 17 17.66 17 16V12H15V20H16V22H1V20H2V3C2 2.45 2.448 2 3 2H14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 21V3H14V21M3 21H14M3 21H1M14 21H16M14 11H18V16C18 17.1 18.895 18 20 18C21.105 18 22 17.1 22 16V8L17.6 4.7M6 9H11"/>
    </svg>
  )
}
