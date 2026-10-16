import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stamp({ size = 24, ...props }: IconProps) {
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
      <path d="M15.1092 8.5165L15.769 11L17 11C19.7614 11 22 13.2386 22 16C22 17.1046 21.1046 18 20 18L4 18C2.8954 18 2 17.1046 2 16C2 13.2386 4.2386 11 7 11L8.231 11L8.8908 8.5165C8.3145 7.8044 8 6.9161 8 6C8 3.7909 9.7909 2 12 2C14.2091 2 16 3.7909 16 6C16 6.9161 15.6855 7.8044 15.1092 8.5165Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.0267 11.0001C19.7777 11.0148 22 13.249 22 16C22 17.1046 21.1046 18 20 18L4 18C2.8954 18 2 17.1046 2 16C2 13.249 4.2223 11.0148 6.9733 11.0001L17.0267 11.0001Z" fill="currentColor" stroke="none"/>
      <path d="M5 21L19 21" fill="none"/>
    </svg>
  )
}
