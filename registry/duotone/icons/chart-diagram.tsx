import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartDiagram({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L20 2C21.1046 2 22 2.8954 22 4L22 7C22 8.1046 21.1046 9 20 9L4 9C2.8954 9 2 8.1046 2 7L2 4C2 2.8954 2.8954 2 4 2ZM4 15L9 15C10.1046 15 11 15.8954 11 17L11 20C11 21.1046 10.1046 22 9 22L4 22C2.8954 22 2 21.1046 2 20L2 17C2 15.8954 2.8954 15 4 15ZM15 15L20 15C21.1046 15 22 15.8954 22 17L22 20C22 21.1046 21.1046 22 20 22L15 22C13.8954 22 13 21.1046 13 20L13 17C13 15.8954 13.8954 15 15 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 8L12 12M6.5 16L6.5 13C6.5 12.4477 6.9477 12 7.5 12L16.5 12C17.0523 12 17.5 12.4477 17.5 13L17.5 16"/>
    </svg>
  )
}
