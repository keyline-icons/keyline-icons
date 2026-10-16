import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Store({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7.5L2 6L4.5 3L19.5 3L22 6L22 7.5C22 8.8807 20.8807 10 19.5 10C18.1193 10 17 8.8807 17 7.5C17 8.8807 15.8807 10 14.5 10C13.1193 10 12 8.8807 12 7.5C12 8.8807 10.8807 10 9.5 10C8.1193 10 7 8.8807 7 7.5C7 8.8807 5.8807 10 4.5 10C3.1193 10 2 8.8807 2 7.5ZM4 10L4 21L20 21L20 10M9 21L9 14L15 14L15 21M7 7.5L7 6M12 7.5L12 6M17 7.5L17 6" fill="none"/>
    </svg>
  )
}
