import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserVoice({ size = 24, ...props }: IconProps) {
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
      <path d="M17.485 3C17.826 3.964 18 4.978 18 6C18 7.022 17.826 8.036 17.485 9M21.649 3C21.882 3.983 22 4.99 22 6C22 8.282 21.399 10.524 20.258 12.5"/>
      <path d="M13 6C13 8.209 11.209 10 9 10C6.791 10 5 8.209 5 6C5 3.791 6.791 2 9 2C11.209 2 13 3.791 13 6ZM8 12H10C13.866 12 17 15.134 17 19V20C17 21.105 16.105 22 15 22H3C1.895 22 1 21.105 1 20V19C1 15.134 4.134 12 8 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
