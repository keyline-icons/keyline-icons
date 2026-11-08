import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TreePine({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C12.297 1 12.579 1.13 12.769 1.36L17.769 7.36C18.017 7.66 18.07 8.07 17.905 8.42C17.741 8.78 17.388 9 17 9H16.081L18.781 12.38C19.021 12.68 19.068 13.09 18.901 13.43C18.735 13.78 18.384 14 18 14H16.414L19.707 17.29C19.993 17.58 20.079 18.01 19.924 18.38C19.769 18.76 19.404 19 19 19H13V23H11V19H5C4.596 19 4.231 18.76 4.076 18.38C3.921 18.01 4.007 17.58 4.293 17.29L7.586 14H6C5.616 14 5.265 13.78 5.099 13.43C4.932 13.09 4.979 12.68 5.219 12.38L7.919 9H7C6.612 9 6.259 8.78 6.095 8.42C5.93 8.07 5.983 7.66 6.231 7.36L11.26 1.32C11.445 1.15 11.74 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 18H19L14 13H18L14 8H17L12 2L7 8H10L6 13H10L5 18H12ZM12 18V23"/>
    </svg>
  )
}
