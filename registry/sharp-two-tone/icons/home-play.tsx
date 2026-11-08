import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M11.389 2.2C11.749 1.93 12.251 1.93 12.611 2.2L21.611 9.15C21.856 9.34 22 9.64 22 9.95V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V9.95C2 9.64 2.144 9.34 2.389 9.15L11.389 2.2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3L21 9.95V21H3V9.95L12 3Z"/>
    </svg>
  )
}
