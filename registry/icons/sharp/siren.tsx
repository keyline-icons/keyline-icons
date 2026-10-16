import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Siren({ size = 24, ...props }: IconProps) {
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
      <path d="M7 17L7 13C7 10.2386 9.2386 8 12 8C14.7614 8 17 10.2386 17 13L17 17M4 17L20 17L20 21L4 21L4 17ZM5.9289 6.9289L4.636 5.636M12 5L12 2M18.0711 6.9289L19.364 5.636"/>
    </svg>
  )
}
