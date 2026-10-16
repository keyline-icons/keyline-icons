import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDown3({ size = 24, ...props }: IconProps) {
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
      <path d="M17 11L17 21.2604M12 17.1053L16.6759 21.8633C16.8549 22.0456 17.1451 22.0456 17.3241 21.8633L22 17.1053" fill="none" strokeOpacity="0.4"/>
      <path d="M7 13L7 2.7396M12 6.8947L7.3241 2.1367C7.1451 1.9544 6.8549 1.9544 6.6759 2.1367L2 6.8947" fill="none"/>
    </svg>
  )
}
