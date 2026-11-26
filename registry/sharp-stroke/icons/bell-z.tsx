import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BellZ({ size = 24, ...props }: IconProps) {
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
      <path d="M16.2798 13.5254L16.5729 14C16.8223 14.4039 17 14.702 17 15L17 16L3 16L3 15C3 14 5 13 5 8C5 5.2386 7.2386 3 10 3C10.5226 3 11.0265 3.0802 11.5 3.2289L11.7001 3.2917M7.7679 19.134C8.6252 20.6188 9.2855 21 10 21C10.7145 21 11.3748 20.6188 12.2321 19.134M22 10L21 10L15 10L20.9975 3L15.5 3L14.5 3" fill="none"/>
    </svg>
  )
}
