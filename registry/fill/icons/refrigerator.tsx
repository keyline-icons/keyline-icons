import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Refrigerator({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1L16 1C18.2092 1 20 2.7908 20 5L20 19C20 21.2092 18.2092 23 16 23L8 23C5.7908 23 4 21.2092 4 19L4 5C4 2.7908 5.7908 1 8 1ZM7 10C6.4477 10 6 10.4477 6 11C6 11.5523 6.4477 12 7 12L17 12C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10L7 10ZM10 6C10 5.4477 9.5523 5 9 5C8.4477 5 8 5.4477 8 6L8 7C8 7.5523 8.4477 8 9 8C9.5523 8 10 7.5523 10 7L10 6ZM10 15C10 14.4477 9.5523 14 9 14C8.4477 14 8 14.4477 8 15L8 18C8 18.5523 8.4477 19 9 19C9.5523 19 10 18.5523 10 18L10 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
