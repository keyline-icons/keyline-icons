import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11.618 5L12.382 5L12 4.2361L11.618 5ZM14.618 5L20 5C20.5523 5 21.0001 5.4478 21 6.0001L21 15.3432L21 17.3431L8.6569 5L10.657 5L9.637 4.49L10.382 3L7 3L7 1L17 1L17 3L13.618 3L14.618 5ZM20.7071 20.7071C20.5198 20.8949 20.2653 21.0004 20 21L4 21C3.4477 21 3 20.5523 3 20L3 6C2.9999 5.4477 3.4477 4.9999 4 4.9999L4.9999 4.9999L20.7071 20.7071Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M20 20L4 20L4 6L6 6M4 12L12 12M8 20L6.7236 22.5528M16 20L17.2764 22.5528M1.7071 1.7071L22.2929 22.2929" fill="none"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
