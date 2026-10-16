import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M18.6189 13L12 13L12 21.618L10.5093 22.9514L4.2918 16C2.8159 14.3499 2 12.2138 2 10C2 5.0294 6.0294 1 11 1C15.9706 1 20 5.0294 20 10C20 10.7988 19.8909 11.5655 19.4644 13.2182Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 10C14 11.6569 12.6569 13 11 13C9.3431 13 8 11.6569 8 10C8 8.3431 9.3431 7 11 7C12.6569 7 14 8.3431 14 10ZM14 19L22 19"/>
    </svg>
  )
}
