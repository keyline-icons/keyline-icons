import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleNavigation({ size = 24, ...props }: IconProps) {
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
      <path d="M19.4 19.8L20 19C21.2982 17.269 22 15.1637 22 13C22 7.4771 17.5229 3 12 3C6.4771 3 2 7.4771 2 13C2 15.1637 2.7018 17.269 4 19L4.6 19.8M6.9168 21L12 11.8355L17.0832 21L12 20.0794L6.9168 21Z"/>
    </svg>
  )
}
