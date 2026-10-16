import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mic({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C14.2091 1 16 2.7909 16 5L16 11C16 13.2091 14.2091 15 12 15C9.7909 15 8 13.2091 8 11L8 5C8 2.7909 9.7909 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 10L19 11C19 14.866 15.866 18 12 18C8.134 18 5 14.866 5 11L5 10M12 18L12 22M7 22L17 22"/>
    </svg>
  )
}
