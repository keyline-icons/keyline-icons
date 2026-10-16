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
      <path d="M20.869 20.869C20.486 22.1345 19.3198 23 17.9976 23L6.0024 23C4.3455 23 3.0024 21.6569 3.0024 20C3.0024 19.5539 3.1019 19.1133 3.2936 18.7105L8.2659 8.2659ZM9.7666 9.7666L6.323 17L17 17ZM10.5 3.8431L10.5 3L13.5 3L13.5 7.7741C13.5 8.0715 13.5663 8.3652 13.6942 8.6338L14.3632 10.0391C14.529 10.3874 14.8803 10.6092 15.2661 10.6092C15.8184 10.6092 16.2661 10.1615 16.2661 9.6092C16.2661 9.4605 16.2329 9.3137 16.169 9.1794L15.5 7.7741L15.5 3C15.5 1.8954 14.6046 1 13.5 1L10.5 1C9.3954 1 8.5 1.8954 8.5 3L8.5 3.8431C8.5 4.3954 8.9477 4.8431 9.5 4.8431C10.0523 4.8431 10.5 4.3954 10.5 3.8431Z" fill="currentColor" stroke="none"/>
      <path d="M8 2L16 2M2 2L22 22" fill="none"/>
    </svg>
  )
}
