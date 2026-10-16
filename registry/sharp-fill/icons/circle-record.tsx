import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleRecord({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 17.937 17.937 23 12 23C6.063 23 1 17.937 1 12C1 6.063 6.063 1 12 1C17.937 1 23 6.063 23 12ZM17 12C17 14.6233 14.6233 17 12 17C9.3767 17 7 14.6233 7 12C7 9.3767 9.3767 7 12 7C14.6233 7 17 9.3767 17 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
