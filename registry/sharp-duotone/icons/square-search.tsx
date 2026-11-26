import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareSearch({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2H21C21.552 2 22 2.4477 22 3V21C22 21.5523 21.552 22 21 22H3C2.448 22 2 21.5523 2 21V3C2 2.4477 2.448 2 3 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.39 13.3905L16.535 16.5355M14.357 11.0572C14.357 12.8796 12.88 14.357 11.057 14.357C9.235 14.357 7.757 12.8796 7.757 11.0572C7.757 9.2347 9.235 7.7574 11.057 7.7574C12.88 7.7574 14.357 9.2347 14.357 11.0572Z"/>
    </svg>
  )
}
