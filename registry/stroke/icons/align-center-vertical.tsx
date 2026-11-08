import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignCenterVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V4M12 10V14M12 20V22M16 6V8C16 9.105 15.1046 10 14 10H10C8.8954 10 8 9.105 8 8V6C8 4.895 8.8954 4 10 4H14C15.1046 4 16 4.895 16 6ZM20 16V18C20 19.105 19.1046 20 18 20H6C4.8954 20 4 19.105 4 18V16C4 14.895 4.8954 14 6 14H18C19.1046 14 20 14.895 20 16Z"/>
    </svg>
  )
}
