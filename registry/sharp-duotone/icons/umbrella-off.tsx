import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UmbrellaOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12H13V19C13 20.1046 13.8954 21 15 21C16.1046 21 17 20.1046 17 19V18H19V19C19 21.2092 17.2092 23 15 23C12.7908 23 11 21.2092 11 19V12.3125C10.117 11.1617 8.6578 11.234 7.84766 12.5303C7.45591 13.1565 6.54409 13.1565 6.15234 12.5303C5.29404 11.157 3.70596 11.157 2.84766 12.5303C2.31501 13.3818 1 13.0046 1 12C1 8.9625 2.23108 6.21238 4.22168 4.22168L12 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 13.0046 21.685 13.3818 21.1523 12.5303C20.294 11.157 18.706 11.157 17.8477 12.5303C17.4559 13.1565 16.5441 13.1565 16.1523 12.5303C15.885 12.1027 15.5462 11.8078 15.1816 11.6465L6.19238 2.65625C7.87782 1.60647 9.86813 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70703 1.70703L22.2928 22.2928"/>
    </svg>
  )
}
