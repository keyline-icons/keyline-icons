import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EarbudsOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3.7159 3.7159C2.6787 4.4386 2 5.6401 2 7C2 8.9008 3.3376 10.539 5.2 10.9192C5.6656 11.0142 6 11.4238 6 11.899L6 19C6 20.1046 6.8954 21 8 21C9.1046 21 10 20.1046 10 19L10 10M14 14L14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 18M6 17L10 17M14 17L17 17M18 12.3431L18 11.899C18 11.4238 18.3344 11.0142 18.8 10.9192C20.6624 10.539 22 8.9008 22 7C22 4.7909 20.2091 3 18 3C15.7909 3 14 4.7909 14 7L14 8.3431M2 2L22 22" fill="none"/>
      <path d="M19 7C19 7.5523 18.5523 8 18 8C17.4477 8 17 7.5523 17 7C17 6.4477 17.4477 6 18 6C18.5523 6 19 6.4477 19 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
