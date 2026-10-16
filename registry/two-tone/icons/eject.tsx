import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Eject({ size = 24, ...props }: IconProps) {
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
      <path d="M6 16C5.2291 16 4.5268 15.5569 4.1949 14.8611C3.8629 14.1653 3.9605 13.3407 4.4456 12.7415L11.2228 4.3708C11.4127 4.1362 11.6983 4 12 4C12.3017 4 12.5873 4.1362 12.7772 4.3708L19.5544 12.7415C20.0395 13.3407 20.1371 14.1653 19.8051 14.8611C19.4732 15.5569 18.7709 16 18 16ZM4 20L20 20"/>
    </svg>
  )
}
