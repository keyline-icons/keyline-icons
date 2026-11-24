import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clapperboard({ size = 24, ...props }: IconProps) {
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
      <path d="M22 9L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 9Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.977 2L12 2L12.3229 2L12.0715 2.6286L10.3229 7L7.9771 7L9.4285 3.3714ZM14.477 2L16.8229 2L16.5715 2.6286L14.8229 7L12.4771 7L13.9285 3.3714ZM18.977 2L21 2C21.5523 2 22 2.4477 22 3L22 7L16.9771 7L18.4285 3.3714ZM5.8229 7L2 7L2 3C2 2.4477 2.4477 2 3 2L7.8229 2L7.5715 2.6286Z" fill="currentColor"/>
    </svg>
  )
}
