import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cone({ size = 24, ...props }: IconProps) {
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
      <path d="M4.106 18.5133L11.0842 2.5984C11.434 1.8005 12.566 1.8005 12.9158 2.5984L19.894 18.5133M20 19C20 20.6569 16.4183 22 12 22C7.5817 22 4 20.6569 4 19C4 17.3431 7.5817 16 12 16C16.4183 16 20 17.3431 20 19Z" fill="none"/>
    </svg>
  )
}
