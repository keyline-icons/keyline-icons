import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampFloor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12V22M9 22H15M9.712 2.503C9.8901 2.192 10.2213 2 10.5799 2H13.4201C13.7787 2 14.1099 2.192 14.288 2.503L18.8664 10.503C19.248 11.17 18.7666 12 17.9985 12H6.0015C5.2334 12 4.752 11.17 5.1336 10.503L9.712 2.503Z"/>
    </svg>
  )
}
