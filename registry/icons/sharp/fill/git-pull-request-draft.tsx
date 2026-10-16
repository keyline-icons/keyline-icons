import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitPullRequestDraft({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22L6 8"/>
      <path d="M6 2C8.0711 2 10 3.9289 10 6C10 8.0711 8.0711 10 6 10C3.9289 10 2 8.0711 2 6C2 3.9289 3.9289 2 6 2ZM18 14C15.9289 14 14 15.9289 14 18C14 20.0711 15.9289 22 18 22C20.0711 22 22 20.0711 22 18C22 15.9289 20.0711 14 18 14Z" fill="currentColor" stroke="none"/>
      <path d="M19.5 10C19.5 9.1716 18.8284 8.5 18 8.5C17.1716 8.5 16.5 9.1716 16.5 10C16.5 10.8284 17.1716 11.5 18 11.5C18.8284 11.5 19.5 10.8284 19.5 10ZM19.5 4.5C19.5 3.6716 18.8284 3 18 3C17.1716 3 16.5 3.6716 16.5 4.5C16.5 5.3284 17.1716 6 18 6C18.8284 6 19.5 5.3284 19.5 4.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
