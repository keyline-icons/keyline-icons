import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextAlignJustifyCharacter({ size = 24, ...props }: IconProps) {
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
      <path d="M22 20V22H2V20H22ZM22 14V16H2V14H22ZM7 2C7.359 2 7.69 2.19 7.868 2.5L11.998 9.73L10.262 10.73L8.705 8H5.295L3.738 10.73L2.002 9.73L6.167 2.44C6.354 2.2 6.686 2 7 2ZM22 8V10H14V8H22ZM6.438 6H7.562L7 5.02L6.438 6ZM22 2V4H14V2H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 22H2V20H22V22ZM22 16H2V14H22V16ZM22 10H14V8H22V10ZM22 4H14V2H22V4Z" fill="currentColor"/>
    </svg>
  )
}
