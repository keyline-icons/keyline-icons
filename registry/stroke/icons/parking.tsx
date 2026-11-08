import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Parking({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 13V9C9.5 8.45 9.9477 8 10.5 8H12C13.3807 8 14.5 9.12 14.5 10.5C14.5 11.88 13.3807 13 12 13H9.5ZM9.5 13V16M12 22C6.4772 22 2 17.52 2 12C2 6.48 6.4772 2 12 2C17.5228 2 22 6.48 22 12C22 17.52 17.5228 22 12 22Z"/>
    </svg>
  )
}
