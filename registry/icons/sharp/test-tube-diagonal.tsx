import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubeDiagonal({ size = 24, ...props }: IconProps) {
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
      <path d="M14.1339 2.5456L19.162 5.8195L9.514 20.6369C8.9604 21.4872 8.0146 22 7 22C5.3431 22 4 20.6569 4 19C4 18.4188 4.1688 17.8501 4.486 17.3631L14.1339 2.5456ZM13.0471 1.838L20.4544 6.661M7.3268 13L14.4866 13" fill="none"/>
    </svg>
  )
}
