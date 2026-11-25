import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacTaurus({ size = 24, ...props }: IconProps) {
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
      <path d="M12 11C14.7614 11 17 13.2386 17 16C17 18.7614 14.7614 21 12 21C9.2386 21 7 18.7614 7 16C7 13.2386 9.2386 11 12 11ZM4 2L4 3C4 7.4183 7.5817 11 12 11C16.4183 11 20 7.4183 20 3L20 2" fill="none"/>
    </svg>
  )
}
