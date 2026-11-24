import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lipstick({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 23L8 23C6.3431 23 5 21.6569 5 20L5 16C5 14.8954 5.8954 14 7 14L7 13C7 12.4477 7.4477 12 8 12L12 12L16 12C16.5523 12 17 12.4477 17 13L17 14C18.1046 14 19 14.8954 19 16L19 20C19 21.6569 17.6569 23 16 23ZM12.8951 2.7129L15.8952 4.2143C16.5725 4.5533 17 5.2456 17 6.0028L17 9C17 9.5523 16.5523 10 16 10L12 10L8 10C7.4477 10 7 9.5523 7 9L7 3C7 1.8954 7.8954 1 9 1C9.3107 1 9.6172 1.0724 9.895 1.2114Z" fill="currentColor"/>
    </svg>
  )
}
