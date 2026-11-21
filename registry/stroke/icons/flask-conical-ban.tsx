import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalBan({ size = 24, ...props }: IconProps) {
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
      <path d="M11.0718 22H4.0024C2.5325 22 1.5647 20.4675 2.1965 19.1403L7.4029 8.204C7.4668 8.0697 7.5 7.9228 7.5 7.7741V3C7.5 2.4477 7.9477 2 8.5 2H11.5C12.0523 2 12.5 2.4477 12.5 3V7.7741C12.5 7.9228 12.5332 8.0697 12.5971 8.204L13.9705 11.0889M6 2H14M2.7394 18H10M15.1716 15.1716L20.8284 20.8284M18 14C20.2092 14 22 15.7908 22 18C22 20.2092 20.2092 22 18 22C15.7908 22 14 20.2092 14 18C14 15.7908 15.7908 14 18 14Z" fill="none"/>
    </svg>
  )
}
