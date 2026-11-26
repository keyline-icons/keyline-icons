import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudShield({ size = 24, ...props }: IconProps) {
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
      <path d="M5.125 16.9609L4.5 16.7081C2.989 16.0969 2 14.6299 2 13C2 10.7909 3.7909 9 6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9C20.2091 9 22 10.7909 22 13C22 14.6299 21.011 16.0969 19.5 16.7081L18.875 16.9609" strokeOpacity="0.4"/>
      <path d="M15.5 13.6976L15.5 18.2779L14.8928 19.0631C14.3667 19.7434 13.5327 20.5058 12.363 20.9355C12.1288 21.0215 11.8712 21.0215 11.637 20.9355C10.4673 20.5058 9.6333 19.7434 9.1073 19.0631L8.5 18.2778L8.5 13.6976L9.0173 13.6362C10.1758 13.4988 11.0504 12.9203 11.5731 12.4132C11.7974 12.1956 12.2026 12.1956 12.4269 12.4132C12.9496 12.9203 13.8242 13.4988 14.9827 13.6362Z"/>
    </svg>
  )
}
