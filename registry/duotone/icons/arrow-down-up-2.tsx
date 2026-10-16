import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownUp2({ size = 24, ...props }: IconProps) {
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
      <path d="M17 22L17 11.7396M12 15.8947L16.6759 11.1367C16.8549 10.9544 17.1451 10.9544 17.3241 11.1367L22 15.8947" fill="none" strokeOpacity="0.4"/>
      <path d="M7 2L7 12.2604M12 8.1053L7.3241 12.8633C7.1451 13.0456 6.8549 13.0456 6.6759 12.8633L2 8.1053"/>
    </svg>
  )
}
