import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M13.877 5.418L8.198 10.999H23V12.999H8.198L13.877 18.58L12.476 20.006L5.054 12.712C4.862 12.524 4.754 12.267 4.754 11.999C4.754 11.731 4.862 11.474 5.054 11.286L12.476 3.992L13.877 5.418Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M3 4V20H1V4H3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
