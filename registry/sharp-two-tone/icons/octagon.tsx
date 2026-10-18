import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Octagon({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8.4C2 8.1348 2.1054 7.8804 2.2929 7.6929L7.6929 2.2929C7.8804 2.1054 8.1348 2 8.4 2L15.6 2C15.8652 2 16.1196 2.1054 16.3071 2.2929L21.7071 7.6929C21.8946 7.8804 22 8.1348 22 8.4L22 15.6C22 15.8652 21.8946 16.1196 21.7071 16.3071L16.3071 21.7071C16.1196 21.8946 15.8652 22 15.6 22L8.4 22C8.1348 22 7.8804 21.8946 7.6929 21.7071L2.2929 16.3071C2.1054 16.1196 2 15.8652 2 15.6L2 8.4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 15.6L3 8.4L8.4 3L15.6 3L21 8.4L21 15.6L15.6 21L8.4 21L3 15.6Z" fill="none"/>
    </svg>
  )
}
