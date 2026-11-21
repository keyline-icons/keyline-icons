import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Treasure({ size = 24, ...props }: IconProps) {
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
      <path d="M1 15.5L1 13C1 12.4477 1.4477 12 2 12L4 12C4.5523 12 5 12.4477 5 13L5 16.5L5 20C5 20.5523 4.5523 21 4 21C2.3431 21 1 19.6569 1 18ZM5 6.9999L5 9C5 9.5523 4.5523 10 4 10L2 10C1.4477 10 1 9.5523 1 9C1 7.6935 1.4174 6.4849 2.1261 5.4999C2.4826 5.0045 2.9124 4.5661 3.3994 4.2002C3.5726 4.0701 3.7834 3.9998 4 3.9998C4.5523 3.9998 5 4.4475 5 4.9998ZM17 15.5L17 20C17 20.5523 16.5523 21 16 21L12 21L8 21C7.4477 21 7 20.5523 7 20L7 11L7 4C7 3.4477 7.4477 3 8 3L12 3L16 3C16.5523 3 17 3.4477 17 4L17 11ZM19 6.9999L19 4.9998C19 4.4475 19.4477 3.9998 20 3.9998C20.2166 3.9998 20.4274 4.0701 20.6006 4.2002C21.0876 4.5661 21.5174 5.0045 21.8739 5.4999C22.5826 6.4849 23 7.6935 23 9C23 9.5523 22.5523 10 22 10L20 10C19.4477 10 19 9.5523 19 9ZM23 15.5L23 18C23 19.6569 21.6569 21 20 21C19.4477 21 19 20.5523 19 20L19 16.5L19 13C19 12.4477 19.4477 12 20 12L22 12C22.5523 12 23 12.4477 23 13ZM13 12L13 10L12 10L11 10L11 12L11 14L12 14L13 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
