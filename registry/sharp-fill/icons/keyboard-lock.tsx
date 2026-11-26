import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardLock({ size = 24, ...props }: IconProps) {
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
      <path d="M12 20H2V4H22V8M7 16H12M16.5 15V13C16.5 11.8954 17.395 11 18.5 11C19.605 11 20.5 11.8954 20.5 13V15M15 15H22V20H15V15Z"/>
      <path d="M5 7H7V9H5V7ZM9 7H11V9H9V7ZM13 7H15V9H13V7ZM5 11H7V13H5V11ZM9 11H11V13H9V11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
