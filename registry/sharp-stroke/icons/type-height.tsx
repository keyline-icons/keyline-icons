import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeHeight({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8L2 7L2 4L12 4L12 7L12 8M7 4L7 20M2.5 20L3.5 20L10.5 20L11.5 20M19 20L19 4M15.7071 7.2929L16 7L19 4L22 7L22.2929 7.2929M15.7071 16.7071L16 17L19 20L22 17L22.2929 16.7071" fill="none"/>
    </svg>
  )
}
