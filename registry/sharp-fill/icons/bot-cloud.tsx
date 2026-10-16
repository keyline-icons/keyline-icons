import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotCloud({ size = 24, ...props }: IconProps) {
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
      <path d="M6 20L18 20C20.6233 20 23 17.6233 23 15C23 12.6937 21.163 10.578 18.9365 10.1004C18.4644 6.7612 15.4245 4 12 4C8.5755 4 5.5356 6.7612 5.0635 10.1004C2.837 10.578 1 12.6937 1 15C1 17.6233 3.3767 20 6 20ZM8.882 10.9042L10.8591 10.6028L11.5701 15.2671L9.593 15.5685L8.882 10.9042ZM12.8363 10.3014L14.8134 10L15.5244 14.6643L13.5473 14.9657L12.8363 10.3014Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
