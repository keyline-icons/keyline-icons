import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDown2({ size = 24, ...props }: IconProps) {
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
      <path d="M7 22L7 11.7396M12 15.8947L7.3241 11.1367C7.1451 10.9544 6.8549 10.9544 6.6759 11.1367L2 15.8947M17 2L17 12.2604M12 8.1053L16.6759 12.8633C16.8549 13.0456 17.1451 13.0456 17.3241 12.8633L22 8.1053"/>
    </svg>
  )
}
