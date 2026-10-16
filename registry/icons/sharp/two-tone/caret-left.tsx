import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M5.4961 12.8638C4.8346 12.4779 4.8346 11.5221 5.4961 11.1362L17.4961 4.1362C18.1628 3.7473 19 4.2282 19 5L19 19C19 19.7718 18.1628 20.2527 17.4961 19.8638L5.4961 12.8638Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 12L18 19L18 5L6 12Z"/>
    </svg>
  )
}
