import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SymmetryVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M4 9L4 7C4 6.5774 4.2657 6.2004 4.6637 6.0583L18.6637 1.0583C18.7716 1.0197 18.8854 1 19 1C19.5523 1 20 1.4477 20 2L20 9L4 9ZM20 15L20 22C20 22.5523 19.5523 23 19 23C18.8854 23 18.7716 22.9803 18.6637 22.9417L4.6637 17.9417C4.2657 17.7996 4 17.4226 4 17L4 15L20 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1 12L23 12" fill="none"/>
    </svg>
  )
}
