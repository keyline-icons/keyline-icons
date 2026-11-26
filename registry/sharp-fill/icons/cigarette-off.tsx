import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CigaretteOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19V21C19 21.552 18.552 22 18 22H2C1.448 22 1 21.552 1 21V16C1 15.448 1.448 15 2 15H15L19 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 3H16C17.657 3 19 4.343 19 6V7.5M19 7.5C20.657 7.5 22 8.843 22 10.5V13M19 7.5H16.5M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
