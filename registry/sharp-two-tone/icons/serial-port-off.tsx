import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SerialPortOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19L4.159 19C3.675 19 3.2604 18.6533 3.1748 18.177L1.0173 6.177C1.0068 6.1186 1.0015 6.0593 1.0015 6C1.0015 5.4477 1.4492 5 2.0015 5L5 5ZM8.7426 5L12 5L21.9985 5C22.5508 5 22.9985 5.4477 22.9985 6C22.9985 6.0593 22.9932 6.1186 22.9827 6.177L20.992 17.2494Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 18L4.159 18L2.0015 6L6 6M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
