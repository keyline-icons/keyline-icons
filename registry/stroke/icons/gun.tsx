import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gun({ size = 24, ...props }: IconProps) {
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
      <path d="M11.244 10H18.5L19.5 9H20.5C21.3284 9 22 8.32843 22 7.5V6C22 5.4477 21.5523 5 21 5H19M11.244 10C10.8024 10 10.4131 10.2897 10.2862 10.7127L7.4276 19.5747C7.1738 20.4207 6.3952 21 5.5119 21H4.1881C2.8483 21 1.8874 19.7085 2.2724 18.4253L3.95 13.5C4.23733 12.6667 4.5 11 3.656 10M11.244 10H3.656M3.656 10H3C2.4477 10 2 9.5523 2 9L3 5H19M19 5V3M16 10L14.8292 12.3416C14.321 13.358 13.2822 14 12.1459 14H9.5"/>
    </svg>
  )
}
