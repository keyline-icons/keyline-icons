import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointVerticalArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M17.002 15C19.21 15 21.001 16.79 21.001 19C21.001 21.21 19.21 23 17.002 23C14.794 23 13.004 21.21 13.004 19C13.004 16.79 14.794 15 17.002 15ZM17.002 1C19.21 1 21.001 2.79 21.001 5C21.001 7.21 19.21 9 17.002 9C14.794 9 13.004 7.21 13.004 5C13.004 2.79 14.794 1 17.002 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.406 6.71C9.709 6.48 10.114 6.45 10.453 6.62C10.791 6.79 11.004 7.13 11.004 7.51V16.49C11.004 16.82 10.785 17.16 10.518 17.35C10.18 17.52 9.708 17.51 9.405 17.29L3.409 12.8C3.189 12.63 3.032 12.27 3 11.99C3.034 11.73 3.191 11.36 3.409 11.2L9.406 6.71ZM18.001 8V16H16.002V8H18.001Z" fill="currentColor"/>
    </svg>
  )
}
