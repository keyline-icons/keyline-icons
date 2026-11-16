import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleRightSplit({ size = 24, ...props }: IconProps) {
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
      <path d="M20.293 2.293C20.579 2.007 21.009 1.921 21.383 2.076C21.756 2.231 22 2.596 22 3V21C22 21.552 21.552 22 21 22H3C2.596 22 2.231 21.756 2.076 21.383C1.921 21.009 2.007 20.579 2.293 20.293L20.293 2.293ZM13.414 12L20 18.586V5.414L13.414 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
