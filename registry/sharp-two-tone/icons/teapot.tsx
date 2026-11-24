import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Teapot({ size = 24, ...props }: IconProps) {
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
      <path d="M15.9945 9.0689C16.3098 9.2566 16.607 9.4664 16.8828 9.6963C18.1596 10.7602 19 12.2775 19 14L19 20C19 20.5523 18.5523 21 18 21L12 21L6 21C5.4477 21 5 20.5523 5 20L5 14C5 12.2775 5.8404 10.7602 7.1172 9.6963C7.393 9.4664 7.6902 9.2566 8.0055 9.0689L8 5.0014C8 4.4477 8.4477 4 9 4L12 4L15 4C15.5523 4 16 4.4477 16 5L15.9968 7.3343Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 16.5C20 16.5 18.5 11.5 22 11L22.8586 10.8773M6.2764 12.5L4 12.5C2.8954 12.5 2 13.3954 2 14.5C2 15.6046 2.8954 16.5 4 16.5L6 16.5M6 14C6 11.2386 8.6863 9 12 9C15.3137 9 18 11.2386 18 14L18 20L6 20ZM12 5L12 4L12 3M9 9.6528L9 9.5L9 5L12 5L15 5L15 9.5L15 9.6528"/>
    </svg>
  )
}
