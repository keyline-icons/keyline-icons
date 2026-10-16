import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftRight2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 17L12.2604 17M8.1053 12L12.8633 16.6759C13.0456 16.8549 13.0456 17.1451 12.8633 17.3241L8.1053 22M22 7L11.7396 7M15.8947 12L11.1367 7.3241C10.9544 7.1451 10.9544 6.8549 11.1367 6.6759L15.8947 2"/>
    </svg>
  )
}
