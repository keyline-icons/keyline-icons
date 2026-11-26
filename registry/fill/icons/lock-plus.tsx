import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LockPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 10V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V10"/>
      <path d="M17 9C19.2091 9 21 10.7909 21 13L21 19C21 21.2091 19.2091 23 17 23L7 23C4.7909 23 3 21.2091 3 19L3 13C3 10.7909 4.7909 9 7 9ZM13 17L14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15L13 15L13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14L11 15L10 15C9.4477 15 9 15.4477 9 16C9 16.5523 9.4477 17 10 17L11 17L11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
