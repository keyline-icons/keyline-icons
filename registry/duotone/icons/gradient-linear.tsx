import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GradientLinear({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2H18C20.209 2 22 3.791 22 6V18C22 20.209 20.209 22 18 22H6C3.791 22 2 20.209 2 18V6C2 3.791 3.791 2 6 2H12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2 10.586L2.293 10.293L10.293 2.293L10.586 2H12H13.414L11.707 3.707L3.707 11.707L2 13.414V10.586ZM2 16.586L2.293 16.293L16.293 2.293L16.586 2H18C18.427 2 18.838 2.067 19.224 2.191L17.707 3.707L3.707 17.707L2.191 19.224C2.067 18.838 2 18.427 2 18V16.586ZM4.776 21.809L6.293 20.293L20.293 6.293L21.809 4.776C21.933 5.162 22 5.573 22 6V7.414L21.707 7.707L7.707 21.707L7.414 22H6C5.573 22 5.162 21.933 4.776 21.809Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
