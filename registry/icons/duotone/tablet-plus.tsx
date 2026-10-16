import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M19 3C21.2091 3 23 4.79086 23 7V10C23 10.5523 22.5523 11 22 11H16C14.3431 11 13 12.3431 13 14V20C13 20.5523 12.5523 21 12 21H5C2.79086 21 1 19.2091 1 17V7C1 4.79086 2.79086 3 5 3H19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 14L19 20M22 17L16 17"/>
      <path d="M13.5 8.5C13.5 9.3284 12.8284 10 12 10C11.1716 10 10.5 9.3284 10.5 8.5C10.5 7.6716 11.1716 7 12 7C12.8284 7 13.5 7.6716 13.5 8.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
