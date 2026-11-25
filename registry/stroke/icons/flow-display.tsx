import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDisplay({ size = 24, ...props }: IconProps) {
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
      <path d="M15 5C18.866 5 22 8.134 22 12C22 15.866 18.866 19 15 19L8.886 19C8.3218 19 7.7838 18.7617 7.4047 18.3438L2.2593 12.6719C1.9135 12.2907 1.9135 11.7093 2.2593 11.3281L7.4047 5.6562C7.7838 5.2383 8.3218 5 8.886 5L15 5Z"/>
    </svg>
  )
}
