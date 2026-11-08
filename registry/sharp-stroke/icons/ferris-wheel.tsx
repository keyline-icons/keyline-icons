import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FerrisWheel({ size = 24, ...props }: IconProps) {
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
      <path d="M12 14C10.895 14 10 13.1 10 12C10 10.9 10.895 10 12 10C13.105 10 14 10.9 14 12C14 13.1 13.105 14 12 14ZM12 14L9 22M12 14L15 22M9 22H6M9 22H15M15 22H18M17.701 17.72L18 17.38C19.245 15.96 20 14.09 20 12.05C20 7.61 16.418 4 12 4C7.582 4 4 7.61 4 12.05C4 14.09 4.755 15.96 6 17.38L6.299 17.72M12 1V7M21.5 6.52L16.696 9.29M7.304 14.71L2.5 17.48M2.5 6.52L7.304 9.29M16.696 14.71L18.928 16L21.5 17.48"/>
    </svg>
  )
}
