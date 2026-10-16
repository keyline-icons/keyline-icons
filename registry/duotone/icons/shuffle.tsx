import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shuffle({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6H6C7.5 6 8.9 6.8 9.6 8.1L10.2387 9.1379M13.7613 14.8621L14.4 15.9C15.1 17.2 16.5 18 18 18H21M18 15L21 18L18 21" strokeOpacity="0.4"/>
      <path d="M3 18H6C7.5 18 8.9 17.2 9.6 15.9L14.4 8.1C15.1 6.8 16.5 6 18 6H21M18 3L21 6L18 9"/>
    </svg>
  )
}
