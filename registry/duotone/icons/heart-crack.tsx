import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartCrack({ size = 24, ...props }: IconProps) {
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
      <path d="M16 2C19.8256 2 23 4.98233 23 8.75C23 11.6443 21.418 13.9747 19.4219 15.9922C17.4582 17.9769 14.8378 19.8917 12.6494 21.7607C12.2754 22.08 11.7246 22.08 11.3506 21.7607C9.16223 19.8917 6.54178 17.9769 4.57812 15.9922C2.58202 13.9747 1 11.6443 1 8.75C1 4.98233 4.17445 2 8 2C9.4851 2 10.828 2.4608 12 3.25391C13.172 2.4608 14.5149 2 16 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 4.5L10.5 8.75L13 9.5L11 13L13 15"/>
    </svg>
  )
}
