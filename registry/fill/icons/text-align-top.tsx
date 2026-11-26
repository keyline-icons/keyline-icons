import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextAlignTop({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2C20.2092 2 22 3.7908 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7908 22 2 20.2092 2 18L2 6C2 3.7908 3.7908 2 6 2ZM7 6C6.4477 6 6 6.4477 6 7C6 7.5523 6.4477 8 7 8L17 8C17.5523 8 18 7.5523 18 7C18 6.4477 17.5523 6 17 6ZM7 10C6.4477 10 6 10.4477 6 11C6 11.5523 6.4477 12 7 12L13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
