import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.9976 20C19.9976 21.1046 19.1022 22 17.9976 22L6.0024 22C4.8978 22 4.0024 21.1046 4.0024 20C4.0024 19.7026 4.0687 19.4089 4.1966 19.1403L9.0162 9.0162M4.7394 18L18 18M9.5 3.8431L9.5 3C9.5 2.4477 9.9477 2 10.5 2L13.5 2C14.0523 2 14.5 2.4477 14.5 3L14.5 7.7741C14.5 7.9228 14.5332 8.0697 14.5971 8.204L15.2661 9.6092M8 2L16 2M2 2L22 22" fill="none"/>
    </svg>
  )
}
