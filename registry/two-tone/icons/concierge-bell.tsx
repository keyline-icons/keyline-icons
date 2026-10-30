import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ConciergeBell({ size = 24, ...props }: IconProps) {
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
      <path d="M3.039 14.1575C3.286 11.5202 4.683 9.1258 6.8574 7.6131C8.365 6.5621 10.1585 5.9986 11.9963 5.9986C12.3745 5.9986 12.7524 6.0224 13.1277 6.0701C15.6564 6.3889 17.9312 7.7653 19.3869 9.8574C20.2754 11.1302 20.8179 12.612 20.961 14.1575C22.1798 14.5699 23 15.7134 23 17L23 19C23 20.6569 21.6569 22 20 22L4 22C2.3431 22 1 20.6569 1 19L1 17C1 15.7134 1.8202 14.5699 3.039 14.1575Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 15L20 15C21.1046 15 22 15.8954 22 17L22 19C22 20.1046 21.1046 21 20 21L4 21C2.8954 21 2 20.1046 2 19L2 17C2 15.8954 2.8954 15 4 15ZM4 15C4 10.5817 7.5817 7 12 7C16.4183 7 20 10.5817 20 15M12 7L12 3M9 3L15 3" fill="none"/>
    </svg>
  )
}
