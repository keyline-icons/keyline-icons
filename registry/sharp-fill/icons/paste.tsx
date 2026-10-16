import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Paste({ size = 24, ...props }: IconProps) {
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
      <path d="M5 4L2 4L2 21L9 21M13 4L16 4L16 8M5 2L13 2L13 7L5 7L5 2Z" fill="none"/>
      <path d="M18 10C18.2652 10 18.5196 10.1054 18.7071 10.2929L22.7071 14.2929C22.8946 14.4804 23 14.7348 23 15L23 22C23 22.5523 22.5523 23 22 23L12 23C11.4477 23 11 22.5523 11 22L11 11C11 10.4477 11.4477 10 12 10L18 10ZM20.5858 15L18 12.4142L18 15L20.5858 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
