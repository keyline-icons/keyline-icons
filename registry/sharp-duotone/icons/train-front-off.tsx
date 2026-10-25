import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrainFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 6L21 17.3431L11.6569 8L19 8L19 3L6.6569 3L4.6569 1L20 1C20.5523 1 21 1.4477 21 2L21 4L23 4L23 6L21 6ZM18.2362 18.2363L19 19.0001L18.6181 19.0001L20.1708 22.1056L18.382 23L16.382 19L16.1715 19L7.618 19L5.618 23L3.8292 22.1056L5.382 19L4 19C3.4477 19 3 18.5523 3 18L3 6L1 6L1 4L3 4L3 3L5 5.0001L5 7.5001C5 7.7729 5.2188 7.9954 5.4916 8L8 8L17.6666 17.6667L17.8944 17.5528L18.2362 18.2363ZM10 13.5C10 12.6716 9.3284 12 8.5 12C7.6716 12 7 12.6716 7 13.5C7 14.3284 7.6716 15 8.5 15C9.3284 15 10 14.3284 10 13.5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
