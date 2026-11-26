import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextAlignBottom({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2C20.2092 2 22 3.7908 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7908 22 2 20.2092 2 18L2 6C2 3.7908 3.7908 2 6 2ZM7 12C6.4477 12 6 12.4477 6 13C6 13.5523 6.4477 14 7 14L17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12ZM7 16C6.4477 16 6 16.4477 6 17C6 17.5523 6.4477 18 7 18L13 18C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
