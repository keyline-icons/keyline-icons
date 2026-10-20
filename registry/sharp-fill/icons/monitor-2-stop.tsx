import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Stop({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 17C23 17.5523 22.5523 18 22 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2ZM9 6C8.4477 6 8 6.4477 8 7L8 13C8 13.5523 8.4477 14 9 14L15 14C15.5523 14 16 13.5523 16 13L16 7C16 6.4477 15.5523 6 15 6L9 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 17L12 21M7 21L17 21" fill="none"/>
    </svg>
  )
}
