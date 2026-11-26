import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSquint({ size = 24, ...props }: IconProps) {
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
      <path d="M8.5 7.5L10 8.75L8.5 10M15.5 7.5L14 8.75L15.5 10M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM9.171 14H14.829C15.518 14 16.001 14.682 15.772 15.332C15.212 16.919 13.707 18 12 18C10.293 18 8.788 16.919 8.228 15.332C7.999 14.682 8.482 14 9.171 14Z"/>
    </svg>
  )
}
