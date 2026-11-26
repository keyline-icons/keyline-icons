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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.5729 14C16.8223 14.4039 17 14.702 17 15C17 15.5523 16.5523 16 16 16L4 16C3.4477 16 3 15.5523 3 15C3 14 5 13 5 8C5 5.2386 7.2386 3 10 3C10.5226 3 11.0265 3.0802 11.5 3.2289M8.2679 20C8.6252 20.6188 9.2855 21 10 21C10.7145 21 11.3748 20.6188 11.7321 20M21 10H16.1466C15.71 10 15.4831 9.4797 15.7802 9.15977L20.7198 3.84023C21.0169 3.5203 20.79 3 20.3534 3H15.5"/>
    </svg>
  )
}
