import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2ArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2L22 2C22.5523 2 23 2.4477 23 3L23 17C23 17.5523 22.5523 18 22 18L13 18L13 20L17 20L17 22L7 22L7 20L11 20L11 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 14L12 7M8.7071 10.2929L12 7L15.2929 10.2929" fill="none"/>
    </svg>
  )
}
