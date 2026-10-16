import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Infinity({ size = 24, ...props }: IconProps) {
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
      <path d="M15.3333 9.0186C16.0667 8.3626 17.0161 8 18 8C20.2091 8 22 9.7909 22 12C22 14.2091 20.2091 16 18 16C17.0161 16 16.0667 15.6374 15.3333 14.9814L8.6667 9.0186C7.9333 8.3626 6.9839 8 6 8C3.7909 8 2 9.7909 2 12C2 14.2091 3.7909 16 6 16C6.9839 16 7.9333 15.6374 8.6667 14.9814Z"/>
    </svg>
  )
}
