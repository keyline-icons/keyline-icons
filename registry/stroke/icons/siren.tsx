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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 17L7 13C7 10.2386 9.2386 8 12 8C14.7614 8 17 10.2386 17 13L17 17M5 17L19 17C19.5523 17 20 17.4477 20 18L20 20C20 20.5523 19.5523 21 19 21L5 21C4.4477 21 4 20.5523 4 20L4 18C4 17.4477 4.4477 17 5 17ZM5.636 6.636L4.9289 5.9289M12 4L12 3M18.364 6.636L19.0711 5.9289"/>
    </svg>
  )
}
