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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.5 16.7081C2.989 16.0969 2 14.6299 2 13C2 10.7909 3.7909 9 6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9C20.2091 9 22 10.7909 22 13C22 14.6299 21.011 16.0969 19.5 16.7081" strokeOpacity="0.4"/>
      <path d="M9.0173 13.6362C10.1758 13.4987 11.0504 12.9203 11.5731 12.4133C11.7974 12.1956 12.2026 12.1956 12.4269 12.4133C12.9496 12.9203 13.8242 13.4987 14.9827 13.6362C15.2669 13.6699 15.5 13.8909 15.5 14.1675L15.5 16.8747C15.5 17.651 15.3736 18.4412 14.8928 19.0631C14.3667 19.7434 13.5327 20.5058 12.363 20.9355C12.1288 21.0215 11.8712 21.0215 11.637 20.9355C10.4673 20.5058 9.6332 19.7434 9.1073 19.0631C8.6264 18.4412 8.5 17.651 8.5 16.8747L8.5 14.1675C8.5 13.8909 8.7331 13.6699 9.0173 13.6362Z"/>
    </svg>
  )
}
