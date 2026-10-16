import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VisionPro({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L17 6C20.3137 6 23 8.6863 23 12C23 15.3137 20.3137 18 17 18C15.6593 18 14.4078 17.3283 13.6667 16.2111C13.2961 15.6525 12.6703 15.3166 12 15.3166C11.3297 15.3166 10.7039 15.6525 10.3333 16.2111C9.5922 17.3283 8.3407 18 7 18C3.6863 18 1 15.3137 1 12C1 8.6863 3.6863 6 7 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
