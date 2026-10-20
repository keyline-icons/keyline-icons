import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flip3Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11L11 22C11 22.5523 10.5523 23 10 23L2 23C1.4477 23 1 22.5523 1 22C1 21.7887 1.067 21.5827 1.1913 21.4118L9.1913 10.4118C9.3794 10.1531 9.6801 10 10 10C10.5523 10 11 10.4477 11 11ZM13 11C13 10.4477 13.4477 10 14 10C14.3199 10 14.6206 10.1531 14.8087 10.4118L22.8087 21.4118C22.933 21.5827 23 21.7887 23 22C23 22.5523 22.5523 23 22 23L14 23C13.4477 23 13 22.5523 13 22L13 11Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 5L22 5M5.2929 1.7071L2 5L5.2929 8.2929M18.7071 1.7071L22 5L18.7071 8.2929" fill="none"/>
    </svg>
  )
}
