import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotNetwork({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5C5 4.4477 5.4477 4 6 4L18 4C18.5523 4 19 4.4477 19 5L19 13C19 13.5523 18.5523 14 18 14L6 14C5.4477 14 5 13.5523 5 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 5L12 1M3 9L6 9M18 9L21 9M9 13L5 17M15 13L19 17"/>
      <path d="M1 17C1 16.4477 1.4477 16 2 16L8 16C8.5523 16 9 16.4477 9 17L9 22C9 22.5523 8.5523 23 8 23L2 23C1.4477 23 1 22.5523 1 22ZM15 17C15 16.4477 15.4477 16 16 16L22 16C22.5523 16 23 16.4477 23 17L23 22C23 22.5523 22.5523 23 22 23L16 23C15.4477 23 15 22.5523 15 22ZM11 9C11 9.5523 10.5523 10 10 10C9.4477 10 9 9.5523 9 9C9 8.4477 9.4477 8 10 8C10.5523 8 11 8.4477 11 9ZM15 9C15 9.5523 14.5523 10 14 10C13.4477 10 13 9.5523 13 9C13 8.4477 13.4477 8 14 8C14.5523 8 15 8.4477 15 9Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
