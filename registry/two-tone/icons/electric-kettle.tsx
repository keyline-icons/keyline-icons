import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ElectricKettle({ size = 24, ...props }: IconProps) {
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
      <path d="M19 20C19.5523 20 20 20.45 20 21C20 21.55 19.5523 22 19 22H6C5.4477 22 5 21.55 5 21C5 20.45 5.4477 20 6 20H19ZM12 2C14.1152 2 15.7403 2.98 16.9424 4.5H19.9951C21.5133 4.5 22.4777 6.13 21.751 7.46C21.7456 7.47 21.74 7.48 21.7344 7.49L19.5459 11.19C19.8045 12.7 19.9468 14.32 19.9873 15.97C20.0149 17.1 19.0988 18 18 18H6.959C5.8998 18 4.9836 17.16 4.9775 16.05C4.9747 15.51 4.9864 14.9 5.0176 14.25C3.7504 13.76 2.9514 12.82 2.5039 11.99C2.0279 11.11 2 10.14 2 9.41V7.5C2 5.84 3.3431 4.5 5 4.5H7.5C7.52 4.5 7.5399 4.5 7.5596 4.5C8.5679 3.05 9.9943 2 12 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.5 5.5H5C3.8954 5.5 3 6.4 3 7.5V9.41C3 10.14 3.0388 10.88 3.3833 11.52C3.8221 12.33 4.6422 13.23 6 13.5M16.5 5.5H19.9955C20.7545 5.5 21.2368 6.31 20.8734 6.98L18.5 11M11 9V13M6 21H19M18 17H6.9592C6.4231 17 5.9812 16.58 5.9784 16.04C5.955 11.61 6.8977 3 12 3C16.7762 3 18.8149 8.93 18.9879 16C19.0014 16.55 18.5523 17 18 17Z"/>
    </svg>
  )
}
