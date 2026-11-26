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
      <path d="M2 3H22C22.552 3 23 3.4477 23 4V7C23 7.5523 22.552 8 22 8H12V20C12 20.5523 11.552 21 11 21H2C1.448 21 1 20.5523 1 20V4C1 3.4477 1.448 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 15.0001V17.0001H7V15.0001H12ZM5 7.0001H7V9.0001H5V7.0001ZM9 7.0001H11V9.0001H9V7.0001ZM5 11.0001H7V13.0001H5V11.0001ZM9 11.0001H11V13.0001H9V11.0001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16.5 15V13C16.5 11.8954 17.395 11 18.5 11C19.605 11 20.5 11.8954 20.5 13V15M15 15H22V20H15V15Z"/>
    </svg>
  )
}
