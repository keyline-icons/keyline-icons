import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConical({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 1L13.5 1C14.6046 1 15.5 1.8954 15.5 3L15.5 7.7741L20.7064 18.7105C20.8981 19.1133 20.9976 19.5539 20.9976 20C20.9976 21.6569 19.6545 23 17.9976 23L6.0024 23C4.3455 23 3.0024 21.6569 3.0024 20C3.0024 19.5539 3.1019 19.1133 3.2936 18.7105L8.5 7.7741L8.5 3C8.5 1.8954 9.3954 1 10.5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.1079 17L19.8921 17L20.7064 18.7105C20.8981 19.1133 20.9976 19.5539 20.9976 20C20.9976 21.6569 19.6545 23 17.9976 23L6.0024 23C4.3455 23 3.0024 21.6569 3.0024 20C3.0024 19.5539 3.1019 19.1133 3.2936 18.7105Z" fill="currentColor" stroke="none"/>
      <path d="M8 2L16 2"/>
    </svg>
  )
}
