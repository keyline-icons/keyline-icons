import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stop({ size = 24, ...props }: IconProps) {
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
      <path d="M4 7C4 5.343146 5.343146 4 7 4L17 4C18.656854 4 20 5.343146 20 7L20 17C20 18.656854 18.656854 20 17 20L7 20C5.343146 20 4 18.656854 4 17Z" fill="currentColor"/>
    </svg>
  )
}
