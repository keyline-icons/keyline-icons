import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grill({ size = 24, ...props }: IconProps) {
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
      <path d="M5.5 6L3 6C3 10.9706 7.0294 15 12 15C16.9706 15 21 10.9706 21 6L18.5 6M7 20C7 21.1046 6.1046 22 5 22C3.8954 22 3 21.1046 3 20C3 18.8954 3.8954 18 5 18C6.1046 18 7 18.8954 7 20ZM5.9923 18.2635L8.3094 14.2085M15 14.4853L18.2512 22.6292M7 20L17.2016 20M8.5 10L8.5 8.8028C8.5 7.6273 8.848 6.4781 9.5 5.5C10.1521 4.5219 10.5 3.3727 10.5 2.1972L10.5 1M13.5 10L13.5 8.8028C13.5 7.6273 13.848 6.4781 14.5 5.5C15.1521 4.5219 15.5 3.3727 15.5 2.1972L15.5 1" fill="none"/>
    </svg>
  )
}
