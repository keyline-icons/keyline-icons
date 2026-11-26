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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 19V20.5C19 21.328 18.3284 22 17.5 22H3.5C2.1193 22 1 20.881 1 19.5V17.5C1 16.119 2.1193 15 3.5 15H15L19 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10.151 4.494C10.6341 3.956 11.25 3.53 11.9609 3.271M16 3C17.6569 3 19 4.343 19 6V7.5M19 7.5C20.6569 7.5 22 8.843 22 10.5V12M19 7.5H17.5M2 2L22 22"/>
    </svg>
  )
}
