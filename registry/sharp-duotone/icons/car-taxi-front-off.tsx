import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarTaxiFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.5 11.1338C21.8095 11.3124 22.0002 11.6426 22 12L22 18.3431L14.6569 11L17.6398 11L17.1213 7L10.6569 7L8.208 4.5512L9.5936 1.5776C9.7578 1.2253 10.1113 1 10.5 1L13.5 1C13.8887 1 14.2422 1.2253 14.4064 1.5776L16.0011 5L18 5C18.5026 5 18.9271 5.373 18.9917 5.8714L19.5269 10L21.5 10L21.5 11.1338ZM4.4731 10L5.0083 5.8714C5.0365 5.6524 5.1366 5.4489 5.2929 5.2929L7 7.0001C6.9114 7.08 6.8543 7.1889 6.8389 7.3072L6.568 9.3965L6.3601 11L11 11L15 15.0001L21 21.0001L20.5 21.0001C20.2239 21.0001 20 21.224 20 21.5001L20 22.0001C20.0002 22.5524 19.5523 23.0002 19 23L18 23C17.4477 23 17 22.5523 17 22L17 21L7 21L7 22C7 22.5523 6.5523 23 6 23L5 23C4.4477 23 4 22.5523 4 22L4 21L3 21C2.4477 21 2 20.5523 2 20L2 12C1.9998 11.6426 2.1905 11.3124 2.5 11.1338L2.5 10L4.4731 10ZM6 15L6 17L9 17L9 15L6 15Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
