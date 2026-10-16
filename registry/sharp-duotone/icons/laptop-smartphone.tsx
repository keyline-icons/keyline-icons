import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopSmartphone({ size = 24, ...props }: IconProps) {
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
      <path d="M4 14L4 2L20 2L20 5M10 18L2 18L2 14L10 14" strokeOpacity="0.4"/>
      <path d="M16 15L19 15L19 13L16 13L16 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M23 22C23 22.5523 22.5523 23 22 23L13 23C12.4477 23 12 22.5523 12 22L12 10C12 9.4477 12.4477 9 13 9L22 9C22.5523 9 23 9.4477 23 10L23 22ZM16 15L19 15L19 13L16 13L16 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
