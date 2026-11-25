import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BeforeAndAfter({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V5M12 5V19M12 5H19C20.6569 5 22 6.3431 22 8V16C22 17.6569 20.6569 19 19 19H12M12 19V22M8 19H5C3.3431 19 2 17.6569 2 16V8C2 6.3431 3.3431 5 5 5H8"/>
    </svg>
  )
}
