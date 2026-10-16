import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4.264C11.2804 3.8481 10.3605 3.9168 9.7072 4.4703L2.7072 10.4009C2.2586 10.7809 2 11.339 2 11.9268L2 20C2 21.1046 2.8954 22 4 22L18 22C19.1046 22 20 21.1046 20 20L20 12M8 22L8 15L14 15L14 22M16 5.6L18.3333 8L22 2"/>
    </svg>
  )
}
