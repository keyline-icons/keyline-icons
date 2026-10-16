import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorText({ size = 24, ...props }: IconProps) {
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
      <path d="M13.3775 20.1434L10.2668 10.0807C10.1436 9.6823 10.513 9.3088 10.8991 9.4413L20.6597 12.7882C21.0963 12.9379 21.1182 13.5634 20.6933 13.745L16.59 15.4983C16.4754 15.5473 16.3828 15.6384 16.3303 15.7538L14.3031 20.2053C14.1111 20.627 13.5147 20.5871 13.3775 20.1434Z" fill="currentColor" stroke="none"/>
      <path d="M2 3.5L13.9583 3.5M2 8.1006L6.9875 8.1006M2 12.7011L6.9875 12.7011M9.9707 9.1229L13.7632 20.5L16.4121 15.5744L21 13.2205L9.9707 9.1229Z"/>
    </svg>
  )
}
