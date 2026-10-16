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
      <path d="M8.27237 8.24183C8.54563 7.97306 8.94844 7.88454 9.30948 8.01332L22.3358 12.6588C22.7153 12.7942 22.976 13.1443 22.998 13.5465C23.0197 13.9487 22.798 14.325 22.4355 14.5006L17.2187 17.028L14.2802 22.4743C14.0912 22.8241 13.7126 23.029 13.3163 22.9957C12.9201 22.9624 12.581 22.6974 12.453 22.3209L8.02628 9.27601C7.90315 8.91299 7.99932 8.51087 8.27237 8.24183Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.4668 6.46821L14.6629 3.28041M8.19939 5.64411L6.75289 1.31641M5.65289 8.18201L1.31549 6.73991M6.48059 11.4412L3.28449 14.629"/>
    </svg>
  )
}
