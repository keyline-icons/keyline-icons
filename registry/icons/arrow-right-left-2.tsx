import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowRightLeft2({ size = 24, ...props }: IconProps) {
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
      <path d="M22 17L11.7396 17M15.8947 12L11.1367 16.6759C10.9544 16.8549 10.9544 17.1451 11.1367 17.3241L15.8947 22M2 7L12.2604 7M8.1053 12L12.8633 7.3241C13.0456 7.1451 13.0456 6.8549 12.8633 6.6759L8.1053 2"/>
    </svg>
  )
}
