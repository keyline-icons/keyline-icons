import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PerfumeBottle({ size = 24, ...props }: IconProps) {
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
      <path d="M8 21L4.9763 20.9999C4.7328 20.9999 4.4977 20.9111 4.315 20.7501L4.0313 20.5C2.7399 19.361 2 17.722 2 16C2 13.8565 3.1436 11.8758 5 10.8039L5 10C5 9.4477 5.4477 9 6 9L10 9C10.5523 9 11 9.4477 11 10L11 10.8039C11.9282 11.3398 12.6782 12.1029 13.1962 13C13.7141 13.8971 14 14.9282 14 16C14 17.722 13.2601 19.361 11.9686 20.5L11.6852 20.75C11.5025 20.9111 11.2673 21 11.0237 21ZM8 3L11 3C11.5523 3 12 3.4477 12 4L12 6C12 6.5523 11.5523 7 11 7L8 7L5 7C4.4477 7 4 6.5523 4 6L4 4C4 3.4477 4.4477 3 5 3ZM21.1951 9.1075C21.7085 9.7493 22 10.5985 22 11.5C22 12.4015 21.7085 13.2507 21.1951 13.8925C20.6802 14.5361 19.9105 15 19 15C18.0895 15 17.3198 14.5361 16.8049 13.8925C16.2915 13.2507 16 12.4015 16 11.5C16 10.5985 16.2915 9.7493 16.8049 9.1075C17.3198 8.4639 18.0895 8 19 8C19.9105 8 20.6802 8.4639 21.1951 9.1075Z" fill="currentColor" stroke="none"/>
      <path d="M10 4L14 4C16.7614 4 19 6.2386 19 9"/>
    </svg>
  )
}
