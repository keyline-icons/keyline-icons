import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LocateOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16.2426 16.2426C15.1569 17.3284 13.6569 18 12 18C8.6863 18 6 15.3137 6 12C6 10.3431 6.6716 8.8431 7.7574 7.7574M12 23L12 18M1 12L6 12M10.6675 6.0633L11.666 6.0091C11.7766 6.0031 11.8879 6 12 6C15.3137 6 18 8.6863 18 12C18 12.1121 17.9969 12.2234 17.9909 12.334L17.9367 13.3325M12 1L12 6M23 12L18 12M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
