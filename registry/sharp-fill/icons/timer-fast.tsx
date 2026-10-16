import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TimerFast({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5C16.9706 5 21 9.0294 21 14C21 18.9706 16.9706 23 12 23C8.186 23 4.7861 20.5959 3.5147 17L8 17L8 15L3.0557 15C3.0186 14.668 3 14.3341 3 14C3 13.6659 3.0186 13.332 3.0557 13L9 13L9 11L3.5147 11C4.7861 7.4041 8.186 5 12 5ZM11 9L11 15L13 15L13 9L11 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 2L16 2M12 2L12 6M17.6569 8.3431L19.2929 6.7071" fill="none"/>
    </svg>
  )
}
