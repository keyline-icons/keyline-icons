import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrainFrontTunnel({ size = 24, ...props }: IconProps) {
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
      <path d="M12 6L16 6C17.6569 6 19 7.3431 19 9L19 17C19 18.6569 17.6569 20 16 20L8 20C6.3431 20 5 18.6569 5 17L5 9C5 7.3431 6.3431 6 8 6ZM12 10L17 10L17 9C17 8.4477 16.5523 8 16 8L8 8C7.4477 8 7 8.4477 7 9L7 10ZM11 15C11 14.4477 10.5523 14 10 14C9.4477 14 9 14.4477 9 15C9 15.5523 9.4477 16 10 16C10.5523 16 11 15.5523 11 15ZM15 15C15 14.4477 14.5523 14 14 14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16C14.5523 16 15 15.5523 15 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 22L2 7C2 4.2386 4.2386 2 7 2L17 2C19.7614 2 22 4.2386 22 7L22 22M8 19L6.5 22M16 19L17.5 22"/>
    </svg>
  )
}
