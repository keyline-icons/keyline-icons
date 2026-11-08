import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RingDiamond({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.304 1 14.591 1.14 14.781 1.38L16.781 3.88C17.038 4.2 17.072 4.64 16.868 5L15.312 7.72C18.077 8.98 20 11.76 20 15C20 19.42 16.418 23 12 23C7.582 23 4 19.42 4 15C4 11.76 5.922 8.98 8.687 7.72L7.132 5C6.928 4.64 6.963 4.2 7.219 3.88L9.251 1.33C9.437 1.15 9.734 1 10 1H14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.146 8.26L8 4.5L10 2H14L16 4.5L13.854 8.26M12 22C8.134 22 5 18.87 5 15C5 11.13 8.134 8 12 8C15.866 8 19 11.13 19 15C19 18.87 15.866 22 12 22Z"/>
    </svg>
  )
}
