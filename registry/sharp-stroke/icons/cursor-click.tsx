import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorClick({ size = 24, ...props }: IconProps) {
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
      <path d="M11.4668 6.4688L14.6629 3.281M8.1994 5.6447L6.7529 1.317M5.6529 8.1826L1.3155 6.7405M6.4806 11.4418L3.2845 14.6296M8.9737 8.9553L13.4001 22L16.4918 16.2705L22 13.6016L8.9737 8.9553Z"/>
    </svg>
  )
}
