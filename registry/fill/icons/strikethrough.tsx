import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Strikethrough({ size = 24, ...props }: IconProps) {
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
      <path d="M8 8C8 5.7909 9.7909 4 12 4C13.1093 4 14.1689 4.4607 14.9254 5.272M12 12C14.2091 12 16 13.7909 16 16C16 18.2091 14.2091 20 12 20C10.3184 20 8.8164 18.9483 8.2412 17.3681M3 12H21" fill="none"/>
    </svg>
  )
}
