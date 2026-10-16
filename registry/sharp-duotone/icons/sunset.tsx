import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sunset({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 19L7.5 18C7.5 15.5147 9.5147 13.5 12 13.5C14.4853 13.5 16.5 15.5147 16.5 18L16.5 19M1 18L4.5 18M19.5 18L23 18M4.2218 10.2218L6.6967 12.6967M19.7782 10.2218L17.3033 12.6967M1 22L23 22" strokeOpacity="0.4"/>
      <path d="M12 1L12 9M8.2071 5.2071L12 9L15.7929 5.2071"/>
    </svg>
  )
}
