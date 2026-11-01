import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BriefcaseArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M6 5L18 5C20.2092 5 22 6.7908 22 9L22 15C22 17.2092 20.2092 19 18 19L6 19C3.7908 19 2 17.2092 2 15L2 9C2 6.7908 3.7908 5 6 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.5 6L8.5 5C8.5 3.3431 9.8431 2 11.5 2L12.5 2C14.1569 2 15.5 3.3431 15.5 5L15.5 6M12 10L12 14M9 11L12 14L15 11M3 22L21 22" fill="none"/>
    </svg>
  )
}
