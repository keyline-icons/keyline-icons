import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaintBucket({ size = 24, ...props }: IconProps) {
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
      <path d="M4 9C4 7.6193 7.5817 6.5 12 6.5C16.4183 6.5 20 7.6193 20 9C20 10.3807 16.4183 11.5 12 11.5C7.5817 11.5 4 10.3807 4 9ZM4 9L5.6086 19.4562C5.8338 20.9197 7.093 22 8.5738 22L15.4262 22C16.907 22 18.1662 20.9197 18.3914 19.4562L20 9M4 9C4.5368 4.9922 7.9564 2 12 2C16.0436 2 19.4632 4.9922 20 9M9 11.3176V16M14.5 11.3748V14" fill="none"/>
    </svg>
  )
}
