import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotDroplet({ size = 24, ...props }: IconProps) {
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
      <path d="M19.2 8.6C20.3684 10.1579 21 12.0527 21 14C21 18.9706 16.9706 23 12 23C7.0294 23 3 18.9706 3 14C3 12.0527 3.6316 10.1579 4.8 8.6L9.6 2.2C10.1666 1.4446 11.0557 1 12 1C12.9443 1 13.8334 1.4446 14.4 2.2L19.2 8.6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 11.6028L10.4521 14.5685M13.9543 11L14.4064 13.9657"/>
    </svg>
  )
}
