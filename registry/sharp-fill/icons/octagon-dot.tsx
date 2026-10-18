import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OctagonDot({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 8.4C2 8.1348 2.1054 7.8804 2.2929 7.6929L7.6929 2.2929C7.8804 2.1054 8.1348 2 8.4 2L15.6 2C15.8652 2 16.1196 2.1054 16.3071 2.2929L21.7071 7.6929C21.8946 7.8804 22 8.1348 22 8.4L22 15.6C22 15.8652 21.8946 16.1196 21.7071 16.3071L16.3071 21.7071C16.1196 21.8946 15.8652 22 15.6 22L8.4 22C8.1348 22 7.8804 21.8946 7.6929 21.7071L2.2929 16.3071C2.1054 16.1196 2 15.8652 2 15.6L2 8.4ZM14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
