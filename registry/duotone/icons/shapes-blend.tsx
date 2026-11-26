import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShapesBlend({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12V4C3 3.448 3.4477 3 4 3H12M7 16V10C7 8.343 8.3431 7 10 7H16" strokeOpacity="0.4"/>
      <path d="M20.2426 11.757C21.3273 12.842 22 14.343 22 16C22 19.314 19.3137 22 16 22C12.6863 22 10 19.314 10 16C10 12.686 12.6863 10 16 10C17.6566 10 19.1579 10.673 20.2426 11.757Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
