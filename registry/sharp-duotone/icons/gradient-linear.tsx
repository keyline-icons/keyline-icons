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
      <path d="M12 2H21C21.552 2 22 2.448 22 3V21C22 21.552 21.552 22 21 22H3C2.448 22 2 21.552 2 21V3C2 2.448 2.448 2 3 2H12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2 10.586L2.293 10.293L10.293 2.293L10.586 2H12H13.414L11.707 3.707L3.707 11.707L2 13.414V10.586ZM2 16.586L2.293 16.293L16.293 2.293L16.586 2H19.414L17.707 3.707L3.707 17.707L2 19.414V16.586ZM4.586 22L6.293 20.293L20.293 6.293L22 4.586V7.414L21.707 7.707L7.707 21.707L7.414 22H4.586Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
