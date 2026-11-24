import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Whistle({ size = 24, ...props }: IconProps) {
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
      <path d="M3.3431 6.3431C1.8965 7.7898 1 9.7911 1 12C1 16.4183 4.5817 20 9 20C13.3624 20 16.9092 16.5084 16.9983 12.1673L21.7692 10.1795C22.5146 9.8689 23 9.1407 23 8.3333L23 6C23 4.8954 22.1046 4 21 4L15 4L9 4C6.7911 4 4.7898 4.8965 3.3431 6.3431Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 5C5.134 5 2 8.134 2 12C2 15.866 5.134 19 9 19C12.866 19 16 15.866 16 12C16 11.8356 15.9942 11.6712 15.9826 11.5072L21.3846 9.25641C21.7573 9.10114 22 8.73703 22 8.33333V6C22 5.4477 21.5523 5 21 5H15M9 5H15M15 5V7M9 9.5C10.3807 9.5 11.5 10.6193 11.5 12C11.5 13.3807 10.3807 14.5 9 14.5C7.61929 14.5 6.5 13.3807 6.5 12C6.5 10.6193 7.61929 9.5 9 9.5Z"/>
    </svg>
  )
}
