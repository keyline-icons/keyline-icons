import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Navigation({ size = 24, ...props }: IconProps) {
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
      <path d="M5.0584 18.2211L11.5195 5.297C11.7175 4.901 12.2825 4.901 12.4805 5.297L18.9416 18.2211C19.1557 18.6493 18.7453 19.1225 18.2912 18.9712L12.1699 16.9304C12.0596 16.8937 11.9404 16.8937 11.8301 16.9304L5.7088 18.9712C5.2547 19.1225 4.8443 18.6493 5.0584 18.2211Z" fill="currentColor" stroke="none"/>
      <path d="M5 19L12 5L19 19L12 16.8739L5 19Z"/>
    </svg>
  )
}
