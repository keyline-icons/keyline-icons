import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sword({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7322 14.318L9.4022 9.648L14.7794 4.2709C15.2184 3.8317 15.7538 3.5009 16.3428 3.3045L20.0257 2.077C20.6105 1.8821 21.1905 2.0692 21.5607 2.4393C21.9308 2.8095 22.1179 3.3895 21.923 3.9743L20.6955 7.6571C20.4991 8.2462 20.1683 8.7816 19.729 9.2207L9.682 19.2678L7.2071 16.793Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 14L10 21M6.5 17.5L3 21"/>
    </svg>
  )
}
