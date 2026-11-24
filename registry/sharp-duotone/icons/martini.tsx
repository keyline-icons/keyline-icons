import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Martini({ size = 24, ...props }: IconProps) {
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
      <path d="M11 14.183L1.2665 3.6797C1.0952 3.4948 1 3.2521 1 3C1 2.4477 1.4477 2 2 2L12 2L22 2C22.5523 2 23 2.4477 23 3C23 3.2521 22.9048 3.4948 22.7335 3.6797L13 14.183L13 20L18 20L19 20L19 22L18 22L6 22L5 22L5 20L6 20L11 20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 6.0005L5.7073 6.0005C5.155 6.0005 4.7073 6.4482 4.7073 7.0005C4.7073 7.2526 4.8025 7.4953 4.9738 7.6802L11.2665 14.4706C11.4558 14.6748 11.7216 14.7909 12 14.7909C12.2784 14.7909 12.5442 14.6748 12.7335 14.4706L19.0262 7.6802C19.1975 7.4953 19.2927 7.2526 19.2927 7.0005C19.2927 6.4482 18.845 6.0005 18.2927 6.0005Z" fill="currentColor"/>
    </svg>
  )
}
