import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Home({ size = 24, ...props }: IconProps) {
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
      <path d="M10.0605 2.7073C11.1795 1.7593 12.8205 1.7593 13.9395 2.7073L20.9395 8.6379L21.0615 8.7483C21.6586 9.3132 22 10.1004 22 10.927L22 19.0002C21.9999 20.657 20.6568 22.0002 19 22.0002L16 22.0002L16 13.0002L8 13.0002L8 22.0002L5 22.0002C3.3432 22.0002 2.0001 20.657 2 19.0002L2 10.927C2 10.0454 2.3878 9.2079 3.0605 8.6379L10.0605 2.7073Z" fill="currentColor"/>
    </svg>
  )
}
