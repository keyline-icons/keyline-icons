import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookOpen2({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L4 6C3.4477 6 3 6.4477 3 7L3 18C3 18.5523 3.4477 19 4 19C7.1102 19 10.1825 19.6827 13 21C14.731 19.7018 16.8363 19 19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.8954 20.1046 5 19 5C18.8967 5 18.7936 5.008 18.6915 5.0239C16.5187 5.3632 14.5183 6.4092 13 8C12.2613 5.7539 10.5668 3.9496 8.3714 3.0715C8.2532 3.0243 8.1272 3 8 3C7.4477 3 7 3.4477 7 4L7 15C7 15.5523 7.4477 16 8 16C10.7614 16 13 18.2386 13 21M13 8L13 21" fill="none"/>
    </svg>
  )
}
