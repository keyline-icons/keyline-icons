import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BowlingBall({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.523 17.5228 22 12 22C6.4772 22 2 17.523 2 12C2 6.477 6.4772 2 12 2C17.5228 2 22 6.477 22 12Z"/>
      <path d="M13.5 7.5C13.5 8.328 12.8284 9 12 9C11.1716 9 10.5 8.328 10.5 7.5C10.5 6.672 11.1716 6 12 6C12.8284 6 13.5 6.672 13.5 7.5ZM18 10.5C18 11.328 17.3284 12 16.5 12C15.6716 12 15 11.328 15 10.5C15 9.672 15.6716 9 16.5 9C17.3284 9 18 9.672 18 10.5ZM12 13.5C12 14.328 11.3284 15 10.5 15C9.6716 15 9 14.328 9 13.5C9 12.672 9.6716 12 10.5 12C11.3284 12 12 12.672 12 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
