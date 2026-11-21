import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChefHat({ size = 24, ...props }: IconProps) {
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
      <path d="M6 18.5L6 11.9357C3.7 11.4714 2 9.6143 2 7.5714C2 4.9714 4.2 2.9286 7 2.9286C7.6 2.9286 8.1 3.0214 8.6 3.2071C9.4 2.4643 10.6 2 12 2C13.4 2 14.6 2.4643 15.4 3.2071C15.9 3.0214 16.4 2.9286 17 2.9286C19.8 2.9286 22 4.9714 22 7.5714C22 9.6143 20.3 11.4714 18 11.9357L18 18.5M6 17L18 17L18 22L6 22Z" fill="none"/>
    </svg>
  )
}
